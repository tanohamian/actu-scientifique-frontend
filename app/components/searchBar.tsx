'use client'
import React, { CSSProperties, useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBar {
    placeholder: string
    inputValue: string
    setInputValue: (value: string) => void
}

export default function SearchBarComponent({placeholder, inputValue, setInputValue}: SearchBar) {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const containerStyle: CSSProperties = {
        display: 'flex', 
        width: isMobile ? '100%' : '100%',
        maxWidth: isMobile ? '100%' : isTablet ? '500px' : '600px',
        padding: isMobile ? '8px 15px' : '10px 20px',
        borderRadius: isMobile ? '8px' : '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        margin: isMobile ? '10px 0' : '20px auto',
        backdropFilter: 'blur(10px)',
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
    };

    const inputStyle: CSSProperties = {
        flexGrow: 1, 
        border: 'none', 
        backgroundColor: 'transparent', 
        color: 'white', 
        fontSize: isMobile ? '0.875rem' : '1rem',
        marginLeft: isMobile ? '8px' : '10px',
        outline: 'none',
        width: '100%',
    };

    const iconStyle: CSSProperties = {
        color: 'white', 
        width: isMobile ? '18px' : '20px',
        height: isMobile ? '18px' : '20px',
        flexShrink: 0,
    };

    return(
        <div style={containerStyle}>
            <style>{`
                input::placeholder {
                    color: rgba(255, 255, 255, 0.7);
                }
            `}</style>
            <Search size={isMobile ? 18 : 20} style={iconStyle} />
            
            <input 
                type="text" 
                placeholder={placeholder} 
                value={inputValue} 
                onChange={handleChange} 
                style={inputStyle} 
            />
        </div>
    );
}


