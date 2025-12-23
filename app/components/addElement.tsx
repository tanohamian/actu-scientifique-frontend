'use client'
import ButtonComponent from "@/app/components/button";
import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronDown } from 'lucide-react';

export interface FormFieldConfig {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'select' | 'textarea';
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

const customStyles = `
    .custom-select option {
        background-color: #2d4f6b;
        color: white;
    }
    .custom-input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;


export default function AddElementModal({ isOpen, onClose, onSubmit, titleComponent, buttonTitle, fields, initialData = {} }: AddElementModalProps) {

    const initialFormData = useMemo(() => {
        return fields.reduce((acc, field) => {
            acc[field.name] = initialData[field.name] !== undefined ? initialData[field.name] : '';
            return acc;
        }, {} as { [key: string]: string });
    }, [fields, initialData]);

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setFormData(initialFormData);
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
        onSubmit(formData);

    };

    const handleChange = (name: string, value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
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
                                value={formData[field.name] || ''}
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
            case 'text':
            case 'email':
            case 'password':
            case 'textarea':
            default:
                return (
                    <div key={field.name} className={containerClasses}>
                        <label className={labelClasses}>{field.label}</label>
                        <input
                            type={field.type}
                            className={inputClasses}
                            placeholder={field.placeholder || ''}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
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