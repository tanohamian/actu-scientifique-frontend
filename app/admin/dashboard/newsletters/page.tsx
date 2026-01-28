"use client"
import React, { useState, useEffect } from 'react';
import Affichage, { ItemType, Newsletter } from './components/Affichage';
import { env } from '@/app/config/env';
import ComponenteFormulaire from './components/ComponenteFormulaire';
console.log(env)
export default function Page() {
    const MOBILE_BREAKPOINT = 768;
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
    );

    // ÉTATS POUR LA COMMUNICATION
    const [selectedItem, setSelectedItem] = useState<ItemType|null>(null);
    const [refreshSignal, setRefreshSignal] = useState(0);

    const handleSuccess = () => {
        setSelectedItem(null); // Reset le formulaire
        setRefreshSignal(prev => prev + 1); // Notifie Affichage de se recharger
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
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
        alignItems: 'flex-start',
        padding: "0px"
    };

    const titre: React.CSSProperties = {
        color: 'white',
        fontSize: isMobile ? '28px' : '36px',
        fontWeight: 'bold',
        marginBottom: '30px'
    };

    return (
        <div style={container}>
            <div style={leftSection}>
                <h1 style={titre}>Gestion des Newsletters</h1>
                <Affichage
                    key={refreshSignal}
                    onEdit={(item) => setSelectedItem(item)}
                />
            </div>
            <div style={rightSection}>
                <ComponenteFormulaire
                    isArticle={false}
                    initialData={selectedItem as Newsletter}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    )
}