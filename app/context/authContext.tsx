'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { env } from '../config/env';
import { UserInterface } from '../admin/dashboard/users/page';

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserInterface | null;
    loading: boolean;
    login: (userData: UserInterface) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${env.baseUrl}/users/me`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setIsLoggedIn(true);
                    setUser(data as UserInterface);
                }
            } catch (err) {
                console.error("Non authentifié");
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = (userData: UserInterface) => {
        setIsLoggedIn(true);
        setUser(userData as UserInterface);
    };

    const logout = async () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
    return context;
};