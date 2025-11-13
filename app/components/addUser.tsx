'use client'
import ButtonComponent from "@/app/components/button";
import React, { CSSProperties, useState, useEffect } from 'react';
import { Pencil, Trash2, X, ChevronDown } from 'lucide-react';


export default function AddUserModal  ({ isOpen, onClose, onSubmit }: any)  {
    const [windowWidth, setWindowWidth] = useState(1200);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: ''
    });

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
        setFormData({ name: '', email: '', role: '', password: '' });
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
        backgroundColor: '#5f8fb4',
        borderRadius: '1rem',
        padding: isMobile ? '1.5rem' : '2rem',
        width: '100%',
        maxWidth: isMobile ? '100%' : '450px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        border: '2px solid #E65A46',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
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
        padding: isMobile ? '0.75rem' : '1rem',
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
        paddingRight: '2.5rem',
        cursor: 'pointer',
    };

    const selectIconStyle: CSSProperties = {
        position: 'absolute',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: 'white',
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>Ajout utilisateur</h2>
                    <button style={closeButtonStyle} onClick={onClose} aria-label="Fermer">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={formStyle}>
                    <div>
                        <label style={labelStyle}>Nom complet</label>
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="josua karma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>E-mail</label>
                        <input
                            type="email"
                            style={inputStyle}
                            placeholder="jokia@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Role</label>
                        <div style={selectContainerStyle}>
                            <select
                                style={selectStyle}
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                            >
                                <option value="">Sélectionner un rôle</option>
                                <option value="Administrateur">Administrateur</option>
                                <option value="Utilisateur">Utilisateur</option>
                            </select>
                            <ChevronDown style={selectIconStyle} size={20} />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Mot de passe</label>
                        <input
                            type="password"
                            style={inputStyle}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ marginTop: '1rem' , justifyContent: 'center', display: 'flex' }}>
                        <ButtonComponent textButton="Inscrire" size="small"/>
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
