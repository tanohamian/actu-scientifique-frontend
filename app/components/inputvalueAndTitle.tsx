'use client';
import React, { CSSProperties, useState, useEffect } from 'react';

interface inputAndTitleProps {
    titleInput: string;
    typeInput: 'text' | 'password' | 'email' | 'textarea';
    placeholderInput: string
    inputValue: string;
    setInputValue: (value: string) => void;
}


export default function InputAndTitleComponent({ titleInput, typeInput, placeholderInput, inputValue, setInputValue }: inputAndTitleProps) {
    const [windowWidth, setWindowWidth] = useState(1200);
    const [isFocused, setIsFocused] = useState(false);

    const MOBILE_BREAKPOINT = 768;
    const TABLET_BREAKPOINT = 1024;
    
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const isMobile = windowWidth < MOBILE_BREAKPOINT;
    const isTablet = windowWidth >= MOBILE_BREAKPOINT && windowWidth < TABLET_BREAKPOINT;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    const baseInputStyle: CSSProperties = { 
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: isFocused ? '#3B82F6' : '#D1D5DB', 
        backgroundColor: 'transparent', 
        color: 'white', 
        padding: isMobile ? '0.625rem 0.75rem' : isTablet ? '0.625rem 0.875rem' : '0.75rem 1rem',
        borderRadius: isMobile ? '0.375rem' : '0.5rem',
        width: '100%',
        boxSizing: 'border-box',
        resize: 'none',
        fontFamily: 'sans-serif',
    };

    const textAreaStyle: CSSProperties = {
        ...baseInputStyle,
        minHeight: '120px', 
        lineHeight: '1.5',
    };

    const containerStyle : CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '0.5rem' : '0.75rem',
        width: '100%',
    };

    const InputElement = typeInput === 'textarea' ? (
        <textarea
            placeholder={placeholderInput} 
            value={inputValue} 
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={textAreaStyle} 
        />
    ) : (
        <input 
            type={typeInput} 
            placeholder={placeholderInput} 
            value={inputValue} 
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={baseInputStyle} 
        />
    );


    return(
        <div style={containerStyle}>
            <style>{`
                ::placeholder {
                    color: rgba(255, 255, 255, 0.8);
                }
            `}</style>
            
            <h3 style={{color:"white"}}>{titleInput}</h3>
            
            {InputElement}

        </div>
    )
}