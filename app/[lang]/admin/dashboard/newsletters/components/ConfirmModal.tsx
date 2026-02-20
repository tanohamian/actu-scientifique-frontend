"use client"

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    }

    export default function ConfirmModal({ isOpen, onClose, onConfirm, title }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
        }}>
        <div style={{
            backgroundColor: '#50789B', padding: '30px', borderRadius: '20px',
            maxWidth: '400px', width: '100%', border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)', textAlign: 'center'
        }}>
            <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '20px' }}>{title}</h3>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
                onClick={onClose}
                style={{
                padding: '10px 25px', borderRadius: '8px', border: '1px solid white',
                backgroundColor: 'transparent', color: 'white', cursor: 'pointer', fontWeight: 'bold'
                }}
            >
                Annuler
            </button>
            <button
                onClick={onConfirm}
                style={{
                padding: '10px 25px', borderRadius: '8px', border: 'none',
                backgroundColor: '#E67E5F', color: 'white', cursor: 'pointer', fontWeight: 'bold'
                }}
            >
                Supprimer
            </button>
            </div>
        </div>
        </div>
    );
}