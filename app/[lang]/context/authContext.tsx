"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { env } from "../config/env";
import { UserInterface } from "../admin/dashboard/users/page";
import { LogoutUser } from "../actions/Auth";
import { useRouter } from "next/navigation";
import { getMe } from "../actions/Users";

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserInterface | null;
  //login: (userData: UserInterface) => void;
  logout: () => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    setLoading(true);
    try {
      const response = await getMe();
      if (response) {
        console.log("Utilisateur authentifié", response);
        setUser(response as UserInterface);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log("Erreur vérification auth:", error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await LogoutUser();
      setUser(null);
      setIsLoggedIn(false);
      router.refresh();
    } catch (error) {
      console.log("Erreur lors de la déconnexion:", error);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, refreshUser, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};
