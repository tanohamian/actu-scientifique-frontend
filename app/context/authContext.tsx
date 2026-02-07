'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { env } from '../config/env';
import { UserInterface } from '../admin/dashboard/users/page';


interface AuthContextType {
    isLoggedIn: boolean;
    user: UserInterface | null;
    login: (userData: UserInterface) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserInterface | null>(null)


    const login = (userData: UserInterface) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
    return context;
};