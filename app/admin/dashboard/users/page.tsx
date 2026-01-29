'use client'
import ButtonComponent from "@/app/components/button";
import SearchBarComponent from "@/app/components/searchBar";
import React, { useEffect, useState/*, useTransition*/ } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AddElementModal, { FormFieldConfig, InitialDataType } from '@/app/components/addElement';
//import { useRouter } from 'next/navigation';
import { DeleteUser, FetchUsers, UpdateRole } from "@/app/actions/Users";
import { RegisterUser } from "@/app/actions/Auth";
import { Product } from "@/app/interfaces";

export interface UserInterface {
    id?: string
    username?: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: string;
    password?: string
}

const userFields: FormFieldConfig[] = [
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Entrez votre nom d\'utilisateur', required: true },
    { name: 'first_name', label: 'Nom', type: 'text', placeholder: 'Entrez votre nom', required: true },
    { name: 'last_name', label: 'Prénoms', type: 'text', placeholder: 'Entrez vos prénoms', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Entrez l\'email', required: true },
    {
        name: 'roles', label: 'Rôle', type: 'select', options: [
            { value: 'Administrateur', label: 'Administrateur' },
            { value: 'Utilisateur', label: 'Utilisateur' },
        ], required: true
    },
    { name: 'password', label: 'Mot de passe', type: 'password', placeholder: 'Entrez le mot de passe', required: true },
]

const roleFields: FormFieldConfig[] = [
    {
        name: 'roles', label: 'Rôle', type: 'select', options: [
            { value: 'ROLE_ADMIN', label: 'Administrateur' },
            { value: 'ROLE_VIEWER', label: 'Utilisateur' },
        ], required: true
    }
]

export default function Utilisateurs() {
    const [inputValue, setInputValue] = useState('');
    const [addUser, setAddUser] = useState(false);
    const [editUser, setEditUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [selectUserId, setSelectUserId] = useState<string | undefined>("");
    //const router = useRouter();
    //const [isPending, startTransition] = useTransition()

    const [users, setUsers] = useState<UserInterface[]>([]);



    const handleAddUser = () => {
        setAddUser(true);
    };

    const handleSubmitUser = async (formData: UserInterface | Product | InitialDataType) => {
        try {
            const newUser = await RegisterUser(formData as UserInterface)
            if (newUser && 'id' in newUser) {
                console.log("nouvel utilisateur : ", newUser)
                setUsers((prevUsers) => [...prevUsers, newUser as UserInterface])
                setAddUser(false)
            }

        } catch (err) {
            console.log("erreur lors de l'appel addUser : ", err)
        }

    }

    const handleEdit = (userId: string | undefined, userRole: string) => {
        setSelectedUser(userRole);
        setSelectUserId(userId);
        setEditUser(true);
    };

    const handleSubmitEditUser = async (formData: UserInterface | Product | InitialDataType) => {
        try {
            const updatedUser = await UpdateRole(selectUserId, (formData as UserInterface).roles)
            if (updatedUser) {
                setUsers((prevUsers) => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u))
                setEditUser(false);
            }
        } catch (err) {
            console.log("erreur lors de l'appel updateRole : ", err)
        }

    }

    const handleDelete = async (userId: string | undefined) => {
        try {
            const deletedUser = await DeleteUser(userId)
            if (deletedUser) {
                console.log("utilisateur supprimé : ", deletedUser)
                setUsers((prevUsers) => prevUsers.filter(u => u.id !== userId))
            }
        } catch (err) {
            console.log("erreur lors de l'appel deleteUser : ", err)
        }
    };








    const MobileUserCard = ({ user }: { user: UserInterface }) => {
        return (
            <div className="bg-[#22415bff] rounded-lg p-4 mb-4 backdrop-blur-sm text-white md:hidden">
                <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold text-white/70">Noms :</span>
                    <span className="text-white">{`${user.first_name} ${user.last_name}`}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold text-white/70">Email :</span>
                    <span className="text-white">{user.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="font-semibold text-white/70">Role :</span>
                    <span className="text-white">{user.roles}</span>
                </div>
                <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-white/20">
                    <button
                        className="p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-blue-400"
                        onClick={() => handleEdit(user.id, user.roles)}
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

    const ActionButtons = ({ user }: { user: UserInterface }) => {
        return (
            <>
                <button
                    className="p-1 flex items-center justify-center transition-colors duration-200 text-white hover:text-blue-400"
                    onClick={() => handleEdit(user.id, user.roles)}
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
    if (selectedUser && selectUserId) {
        initialData = {
            roles: selectedUser,
            id: selectUserId
        }
    }



    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await FetchUsers()
                console.log(response)
                if (response) {
                    setUsers(response)
                }

            } catch (err) {
                console.log("erreur lors de la recuperations des utilisateurs : ", err)
            }
        }
        fetchUser()
    }, [])


    const filteredUsers = users.filter(user =>
        user && (user.first_name.toLowerCase().includes(inputValue.toLowerCase()) ||
            user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
            user.last_name.toLowerCase().includes(inputValue.toLowerCase()))
    );
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
                    filteredUsers.map((user: UserInterface) => (
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
                                    <td className="py-4 px-4 text-base border-b border-white/20">{`${user.first_name} ${user.last_name}`}</td>
                                    <td className="py-4 px-4 text-base border-b border-white/20">{user.email}</td>
                                    <td className="py-4 px-4 text-base border-b border-white/20">{user.roles}</td>
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
                initialData={{ username: '', email: '', first_name: '', last_name: '', roles: '' }}
            />

            <AddElementModal
                isOpen={editUser}
                onClose={() => setEditUser(false)}
                onSubmit={handleSubmitEditUser}
                titleComponent="Modifier Informations"
                buttonTitle="Modifier"
                fields={roleFields}
                initialData={initialData}
            />
        </div>
    );
}