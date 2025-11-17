// EventDataTable.tsx
'use client';
import React, { CSSProperties, useState,useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';


export interface TableData {
    title: string;
    status: 'en direct' | 'pas en direct';
    date?: string; 
    lieu?: string; 
    heure?: string; 
    url?: string; 
}

interface EventDataTableProps {
    tableTitle: string;
    data: TableData[];
    columnHeaders: { key: string; label: string; flexBasis: string }[];
    handleEditEvent?: (item: TableData) => void;
}

const iconButtonStyle: CSSProperties = {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease-in-out',
            color: 'white',
        };




const DeleteIcon = () => (
    <button style={iconButtonStyle}>
        <Trash2 size={20} />
    </button> 
);

const getStatusStyle = (status: TableData['status']): CSSProperties => {
    switch (status) {
        case 'en direct':
            return { color: 'red', fontWeight: 'bold' };
        case 'pas en direct':
        default:
            return { color: 'red', fontWeight: 'bold' };
    }
};

export default function EventDataTable({ tableTitle, data, columnHeaders,handleEditEvent }: EventDataTableProps) {
    const [windowWidth, setWindowWidth] = useState(1200);
    const MOBILE_BREAKPOINT = 768; 

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < MOBILE_BREAKPOINT;

    const tableBodyStyle: CSSProperties = {
        maxHeight: '40vh', 
        overflowY: 'auto', 
        overflowX: 'hidden',
        fontFamily: 'sans-serif',
    };

    const headerCellStyle: CSSProperties = {
        display: isMobile ? 'none' : 'flex', 
        padding: '10px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        color: 'white',
    };
    const rowStyle: CSSProperties = {
        flexDirection: isMobile ? 'column' : 'row', 
        display: 'flex',
        padding: '15px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        color: 'white',
    };

    return (
        <div style={{ backgroundColor: '#50789B', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>{tableTitle}</h2>

            <div style={headerCellStyle}>
                {columnHeaders.map(header => (
                    <div key={header.key} style={{ flexBasis: header.flexBasis }}>{header.label}</div>
                ))}
            </div>

            <div style={tableBodyStyle}>
                {data.map((item, index) => (
                <div key={index} style={rowStyle}>
                    {columnHeaders.map(header => {
                        const cellStyle: CSSProperties = { 
                            flexBasis: isMobile ? '100%' : header.flexBasis,
                            padding: isMobile ? '5px 0' : '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: header.key === 'actions' && isMobile ? 'flex-start' : 'initial',
                        };
                        let content: React.ReactNode = (item as any)[header.key] || '';

                        if (header.key === 'status') {
                            content = (
                                <span style={getStatusStyle(item.status)}>{item.status}</span>
                            );
                        }
                        
                        if (header.key === 'actions') {
                            content = (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={iconButtonStyle} onClick={handleEditEvent ? () => handleEditEvent(item) : undefined} >
                                        <Pencil size={20} />
                                    </button> 
                                    <DeleteIcon/>
                                </div>
                            );
                        }

                        return (
                            <div key={header.key} style={cellStyle}>
                                {isMobile && (
                                    <span style={{ fontWeight: 'bold', marginRight: '10px', minWidth: '80px' }}>
                                        {header.label}:
                                    </span>
                                )}
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