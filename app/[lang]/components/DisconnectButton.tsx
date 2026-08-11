"use client";
import React from "react";
import { useRouter } from "next/navigation";
import IconComponent from "./Icons";
import { useAuth } from "../context/authContext";

    const iconSize = 'w-5 h-5';

export const DisconnectButton : React.FC = () => {
        const router = useRouter();
        const { logout } = useAuth();

        const handleLogout = async () => {
            await logout();
            router.push("/admin");
        };

        const buttonClasses = `
            flex items-center p-3 w-full rounded-lg transition-colors duration-150
            bg-transparent border-none text-white cursor-pointer
            hover:bg-white/10 hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-white/50
        `;
        const iconWrapperClasses = "mr-3 flex items-center justify-center w-6 h-6 flex-shrink-0";
        const linkTextClasses = "whitespace-nowrap overflow-hidden text-ellipsis font-sans text-[0.95rem] font-medium";

        return (
            <button
                className={buttonClasses}
                onClick={handleLogout}
            >
                <span className={iconWrapperClasses}>
                    <IconComponent name='LogOut' className={`text-white ${iconSize}`} />
                </span>
                <span className={linkTextClasses}>Déconnexion</span>
            </button>
        );
    };