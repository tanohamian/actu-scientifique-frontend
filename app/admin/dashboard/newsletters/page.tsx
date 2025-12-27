"use client"
import React, { useState, useEffect } from 'react';
import ComponenteFormulaire from './components/ComponenteFormulaire';
import Affichage from './components/Affichage';

export default function Page() {
    const MOBILE_BREAKPOINT = 768;
    const [isMobile, setIsMobile] = useState(() => 
        typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const container: React.CSSProperties = {
        minHeight: '100vh',
        padding: isMobile ? '20px' : '40px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        gap: '30px',
        flexDirection: isMobile ? 'column' : 'row'
    };

    const leftSection: React.CSSProperties = {
        flex: isMobile ? 'none' : '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        width: isMobile ? '100%' : 'auto'
    };
    
    const rightSection: React.CSSProperties = {
        width: isMobile ? '100%' : '350px',
        height: 'fit-content',
        alignItems:'flex-start',
        padding:"27px"
    };
    
    const title: React.CSSProperties = {
        color: 'white',
        fontSize: isMobile ? '28px' : '36px',
        fontWeight: 'bold',
        marginBottom: '30px'
    };

    return (
        <div style={container}>
            <div style={leftSection}>
                <h1 style={title}>Gestion des Newsletters</h1>
                <Affichage/>
            </div>
            <div style={rightSection}>
                <ComponenteFormulaire isArticle={false}/>
            </div>
        </div>
    )
}