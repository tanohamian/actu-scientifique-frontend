'use client';
import React from 'react';

interface inputAndTitleProps {
    titleInput: string;
    typeInput: 'text' | 'password' | 'email' | 'textarea';
    placeholderInput: string
    inputValue: string;
    setInputValue: (value: string) => void;
}

// Styles pour cibler le placeholder (non possible avec Tailwind direct)
const placeholderStyle = `
    .custom-input::placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
`;


export default function InputAndTitleComponent({ titleInput, typeInput, placeholderInput, inputValue, setInputValue }: inputAndTitleProps) {
    
    // Suppression de windowWidth, useEffect, isFocused, et de la logique de breakpoint.

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    const baseInputClasses = [
        'custom-input', 
        'border', 
        'border-gray-300', 
        'bg-transparent', 
        'text-white', 
        'w-full', 
        'box-border', 
        'font-sans',

        'p-2.5', 
        'rounded-md', 
        'md:p-3', 
        'md:rounded-lg', 

        'focus:border-blue-500', 
        'focus:ring-2',
        'focus:ring-blue-blue-500/30',
        'outline-none',
        'transition-all',
        'duration-200',
    ].join(' ');

    const textAreaClasses = [
        'min-h-[120px]', 
        'leading-relaxed', 
        'resize-none', 
    ].join(' ');

    const containerClasses = "flex flex-col w-full gap-2 md:gap-3";

    const InputElement = typeInput === 'textarea' ? (
        <textarea
            placeholder={placeholderInput} 
            value={inputValue} 
            onChange={handleChange}
            className={`${baseInputClasses} ${textAreaClasses}`}
        />
    ) : (
        <input 
            type={typeInput} 
            placeholder={placeholderInput} 
            value={inputValue} 
            onChange={handleChange}
            className={baseInputClasses} 
        />
    );


    return(
        <div className={containerClasses}>
            <style jsx global>{placeholderStyle}</style>
            
            <h3 className="text-white text-base md:text-lg font-medium">{titleInput}</h3>
            
            {InputElement}

        </div>
    )
}