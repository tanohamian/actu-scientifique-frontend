'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { env } from '../config/env';
import { UserInterface } from '../admin/dashboard/users/page';
import { LogoutUser } from '../actions/Auth';
import { useRouter } from 'next/navigation';


interface AuthContextType {
    isLoggedIn: boolean;
    user: UserInterface | null;
    login: (userData: UserInterface) => void;
    logout: () => void;
    loading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserInterface | null>(null)
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    
    const checkAuth = async () => {
        try {
            const response = await fetch(`${env.baseUrl}/users/me`,{
                method: 'GET',
                credentials: 'include',
            })
            if (response.ok) {
                const data = await response.json();
                setUser(data as UserInterface);
                setIsLoggedIn(true);
            }else{
                setUser(null);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.log('Erreur vérification auth:', error);
            setUser(null);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    }

    const login = (userData: UserInterface) => {
        setUser(userData);
        setIsLoggedIn(true);
        router.refresh();
    };

    const logout = async () => {
       try {
            await LogoutUser()
            router.refresh()
       } catch (error) {
        console.log('Erreur lors de la déconnexion:', error);
       }finally {
        setUser(null);
        setIsLoggedIn(false);
       }
    };

     useEffect(() => {
        checkAuth();
    }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout,loading }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
    return context;
};