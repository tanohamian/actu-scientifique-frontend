'use client'
import ButtonComponent from "@/app/components/button";
import SearchBarComponent from "@/app/components/searchBar";
import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';
import baseUrl from "../../../../baseUrl"

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const userFields : FormFieldConfig[] = [
    { name: 'name', label: 'Nom complet', type: 'text', placeholder: 'Entrez les noms', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Entrez l\'email', required: true },
    { name: 'role', label: 'Rôle', type: 'select', options: [
        { value: 'Administrateur', label: 'Administrateur' },
        { value: 'Utilisateur', label: 'Utilisateur' },
    ], required: true },
    { name: 'password', label: 'Mot de passe', type: 'password', placeholder: 'Entrez le mot de passe', required: true },
]

export default function Utilisateurs() {
    const [inputValue, setInputValue] = useState('');
    const [addUser, setAddUser] = useState(false);
    const [editUser,setEditUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading,setLoading] = useState(false)

    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'Adou johan', email: 'joka@gmail.com', role: 'Administrateur' },
        { id: 2, name: 'Marie Kouassi', email: 'marie.k@gmail.com', role: 'Administrateur' },
        { id: 3, name: 'Jean Yao', email: 'jean.yao@gmail.com', role: 'Utilisateur' },
    ]);


    const getUsers = async ()=>{
        //setLoading(true)
        try{
            const response = await fetch(`${baseUrl}/users/all`,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok){
               const userData =  await response.json()
               console.log("userData : ", userData)
            }
        }catch(err){
            console.log("erreur lors de la recuperation des utilisateurs : ", err)
        }
    }

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
        setSelectedUser(user);
        setEditUser(true);
    };

    const handleSubmitEditUser = (formData:any)=>{
        setEditUser(false);
    }

    const handleDelete = (userId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            setUsers(users.filter(u => u.id !== userId));
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.email.toLowerCase().includes(inputValue.toLowerCase())
    );

    const MobileUserCard = ({ user }: { user: User }) => {
        return (
            <div className="bg-[#22415bff] rounded-lg p-4 mb-4 backdrop-blur-sm text-white md:hidden">
                <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold text-white/70">Noms :</span>
                    <span className="text-white">{user.name}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold text-white/70">Email :</span>
                    <span className="text-white">{user.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="font-semibold text-white/70">Role :</span>
                    <span className="text-white">{user.role}</span>
                </div>
                <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-white/20">
                    <button
                        className="p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-blue-400"
                        onClick={() => handleEdit(user)}
                        aria-label="Éditer"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        className="p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-red-500"
                        onClick={() => handleDelete(user.id)}
                        aria-label="Supprimer"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        );
    };

    const ActionButtons = ({ user }: { user: User }) => {
        return (
            <>
                <button
                    className="p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-blue-400"
                    onClick={() => handleEdit(user)}
                    aria-label="Éditer"
                >
                    <Pencil size={20} />
                </button>
                <button
                    className="p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-red-500"
                    onClick={() => handleDelete(user.id)}
                    aria-label="Supprimer"
                >
                    <Trash2 size={20} />
                </button>
            </>
        );
    };

    let initialData = {};
    if (selectedUser) {
        initialData = {
            name: selectedUser.name,
            email: selectedUser.email,
        }
    }
    
    useEffect(()=>{
        getUsers()
    },[])



    return (
        <div className="min-h-screen font-sans p-4 md:p-6 lg:p-8"> 
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4 w-full">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-white m-0">Gestion des utilisateurs</h1>
                <ButtonComponent textButton="Ajouter un utilisateur" onclick={handleAddUser} />
            </div>
            
            <div className="mb-4 md:mb-6 w-full md:w-1/2">
                <SearchBarComponent
                    placeholder="Rechercher par nom ou email....."
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            </div>

           
            <div className="md:hidden">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <MobileUserCard key={user.id} user={user} />
                    ))
                ) : (
                    <div className="text-white text-center p-8">
                        Aucun utilisateur trouvé
                    </div>
                )}
            </div>


           
            <div className="hidden md:block bg-[#50789B] rounded-xl overflow-hidden backdrop-blur-sm shadow-xl">
                <table className="w-full border-collapse text-white">
                    <thead>
                        <tr>
                            <th className="text-left py-4 px-4 text-base font-semibold  border-b border-white/30">Noms</th>
                            <th className="text-left py-4 px-4 text-base font-semibold  border-b border-white/30">Email</th>
                            <th className="text-left py-4 px-4 text-base font-semibold  border-b border-white/30">Role</th>
                            <th className="text-right py-4 px-4 text-base font-semibold border-b border-white/30">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-white/10 transition duration-150 ease-in-out">
                                    <td className="py-4 px-4 text-base border-b border-white/20">{user.name}</td>
                                    <td className="py-4 px-4 text-base border-b border-white/20">{user.email}</td>
                                    <td className="py-4 px-4 text-base border-b border-white/20">{user.role}</td>
                                    <td className="flex gap-2 justify-end items-center py-4 px-4 border-b border-white/20">
                                        <ActionButtons user={user} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-8 px-4 text-center text-base">
                                    Aucun utilisateur trouvé
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AddElementModal 
                isOpen={addUser} 
                onClose={() => setAddUser(false)}
                onSubmit={handleSubmitUser}
                titleComponent="Ajout utilisateur"
                buttonTitle="Inscrire"
                fields={userFields}
                initialData={{name:'kouassi jean',email:'jean@gmailcom'}}
            />

            <AddElementModal 
                isOpen={editUser} 
                onClose={() => setEditUser(false)}
                onSubmit={handleSubmitEditUser}
                titleComponent="Modifier Informations"
                buttonTitle="Modifier"
                fields={userFields}
                initialData={initialData}
            />
        </div>
    );
}