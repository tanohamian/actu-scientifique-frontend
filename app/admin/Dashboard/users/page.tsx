'use client'
import ButtonComponent from "@/app/components/button";
import SearchBarComponent from "@/app/components/searchBar";
import React, { CSSProperties, useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AddUserModal from "@/app/components/addUser";


interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export default function Utilisateurs() {
    const [inputValue, setInputValue] = useState('');
    const [windowWidth, setWindowWidth] = useState(1200);
    const [addUser, setAddUser] = useState(false);
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'Adou johan', email: 'joka@gmail.com', role: 'Administrateur' },
        { id: 2, name: 'Marie Kouassi', email: 'marie.k@gmail.com', role: 'Éditeur' },
        { id: 3, name: 'Jean Yao', email: 'jean.yao@gmail.com', role: 'Utilisateur' },
    ]);

    const MOBILE_BREAKPOINT = 768;
    const TABLET_BREAKPOINT = 1024;



    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < MOBILE_BREAKPOINT;
    const isTablet = windowWidth >= MOBILE_BREAKPOINT && windowWidth < TABLET_BREAKPOINT;

    const handleAddUser = () => {
       setAddUser(true);
    };

  const handleSubmitUser = (formData:any)=>{
      const newUser: User = {
        id:users.length + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role
      }
      setUsers([...users, newUser]);
      setAddUser(false);
    }

    const handleEdit = (user: User) => {
        alert(`Éditer ${user.name}`);
    };

    const handleDelete = (userId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            setUsers(users.filter(u => u.id !== userId));
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.email.toLowerCase().includes(inputValue.toLowerCase())
    );

    const pageContainerStyle: CSSProperties = {
        backgroundColor: '#5f8fb4',
        minHeight: '100vh',
        padding: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
        fontFamily: 'sans-serif',
    };

    const headerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        marginBottom: isMobile ? '1rem' : '1.5rem',
        gap: isMobile ? '1rem' : '0',
    };

    const titleStyle: CSSProperties = {
        fontSize: isMobile ? '1.5rem' : isTablet ? '1.75rem' : '2rem',
        fontWeight: 'bold',
        color: 'white',
        margin: 0,
    };

    const searchContainerStyle: CSSProperties = {
        marginBottom: isMobile ? '1rem' : '1.5rem',
    };

    const tableContainerStyle: CSSProperties = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
    };

    const tableStyle: CSSProperties = {
        width: '100%',
        borderCollapse: 'collapse',
        color: 'white',
    };

    const thStyle: CSSProperties = {
        textAlign: 'left',
        padding: isMobile ? '0.75rem 0.5rem' : '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        fontSize: isMobile ? '0.875rem' : '1rem',
        fontWeight: '600',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    };

    const tdStyle: CSSProperties = {
        padding: isMobile ? '0.75rem 0.5rem' : '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        fontSize: isMobile ? '0.875rem' : '1rem',
    };

    const actionsCellStyle: CSSProperties = {
        ...tdStyle,
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottom: 'none',
    };

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

    const MobileUserCard = ({ user }: { user: User }) => {
        const [isEditHovered, setIsEditHovered] = useState(false);
        const [isDeleteHovered, setIsDeleteHovered] = useState(false);

        const cardStyle: CSSProperties = {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1rem',
            backdropFilter: 'blur(10px)',
        };

        const cardRowStyle: CSSProperties = {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
        };

        const labelStyle: CSSProperties = {
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.7)',
        };

        const valueStyle: CSSProperties = {
            color: 'white',
        };

        const actionsRowStyle: CSSProperties = {
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'flex-end',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        };

        return (
            <div style={cardStyle}>
                <div style={cardRowStyle}>
                    <span style={labelStyle}>Noms :</span>
                    <span style={valueStyle}>{user.name}</span>
                </div>
                <div style={cardRowStyle}>
                    <span style={labelStyle}>Email :</span>
                    <span style={valueStyle}>{user.email}</span>
                </div>
                <div style={cardRowStyle}>
                    <span style={labelStyle}>Role :</span>
                    <span style={valueStyle}>{user.role}</span>
                </div>
                <div style={actionsRowStyle}>
                    <button
                        style={{
                            ...iconButtonStyle,
                            color: isEditHovered ? '#60A5FA' : 'white',
                        }}
                        onClick={() => handleEdit(user)}
                        onMouseEnter={() => setIsEditHovered(true)}
                        onMouseLeave={() => setIsEditHovered(false)}
                        aria-label="Éditer"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        style={{
                            ...iconButtonStyle,
                            color: isDeleteHovered ? '#EF4444' : 'white',
                        }}
                        onClick={() => handleDelete(user.id)}
                        onMouseEnter={() => setIsDeleteHovered(true)}
                        onMouseLeave={() => setIsDeleteHovered(false)}
                        aria-label="Supprimer"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        );
    };

    const ActionButtons = ({ user }: { user: User }) => {
        const [isEditHovered, setIsEditHovered] = useState(false);
        const [isDeleteHovered, setIsDeleteHovered] = useState(false);

        return (
            <>
                <button
                    style={{
                        ...iconButtonStyle,
                        color: isEditHovered ? '#60A5FA' : 'white',
                    }}
                    onClick={() => handleEdit(user)}
                    onMouseEnter={() => setIsEditHovered(true)}
                    onMouseLeave={() => setIsEditHovered(false)}
                    aria-label="Éditer"
                >
                    <Pencil size={20} />
                </button>
                <button
                    style={{
                        ...iconButtonStyle,
                        color: isDeleteHovered ? '#EF4444' : 'white',
                    }}
                    onClick={() => handleDelete(user.id)}
                    onMouseEnter={() => setIsDeleteHovered(true)}
                    onMouseLeave={() => setIsDeleteHovered(false)}
                    aria-label="Supprimer"
                >
                    <Trash2 size={20} />
                </button>
            </>
        );
    };

    return (
        <div style={pageContainerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Gestion des utilisateurs</h1>
                <ButtonComponent textButton="Ajouter un utilisateur" onclick={handleAddUser} />
            </div>

            <div style={searchContainerStyle}>
                <SearchBarComponent
                    placeholder="Rechercher par nom ou email....."
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            </div>

            {isMobile ? (
                <div>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <MobileUserCard key={user.id} user={user} />
                        ))
                    ) : (
                        <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
                            Aucun utilisateur trouvé
                        </div>
                    )}
                </div>
            ) : (
                
                <div style={tableContainerStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Noms</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Role</th>
                                <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td style={tdStyle}>{user.name}</td>
                                        <td style={tdStyle}>{user.email}</td>
                                        <td style={tdStyle}>{user.role}</td>
                                        <td style={actionsCellStyle}>
                                            <ActionButtons user={user} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ ...tdStyle, textAlign: 'center', padding: '2rem' }}>
                                        Aucun utilisateur trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <AddUserModal 
                isOpen={addUser} 
                onClose={() => setAddUser(false)}
                onSubmit={handleSubmitUser}
            />
        </div>
    );
}