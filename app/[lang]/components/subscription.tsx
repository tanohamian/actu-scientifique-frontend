'use client'
import React from 'react';

export interface PlanProps {
    title: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
}

export default function SusbscriptionCard({ title, price, features, isPopular, buttonText }: PlanProps) {
    return (
        <div className={`
            h-[75vh] relative flex flex-col items-center bg-white rounded-3xl px-9 py-8 shadow-2xl w-full max-w-[380px] 
            transition-all duration-500 ease-in-out
            ${isPopular
                ? 'border-[6px] border-[#E65A46] z-10 -translate-y-12' // Décalage plus fort pour l'effet "Pop"
                : 'border-none translate-y-0'
            } 
            hover:scale-105
        `}>

            {/* Badge "Le plus populaire" */}
            {isPopular && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#E65A46] text-white text-lg font-black px-5 py-2.5 rounded-xl uppercase tracking-widest whitespace-nowrap shadow-lg">
                    ✨ LE PLUS POPULAIRE ✨
                </div>
            )}

            {/* Titre de l'abonnement */}
            <h3 className="text-2xl font-black text-gray-900 text-center mb-4 mt-4 leading-tight h-16 flex items-center justify-center">
                {title}
            </h3>

            {/* Prix */}
            <div className="text-[#E65A46] text-5xl font-black mb-12 tracking-tight">
                {price}
            </div>

            {/* Liste des avantages - Alignée au centre comme sur la photo */}
            <ul className="flex-grow flex flex-col gap-8 mb-10 w-full">
                {features.map((feature, index) => (
                    <li key={index} className="flex flex-row items-center gap-2">
                        <span className="flex-shrink-0 w-7 h-7 bg-[#E65A46] rounded-full flex items-center justify-center text-white text-[14px] shadow-sm">
                            ✓
                        </span>
                        <p className="text-lg font-bold text-gray-900 leading-snug px-2">
                            {feature}
                        </p>
                    </li>
                ))}
            </ul>

            <button className={`
                w-full py-4 px-6 rounded-2xl font-black text-lg text-white 
                bg-[#E65A46] hover:bg-[#d14d3a] transition-all 
                active:scale-95 shadow-[0_10px_20px_-5px_rgba(230,90,70,0.4)]
            `}>
                {buttonText}
            </button>
        </div>
    );
};