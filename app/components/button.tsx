'use client';
import React, { CSSProperties, useState, useEffect } from 'react';

interface ButtonText {
    textButton: string;
    onclick?: () => void;
    size?: 'small' | 'medium' | 'large';
  
}

export default function ButtonComponent({ 
    textButton, 
    onclick, 
    size = 'medium',
   
}: ButtonText) {
    const [windowWidth, setWindowWidth] = useState(1200);
    const [isHovered, setIsHovered] = useState(false);
    //const [isPressed, setIsPressed] = useState(false);
    
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

    
    const getSizeStyles = () => {
        const sizes = {
            small: {
                mobile: { padding: '4px 10px', fontSize: '0.75rem' },
                tablet: { padding: '5px 11px', fontSize: '0.8125rem' },
                desktop: { padding: '6px 10px', fontSize: '0.875rem' },
            },
            medium: {
                mobile: { padding: '6px 14px', fontSize: '0.875rem' },
                tablet: { padding: '7px 40px', fontSize: '0.9375rem' },
                desktop: { padding: '8px 18px', fontSize: '1rem' },
            },
            large: {
                mobile: { padding: '8px 18px', fontSize: '1rem' },
                tablet: { padding: '10px 22px', fontSize: '1.0625rem' },
                desktop: { padding: '12px 24px', fontSize: '1.125rem' },
            },
        };

        if (isMobile) return sizes[size].mobile;
        if (isTablet) return sizes[size].tablet;
        return sizes[size].desktop;
    };

    const sizeStyles = getSizeStyles();

    

   const buttonStyle: CSSProperties = {
    backgroundColor: "#E65A46",
    padding: sizeStyles.padding,
    borderRadius: isMobile ? '0.375rem' : '0.5rem',
    border: 'none',
    fontSize: sizeStyles.fontSize,
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out',
    fontFamily: 'sans-serif',
    boxShadow: isHovered ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    minHeight: isMobile ? '36px' : '40px',
    color: 'white',
    whiteSpace: 'nowrap', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
};

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if ( onclick) {
            onclick();
        }
    };

    return (
        <button 
            style={buttonStyle} 
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
       
        >
            {textButton}
        </button>
    );
}
