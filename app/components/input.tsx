'use client';
import React, { CSSProperties, useState, useEffect } from 'react';

interface InputProps {
    typeInput: string;
    placeholderInput: string;
    inputValue: string;
    setInputValue: (value: string) => void;
}

export default function InputComponent({ typeInput, placeholderInput, inputValue, setInputValue }: InputProps) {
    const [windowWidth, setWindowWidth] = useState(1200);
    const [isFocused, setIsFocused] = useState(false);
    
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

    const inputStyle: CSSProperties = {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: isFocused ? '#3B82F6' : '#D1D5DB',
        color: '#374151',
        padding: isMobile ? '0.625rem 0.75rem' : isTablet ? '0.625rem 0.875rem' : '0.75rem 1rem',
        borderRadius: isMobile ? '0.375rem' : '0.5rem',
        outline: 'none',
        width: '100%',
        fontSize: isMobile ? '0.875rem' : isTablet ? '0.9375rem' : '1rem',
        transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        boxShadow: isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
    };
    
    return (
        <input 
            type={typeInput} 
            placeholder={placeholderInput} 
            value={inputValue} 
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={inputStyle} 
        />
    );
}

