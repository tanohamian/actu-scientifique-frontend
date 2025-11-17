'use client'
import ButtonComponent from "@/app/components/button";
import React, { CSSProperties, useState, useEffect,useMemo } from 'react';
import { Pencil, Trash2, X, ChevronDown } from 'lucide-react';




export interface FormFieldConfig {
    name: string; 
    label: string; 
    type: 'text' | 'email' | 'password' | 'select' | 'textarea'; 
    placeholder?: string; 
    required?: boolean; 
    options?: { value: string; label: string }[]; 
}

interface AddElementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    titleComponent: string;
    buttonTitle: string;
    fields: FormFieldConfig[];
    initialData?: { [key: string]: string };
}



export default function AddElementModal  ({ isOpen, onClose, onSubmit,titleComponent,buttonTitle,fields,initialData={} }: AddElementModalProps)  {
    const [windowWidth, setWindowWidth] = useState(1200);

    const initialFormData = () => {
        return fields.reduce((acc, field) => {
            acc[field.name] = initialData[field.name] || '';
            return acc;
        }, {} as { [key: string]: string });
    };
    const initialFormDataMemo = useMemo(initialFormData, [fields, initialData]);

    const [formData, setFormData] = useState(initialFormDataMemo);

    useEffect(() => {
        
        setFormData(initialFormDataMemo);
    }, [initialFormDataMemo,isOpen]);


    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const isMobile = windowWidth < 768;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData(initialFormDataMemo);
    };

    const overlayStyle: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: isMobile ? '1rem' : '2rem',
    };

    const modalStyle: CSSProperties = {
        backgroundColor: '#5A8FAC',
        borderRadius: '1rem',
        padding: isMobile ? '1.5rem' : '2rem',
        width: '100%',
        maxWidth: isMobile ? '100%' : '300px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
    };

    const headerStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    };

    const titleStyle: CSSProperties = {
        fontSize: isMobile ? '1.25rem' : '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        margin: 0,
        fontFamily: 'sans-serif',
    };

    const closeButtonStyle: CSSProperties = {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
    };

    const formStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    };

    const labelStyle: CSSProperties = {
        color: 'white',
        fontSize: isMobile ? '0.875rem' : '1rem',
        marginBottom: '0.5rem',
        fontWeight: '500',
        fontFamily: 'sans-serif',
    };

    const inputStyle: CSSProperties = {
        width: '100%',
        padding: isMobile ? '0.75rem' : '0.8rem',
        borderRadius: '0.5rem',
        border: 'none',
        backgroundColor: '#2d4f6b',
        color: 'white',
        fontSize: isMobile ? '0.875rem' : '1rem',
        outline: 'none',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
    };

    const selectContainerStyle: CSSProperties = {
        position: 'relative',
        width: '100%',
    };

    const selectStyle: CSSProperties = {
        ...inputStyle,
        appearance: 'none',
        cursor: 'pointer',
    };

   const  labelInputStyle : CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
    };

    const selectIconStyle: CSSProperties = {
        position: 'absolute',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: 'white',
    };

    const handleChange = (name: string, value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };


    const renderField = (field: FormFieldConfig) => {
        switch (field.type) {
            case 'select':
                return (
                    <div key={field.name} style={labelInputStyle}>
                        <label style={labelStyle}>{field.label}</label>
                        <div style={selectContainerStyle}>
                            <select
                                style={selectStyle}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                required={field.required}
                            >
                                <option value="">Sélectionner {field.label.toLowerCase()}</option>
                                {field.options?.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <ChevronDown style={selectIconStyle} size={20} />
                        </div>
                    </div>
                );
            case 'text':
            case 'email':
            case 'password':
            default:
                return (
                    <div key={field.name} style={labelInputStyle}>
                        <label style={labelStyle}>{field.label}</label>
                        <input
                            type={field.type}
                            style={inputStyle}
                            placeholder={field.placeholder || ''}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            required={field.required}
                        />
                    </div>
                );
        }
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>{titleComponent}</h2>
                    <button style={closeButtonStyle} onClick={onClose} aria-label="Fermer">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={formStyle}>
                    {fields.map(field => renderField(field))}
                    <div style={{ marginTop: '1rem' , justifyContent: 'center', display: 'flex' }}>
                        <ButtonComponent textButton={buttonTitle} size="medium"/>
                    </div>
                </form>
            </div>

            <style>{`
                input::placeholder, select::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }
                select option {
                    background-color: #2d4f6b;
                    color: white;
                }
            `}</style>
        </div>
    );
};
