'use client';
import React from 'react';

export interface InputProps {
    typeInput: string;
    placeholderInput: string;
    inputValue: string;
    setInputValue: (value: string) => void;
}

export default function InputComponent({ typeInput, placeholderInput, inputValue, setInputValue }: InputProps) {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const inputClasses = [
        'w-full',
        'border',
        'border-gray-300',
        'text-gray-700',
        'p-2.5',
        'text-sm',
        'rounded-md',
        'outline-none',
        'transition-all',
        'duration-200',
        'ease-in-out',

        'md:p-3',
        'md:text-base',
        'md:rounded-lg',

        'focus:border-blue-500',
        'focus:ring-2',
        'focus:ring-blue-500/30',
    ].join(' ');

    return (
        <input
            type={typeInput}
            placeholder={placeholderInput}
            value={inputValue}
            onChange={handleChange}
            className={inputClasses}
        />
    );
}