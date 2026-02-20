'use client';
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Property } from "csstype"
import { Rubriques } from '../enum/enums';
import { Article, DbMedia } from '../interfaces';

export interface TableData {
    id?: string | number
    title: string;
    name?: string;
    rubrique?: Rubriques
    createdAt?: Date | string
    location?: string
    status?: 'en direct' | 'pas en direct';
    date?: string;
    time?: string;
    url?: string;
}

export interface EventInterface {
    id?: string
    title?: string
    location?: string
    date?: Date | string
    description?: string
    createdAt?: Date | string
    time?: string
    url?: string
    status?: boolean
}

export type ElementType = DbMedia | Article | TableData

interface EventDataTableProps {
    tableTitle: string;
    data: TableData[] | DbMedia[] | Article[] | EventInterface[];
    isMedia?: boolean;

    columnHeaders: { key: string; label: string; flexBasis: string, textAlign?: Property.TextAlign, type?: string }[];
    handleEditEvent?: (item: ElementType) => void;
    handleDeleteEvent?: (item: ElementType) => void;
}

const getStatusClasses = (status: TableData['status']): string => {
    switch (status) {
        case 'en direct':
            return 'text-red-400 font-bold  px-2 py-0.5 rounded-full text-xs';
        case 'pas en direct':
        default:
            return 'text-white/80 font-medium  px-2 py-0.5 rounded-full text-xs';
    }
};

const rubriqueTranslations: Record<string, string> = {
    'one_health': 'Une seule santé',
    'technology': 'Technologie',
    'ecohumanity': 'Éco-humanité',
    'port_discovery': 'Portrait et découvertes'
};

export const translateRubrique = (rubrique: string): string => {
    return rubriqueTranslations[rubrique] || rubrique;
};

export default function DataTable({ tableTitle, data, columnHeaders, handleEditEvent, handleDeleteEvent, isMedia = false }: EventDataTableProps) {


    return (
        <div className={"bg-[#50789B] p-5 rounded-lg mt-5 shadow-xl font-sans " + isMedia ? "w-full bg-[#50789B] p-5 rounded-lg mt-5 shadow-xl font-sans " : "w-200"}>
            <h2 className="text-white text-xl mb-5 font-bold">{tableTitle}</h2>

            {/* En-tête (Desktop) */}
            <div className="hidden md:flex p-2 border-b border-white/40 font-bold text-sm uppercase text-white">
                {columnHeaders.map(header => (
                    <div
                        key={header.key}
                        style={{ flexBasis: header.flexBasis, textAlign: header?.textAlign || "left" }}
                        className={`shrink-0 grow-0`}
                    >
                        <span>{header.label}</span>
                    </div>
                ))}
            </div>

            <div className="max-h-[40vh] overflow-y-auto overflow-x-hidden">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row py-4 md:py-3 border-b border-white/25 items-start md:items-center text-white text-sm md:text-base"
                    >
                        {
                            columnHeaders.map(header => {
                                const isActionColumn = header.key === 'actions';
                                //const isURLColumn = header.key === 'url';

                                const cellClasses = `
                                flex 
                                items-center 
                                w-full 
                                md:w-auto 
                                ${isActionColumn ? 'mt-3 md:mt-0 justify-end md:justify-start' : 'mb-1 md:mb-0'}
                            `;

                                let content: React.ReactNode = (item as unknown as Record<string, unknown>)[header.key] as React.ReactNode || '';

                                if (header.key === 'status') {
                                    content = (
                                        <span className={getStatusClasses((item as TableData).status)}>{(item as TableData).status}</span>
                                    );
                                }

                                if (header.key === 'rubrique' && (item as Article).rubrique) {
                                    content = translateRubrique((item as Article).rubrique as string);
                                }

                                if (isActionColumn) {
                                    content = handleDeleteEvent && handleEditEvent ?(
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-blue-400"
                                                onClick={handleEditEvent ? () => handleEditEvent(item as TableData) : undefined}
                                            >
                                                <Pencil size={20} />
                                            </button>
                                            <button
                                                className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-red-400"
                                                onClick={handleDeleteEvent ? () => handleDeleteEvent(item as TableData) : undefined}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ): handleDeleteEvent ? (
                                        <button
                                                className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-red-400"
                                                onClick={handleDeleteEvent ? () => handleDeleteEvent(item as TableData) : undefined}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                    ) : (   
                                    
                                    
                                        <button
                                                className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-blue-400"
                                                onClick={handleEditEvent ? () => handleEditEvent(item as TableData) : undefined}
                                            >
                                                <Pencil size={20} />
                                    </button>
                                        
                                        )
                                }
                                const rawValue = (item as { [key: string]: string })[header.key];

                                if (header.key === "createdAt" && rawValue) {
                                    const dateObj = new Date(rawValue);

                                    if (!isNaN(dateObj.getTime())) {
                                        content = dateObj.toLocaleString('fr-FR', {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric"
                                        });
                                    }
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
                                        {header.type === "url" ? (
                                            <a
                                                href={content as string}
                                                className="hover:underline text-blue-400 lowercase italic"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {(content as string).substring(0, 48) + '...'}
                                            </a>
                                        ) : (
                                            <div style={header.textAlign === "center" ? { margin: "auto auto" } : {}}>
                                                {content}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}