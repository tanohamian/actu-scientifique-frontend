'use client';

import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// Les imports d'images restent inchangés
import dashboardIcon from '@public/icones/dashboard.png';
import articleIcon from '@public/icones/article.png';
import mediaIcon from '@public/icones/media.png';
import formationIcon from '@public/icones/formation.png';
import newslettersIcon from '@public/icones/newsletters.png';
import produitIcon from '@public/icones/produit.png';
import usersIcon from '@public/icones/Users.png';
import actualiteIcon from '@public/icones/actualite.png';
import eventIcon from '@public/icones/event.png';
import deconnexionIcon from '@public/icones/deconnexion.png';

interface NavItems{
    name: string,
    path: string,
    icon: StaticImageData 
}

export default function SidebarComponent(){
    const [isMobile, setIsMobile] = useState(false);
    const sidebarWidth = isMobile ? '80px' : '256px';

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            handleResize();
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);



    const navItems : NavItems[] = [
        {name:"Tableau de bord", path:"/admin/dashboard", icon: dashboardIcon},
        {name:"Gestion des articles", path:"/admin/dashboard/gestion_article", icon: articleIcon},
        {name:"Medias", path:"/admin/dashboard/medias", icon: mediaIcon},
        {name:"Formations & Bourses", path:"/admin/dashboard/formations_bourses", icon: formationIcon},
        {name:"Newsletters", path:"/admin/dashboard/newsletters", icon: newslettersIcon},
        {name:"Produit & Commandes", path:"/admin/dashboard/produit_commandes", icon: produitIcon},
        {name:"Utilisateurs", path:"/admin/dashboard/users", icon: usersIcon},
        {name:"Fil d'actualité", path:"/admin/dashboard/fil_actualite", icon: actualiteIcon},
        {name:"Evènements", path:"/admin/dashboard/event", icon: eventIcon}
    ]

    const sidebarContainerStyle: React.CSSProperties = {
        width: sidebarWidth, 
        backgroundColor: '#50789B', 
        color: '#FFFFFF', 
        display: 'flex',
        flexDirection: 'column', 
        height: '100vh', 
        position: 'fixed', 
        top: 0,
        left: 0,
        transition: 'width 0.3s ease-in-out', 
        zIndex: 10, 
    };

    const headerStyle: React.CSSProperties = {
        padding: '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        borderBottom: '1px solid white',
    };

    const avatarCircleStyle: React.CSSProperties = {
        borderRadius: '50%',
        backgroundColor: '#50789B', 
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: '0.75rem',
        flexShrink: 0,
    };

    const avatarTextStyle: React.CSSProperties = {
        fontSize: '0.875rem', 
        fontWeight: '500', 
        lineHeight: '1.25',
        display: isMobile ? 'none' : 'block', 
        transition: 'opacity 0.3s ease-in-out',
        fontFamily:"sans-serif"
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

    };

    const iconWrapperStyle: React.CSSProperties = {
        marginRight: '0.75rem', 
        display: 'flex', 
        alignItems: 'center',
       
    };

    const linkTextStyle: React.CSSProperties = {
        display: isMobile ? 'none' : 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        color:'white',
        textOverflow: 'ellipsis',
        textDecoration: 'none',
        fontFamily:"sans-serif"
    };

    const footerStyle: React.CSSProperties = {
        padding: '1rem', 
        borderTop: '1px solid white'
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
        justifyContent: isMobile ? 'center' : 'flex-start',
    };

    const NavLinkItem = ({ item }: { item: NavItems }) => {
        const [isHovered, setIsHovered] = useState(false);

        const activeLinkStyle: React.CSSProperties = {
            ...linkStyle,
            backgroundColor: isHovered ? '#E65A46' : 'transparent',
            textDecoration:'none'
        };

        return (
            <Link 
                href={item.path}
                style={activeLinkStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span style={iconWrapperStyle}>
                    <Image 
                        src={item.icon} 
                        alt={`${item.name} icône`} 
                        width={17}
                        height={28}
                    />
                </span>
                <span style={linkTextStyle}>{item.name}</span>
            </Link>
        );
    };

    const DisconnectButton = () => {
        const [isHovered, setIsHovered] = useState(false);

        const activeButtonStyle: React.CSSProperties = {
            ...buttonStyle,
            backgroundColor: isHovered ? '#374151' : 'transparent'
        };

        return (
            <button
                style={activeButtonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span style={iconWrapperStyle}>
                    <Image 
                        src={deconnexionIcon} 
                        alt="Déconnexion icône" 
                        width={20} 
                        height={20}
                    />
                </span>
                <span style={linkTextStyle}>Déconnexion</span>
            </button>
        );
    };


    return(
        <div style={sidebarContainerStyle}> 
        
          <div style={headerStyle}>
            <div style={avatarCircleStyle}>
              <span style={{ fontSize: '1.25rem' }}></span>
            </div>
            <div style={avatarTextStyle}>
              Administrateur<br />
              Emmanuel Dabo
            </div>
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