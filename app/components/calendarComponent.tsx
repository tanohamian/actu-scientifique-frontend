'use client';

import React, { useState, useEffect, CSSProperties } from 'react'; // Ajout de CSSProperties
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarComponent() {

    const [value, onChange] = useState<Value>(new Date());
    const [windowWidth, setWindowWidth] = useState(1200);

    const MOBILE_BREAKPOINT = 768;
    const TABLET_BREAKPOINT = 1024;
    
    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < MOBILE_BREAKPOINT;
    const isTablet = windowWidth >= MOBILE_BREAKPOINT && windowWidth < TABLET_BREAKPOINT;
    
    // Ajout d'une classe pour centrer et gérer la largeur de base
    const containerClass = isMobile ? 'calendar-wrapper mobile' : 'calendar-wrapper';

    // Optionnel : un style en ligne pour centrer sur la page si vous ne voulez pas de CSS externe
    const wrapperStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        padding: isMobile ? '10px' : '20px',
        maxWidth: '100%',
        boxSizing: 'border-box',
    };

    return (
        // Utilisation du style en ligne et de la classe
        <div style={wrapperStyle} className={containerClass}> 
            <Calendar 
                onChange={onChange} 
                value={value} 
            />
        </div>
    );
}