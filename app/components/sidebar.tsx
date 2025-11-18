'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Menu, X } from 'lucide-react';
import IconComponent from '@components/Icons';

interface NavItems{
    name: string,
    path: string,
    icon: React.ReactElement
}

export default function SidebarComponent({ onClose, isMobile }: { onClose?: () => void; isMobile: boolean }){
    const sidebarWidth = '256px';

    const iconStyle: React.CSSProperties = {
    color: 'white', 
    width: '20px', 
    height: '20px',
    };

    const navItems : NavItems[] = [
        {name:"Tableau de bord", path:"/admin/dashboard", icon: <IconComponent  name='ControlPanel' style={iconStyle} />},
        {name:"Gestion des articles", path:"/admin/dashboard/gestion_article", icon: <IconComponent  name='List' style={iconStyle} />},
        {name:"Medias", path:"/admin/dashboard/medias", icon: <IconComponent  name='Video' style={iconStyle} />},
        {name:"Formations & Bourses", path:"/admin/dashboard/formations_bourses", icon: <IconComponent  name='Feed' style={iconStyle} />},
        {name:"Newsletters", path:"/admin/dashboard/newsletters", icon: <IconComponent  name='Envelope' style={iconStyle} />},
        {name:"Produit & Commandes", path:"/admin/dashboard/produit_commandes", icon: <IconComponent  name='Product' style={iconStyle} />},
        {name:"Utilisateurs", path:"/admin/dashboard/users", icon: <IconComponent  name='UsersOnline' style={iconStyle} />},
        {name:"Fil d'actualité", path:"/admin/dashboard/fil_actualite", icon: <IconComponent  name='Rss' style={iconStyle} />},
        {name:"Evènements", path:"/admin/dashboard/event", icon: <IconComponent  name='Schedule' style={iconStyle} />}
    ]


const sidebarContainerStyle: React.CSSProperties = {
        width: sidebarWidth,
        backgroundColor: '#50789B',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative',
    };

    const headerStyle: React.CSSProperties = {
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    };

    const userInfoStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
    };

    const avatarCircleStyle: React.CSSProperties = {
        borderRadius: '50%',
        backgroundColor: '#3d6080',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '0.75rem',
        flexShrink: 0,
        fontSize: '1.25rem',
        fontWeight: 'bold',
    };

    const avatarTextStyle: React.CSSProperties = {
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '1.25',
        fontFamily: 'sans-serif',
    };

    const closeButtonStyle: React.CSSProperties = {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
    };

    const navStyle: React.CSSProperties = {
        flexGrow: 1,
        padding: '0.5rem',
        overflowY: 'auto',
    };

    const linkStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem',
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
        borderRadius: '0.5rem',
        transition: 'background-color 0.15s ease-in-out',
        textDecoration: 'none',
        color: 'white',
    };

    const iconWrapperStyle: React.CSSProperties = {
        marginRight: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        width: '24px',
        height: '24px',
        justifyContent: 'center',
    };

    const linkTextStyle: React.CSSProperties = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontFamily: 'sans-serif',
        fontSize: '0.95rem',
    };

    const footerStyle: React.CSSProperties = {
        padding: '1rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    };

    const buttonStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem',
        width: '100%',
        borderRadius: '0.5rem',
        backgroundColor: 'transparent',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease-in-out',
    };

    const NavLinkItem = ({ item }: { item: NavItems }) => {
        const [isHovered, setIsHovered] = useState(false);

        const activeLinkStyle: React.CSSProperties = {
            ...linkStyle,
            backgroundColor: isHovered ? '#d78376ff' : 'transparent',
        };

        return (
            <Link
                href={item.path}
                style={activeLinkStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={isMobile ? onClose : undefined}
            >
                <span style={iconWrapperStyle}>
                    {item.icon ? (
                        item.icon
                    ) : (
                        <span style={{ width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '4px' }} />
                    )}
                </span>
                <span style={linkTextStyle}>{item.name}</span>
            </Link>
        );
    };

    const DisconnectButton = () => {
        const [isHovered, setIsHovered] = useState(false);

        const activeButtonStyle: React.CSSProperties = {
            ...buttonStyle,
            backgroundColor: isHovered ? '#d78376ff' : 'transparent',
        };

        return (
            <button
                style={activeButtonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span style={iconWrapperStyle}>
                    <IconComponent  name='LogOut' style={iconStyle} />
                </span>
                <span style={linkTextStyle}>Déconnexion</span>
            </button>
        );
    };

    return (
        <div style={sidebarContainerStyle}>
            <div style={headerStyle}>
                <div style={userInfoStyle}>
                    <div style={avatarCircleStyle}>
                        <span>ED</span>
                    </div>
                    <div style={avatarTextStyle}>
                        Administrateur<br />
                        Emmanuel Dabo
                    </div>
                </div>
                {isMobile && onClose && (
                    <button onClick={onClose} style={closeButtonStyle} aria-label="Fermer le menu">
                       <X size={24} />
                    </button>
                )}
            </div>

            <nav style={navStyle}>
                {navItems.map((item) => (
                    <NavLinkItem key={item.path} item={item} />
                ))}
            </nav>

            <div style={footerStyle}>
                <DisconnectButton />
            </div>
        </div>
    );
}
