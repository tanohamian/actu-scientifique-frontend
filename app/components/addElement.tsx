'use client'
import ButtonComponent from "@/app/components/button";
import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronDown, Upload } from 'lucide-react';
import { Product } from "../admin/page";
import { env } from "../config/env";
import Image from "next/image";
import { ElementType } from "./eventDataTable";

export interface FormFieldConfig {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'file' | 'number' | 'date' | 'time' | 'url';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
}

export type InitialDataType = { [key: string]: string | number | File | undefined }


interface AddElementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Product | InitialDataType) => Promise<void> | void;
    titleComponent: string;
    buttonTitle: string;
    fields: FormFieldConfig[];
    initialData?: InitialDataType;
}


const customStyles = `
    .custom-select option {
        background-color: #2d4f6b;
        color: white;
    }
    .custom-input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

export const uploadText: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px'
}

export const uploadIcon: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '10px'
};



export default function AddElementModal({ isOpen, onClose, onSubmit, titleComponent, buttonTitle, fields, initialData = {} }: AddElementModalProps) {

    
    const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>("")
    const initialFormData = useMemo(() => {
        return fields.reduce((acc, field) => {
            acc[field.name] = initialData[field.name] !== undefined ? initialData[field.name] : '';
            if (field.name ==='illustrationUrl') {
                setImageUrl(initialData[field.name] as string)
            }
            return acc;
        }, {} as InitialDataType);
    }, [fields, initialData]);

    const [formData, setFormData] = useState<InitialDataType>(initialFormData);
    useEffect(() => {
        const set = async () =>{
            setFormData(initialFormData);
        }
        set()
    }, [initialFormData, isOpen]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData as InitialDataType);

    };

    const handleChange = (name: string, value: string | File, type?: string) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'number' ? Number(value) : type ==='file' ? value as File :  value,
        }));
    };

    const renderField = (field: FormFieldConfig) => {
        const inputClasses = "w-full p-3 md:p-3.5 rounded-lg border-none bg-[#2d4f6b] text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 custom-input";
        const labelClasses = "text-white text-sm md:text-base mb-1 font-medium font-sans";
        const containerClasses = "flex flex-col gap-1";

        switch (field.type) {
            case 'select':
                return (
                    <div key={field.name} className={containerClasses}>
                        <label className={labelClasses}>{field.label}</label>
                        <div className="relative w-full">
                            <select
                                className={`${inputClasses} appearance-none cursor-pointer custom-select`}
                                value={(formData[field.name] as string) || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                required={field.required}
                            >
                                <option value="" disabled className="text-white/50">Sélectionner {field.label.toLowerCase()}</option>
                                {field.options?.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white" />
                        </div>
                    </div>
                );
            case 'file':
                return (
                    <div key={field.name} className={containerClasses}>
                        <label className={labelClasses}>{field.label}</label>
                        <label className="cursor-pointer">
                            <input
                                type={field.type}
                                accept="image/*"
                                style={{ display: 'none' }}
                                placeholder={field.placeholder || ''}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            handleChange(field.name, file );
                                            setImageUrl(reader.result)
                                        };
                                        reader.readAsDataURL(file)
                                    };
                                }}
                                required={field.required}
                            />
                            {formData[field.name] || field.name=== 'illustrationUrl'  ? (
                                <div className="mt-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element*/}
                                    <img src={ imageUrl as string} alt="Preview" className="max-w-full h-auto rounded-lg"/>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center bg-[#00283C99] rounded-lg p-10 cursor-pointer">
                                    <Upload size={40} style={uploadIcon} />
                                    <div style={uploadText}>cliquez pour uploader une image</div>
                                </div>
                            )}
                        </label>
                    </div>
                );
            case 'text':
            case 'email':
            case 'password':
            case 'textarea':
            case 'number':
            default:
                return (
                    <div key={field.name} className={containerClasses}>
                        <label className={labelClasses}>{field.label}</label>
                        <input
                            type={field.type}
                            className={inputClasses}
                            placeholder={field.placeholder || ''}
                            value={(formData[field.name] as string) || ''}
                            onChange={(e) => handleChange(field.name, e.target.value, field.type)}  // ✅ Passer le type
                            required={field.required}
                        />
                    </div>
                );
        }
    };

    const overlayClasses = "fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 md:p-8";

    const modalClasses = "bg-[#5A8FAC] rounded-xl p-6 md:p-8 w-full max-w-sm max-h-[90vh] overflow-y-auto relative";

    const headerClasses = "flex justify-between items-center mb-6";

    const titleClasses = "text-xl md:text-2xl font-bold text-white m-0 font-sans";

    const closeButtonClasses = "bg-transparent border-none text-white cursor-pointer p-1 flex items-center hover:text-red-300 transition";

    const formClasses = "flex flex-col gap-4";


    return (
        <div className={overlayClasses} onClick={onClose}>
            <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
                <div className={headerClasses}>
                    <h2 className={titleClasses}>{titleComponent}</h2>
                    <button className={closeButtonClasses} onClick={onClose} aria-label="Fermer">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={formClasses}>
                    {fields.map(field => renderField(field))}
                    <div className="mt-4 flex justify-center">
                        <ButtonComponent textButton={buttonTitle} size="medium" />
                    </div>
                </form>
            </div>

            <style jsx global>{customStyles}</style>

        </div>
    );
};