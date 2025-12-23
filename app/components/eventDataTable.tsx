'use client';
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Article, Media } from '../admin/dashboard/newsletters/components/Affichage';

export interface TableData {
    title: string;
    name?: string;
    createdAt?: Date | string
    status: 'en direct' | 'pas en direct';
    date?: string;
    lieu?: string;
    heure?: string;
    url?: string;
}

interface EventDataTableProps {
    tableTitle: string;
    data: TableData[] | Media[] | Article[];
    columnHeaders: { key: string; label: string; flexBasis: string }[];
    handleEditEvent?: (item: TableData) => void;
}

const DeleteIcon = () => (
    <button
        className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-red-500"
    >
        <Trash2 size={20} />
    </button>
);

const getStatusClasses = (status: TableData['status']): string => {
    switch (status) {
        case 'en direct':
            return 'text-red-400 font-bold  px-2 py-0.5 rounded-full text-xs';
        case 'pas en direct':
        default:
            return 'text-white/80 font-medium  px-2 py-0.5 rounded-full text-xs';
    }
};

export default function DataTable({ tableTitle, data, columnHeaders, handleEditEvent }: EventDataTableProps) {


    return (
        <div className="bg-[#50789B] p-5 rounded-lg mt-5 shadow-xl font-sans">
            <h2 className="text-white text-xl mb-5 font-bold">{tableTitle}</h2>

            {/* En-tête (Desktop) */}
            <div className="hidden md:flex p-2 border-b border-white/40 font-bold text-sm uppercase text-white">
                {columnHeaders.map(header => (
                    <div
                        key={header.key}
                        // Utilisation du style inline pour flexBasis car Tailwind ne le gère pas directement avec des pourcentages dynamiques
                        style={{ flexBasis: header.flexBasis }}
                        className={`flex-shrink-0 flex-grow-0`}
                    >
                        {header.label}
                    </div>
                ))}
            </div>

            <div className="max-h-[40vh] overflow-y-auto overflow-x-hidden">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row py-4 md:py-3 border-b border-white/20 items-start md:items-center text-white text-sm md:text-base"
                    >
                        {columnHeaders.map(header => {
                            const isActionColumn = header.key === 'actions';

                            const cellClasses = `
                                flex 
                                items-center 
                                w-full 
                                md:w-auto 
                                ${isActionColumn ? 'mt-3 md:mt-0 justify-end md:justify-start' : 'mb-1 md:mb-0'}
                            `;

                            let content: React.ReactNode = (item as any)[header.key] || '';

                            if (header.key === 'status') {
                                content = (
                                    <span className={getStatusClasses((item as TableData).status)}>{(item as TableData).status}</span>
                                );
                            }

                            if (isActionColumn) {
                                content = (
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-blue-400"
                                            onClick={handleEditEvent ? () => handleEditEvent(item as TableData) : undefined}
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <DeleteIcon />
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={header.key}
                                    className={cellClasses}
                                    style={{ flexBasis: header.flexBasis }}
                                >
                                    <span className="font-bold mr-2 md:hidden min-w-[80px]">
                                        {header.label}:
                                    </span>
                                    {content}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}