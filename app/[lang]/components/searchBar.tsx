'use client'
import React, { Dispatch, SetStateAction } from 'react';
import { Search } from 'lucide-react';

interface SearchBar {
    placeholder: string
    inputValue: string
    setFocus : Dispatch<SetStateAction<boolean>>
    setInputValue: (value: string) => void
}

const placeholderStyle = `
    .search-input::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }
`;

export default function SearchBarComponent({placeholder, inputValue, setInputValue, setFocus}: SearchBar) {
  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const OnFocus = ()=>{
        setFocus(true)
        //alert("onFocus")
    }
    const OnBlur = ()=>{
        setFocus(false)
        //alert("onBlur")
    }
    const containerClasses = [
        'flex', 
        'w-full', 
        'items-center', 
        'bg-white/20', 
        'backdrop-blur-sm', 
        'font-sans',

        'p-2',
        'rounded-lg', 
        'md:p-3', 
        'md:rounded-xl', 

        'max-w-full', 
        'md:max-w-lg', 
        'lg:max-w-xl', 

        'my-2.5', 
        'md:my-5', 
        'md:mx-auto' 
    ].join(' ');

    const inputClasses = [
        'search-input', 
        'flex-grow', 
        'border-none',
        'bg-transparent', 
        'text-white', 
        'text-sm', 
        'md:text-base', 
        'ml-2', 
        'md:ml-2.5', 
        'outline-none', 
        'w-full' 
    ].join(' ');

    const iconClasses = "text-white flex-shrink-0";


    return(
        <div className={containerClasses}>
            <style jsx global>{placeholderStyle}</style>
            
            <Search 
                size={20} 
                className={iconClasses} 
            />
            
            <input 
                type="text" 
                placeholder={placeholder} 
                value={inputValue} 
                onChange={handleChange} 
                className={inputClasses} 
                onBlur={()=>OnBlur()}
                onChangeCapture={()=>OnFocus()}
                onFocus={()=>OnFocus()}
            />
        </div>
    );
}