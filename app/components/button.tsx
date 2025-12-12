'use client';
import React from 'react';

interface ButtonText {
    textButton: string;
    onclick?: () => void;
    size?: 'small' | 'medium' | 'large' | 'big';
}

export default function ButtonComponent({ 
    textButton, 
    onclick, 
    size = 'medium',
}: ButtonText) {
    


    const baseClasses = "bg-[#E65A46] text-white font-medium rounded-lg border-none transition-all duration-200 ease-in-out whitespace-nowrap flex justify-center items-center font-sans";
    
    const getSizeClasses = () => {
        switch (size) {
            case 'small':
                return 'px-2.5 py-1 text-xs md:px-3 md:py-1.5 md:text-sm min-h-[36px] md:min-h-[40px]';
            case 'medium':
                return 'px-4 py-2 text-sm md:px-5 md:py-2.5 md:text-base min-h-[36px] md:min-h-[44px]';
            case 'large':
                return 'px-5 py-3 text-base md:px-6 md:py-3.5 md:text-lg min-h-[40px] md:min-h-[50px]';
            default:
                return 'px-4 py-2 text-sm md:px-5 md:py-2.5 md:text-base min-h-[36px] md:min-h-[44px]';
        }
    };

    const interactiveClasses = "hover:bg-[#d64e3f] active:bg-[#c24536] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E65A46]/50";


    const finalClasses = `${baseClasses} ${getSizeClasses()} ${interactiveClasses}`;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onclick) {
            onclick();
        }
    };

    return (
        <button 
            className={finalClasses} 
            onClick={handleClick}
        >
            {textButton}
        </button>
    );
}