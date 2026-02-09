'use client'
import InputComponent, { InputProps } from './input';
import { LoginUser, RegisterUser } from '../actions/Auth';
import { useState } from 'react';
import { UserInterface } from '../admin/dashboard/users/page';
import { useAuth } from '../context/authContext';

interface LoginRegisterComponentProps {
    type: 'login' | 'register';
    title: string;
    inputs: InputProps[];
    onClose: () => void;
    onSubmit: () => void;
}

export default function LoginRegisterComponent({ type, title, inputs, onClose, onSubmit }: LoginRegisterComponentProps) {
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            if (type === 'login') {
                const email = inputs.find(i => i.typeInput === 'email')?.inputValue || '';
                const password = inputs.find(i => i.typeInput === 'password')?.inputValue || '';

                const loginData = {
                    email,
                    password,
                };

                const response = await LoginUser(loginData);
                if (response) {
                    const authenticatedUser = {
                        email,
                        roles: response.role
                    }
                    login(authenticatedUser as UserInterface)
                    onClose()
                }

            } else {
                const firstName = inputs.find(i => i.placeholderInput === 'Nom')?.inputValue || '';
                const lastName = inputs.find(i => i.placeholderInput === 'Prenom')?.inputValue || '';
                const email = inputs.find(i => i.typeInput === 'email')?.inputValue || '';
                const password = inputs.find(i => i.typeInput === 'password')?.inputValue || '';
                const confirmPassword = inputs.find(i => i.placeholderInput === 'Confirmer le mot de passe')?.inputValue || '';
                if (password !== confirmPassword) {
                    setError('Les mots de passe ne correspondent pas');
                    return;
                }

                const registerData = {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    username: email,
                    roles: "ROLE_VIEWER",
                };

                const response = await RegisterUser(registerData as UserInterface);
                if (response) {
                    const authenticatedUser = {
                        email,
                        roles: response.role
                    }
                    login(authenticatedUser as UserInterface)
                    onClose()
                }

            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative bg-white w-full max-w-[450px] rounded-xl shadow-2xl p-8 flex flex-col items-center">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    disabled={isSubmitting}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col items-center mb-6">
                    <img src="/images/loupe_afrique.svg" className="w-20 h-20 mb-2" alt="Logo" />
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                </div>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex flex-col gap-4 w-full">
                        {inputs.map((input, index) => (
                            <InputComponent key={index} {...input} />
                        ))}
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-6 bg-[#E65A46] hover:bg-[#d14d3a] text-white font-bold py-3 rounded-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {type === 'login' ? 'Connexion...' : 'Inscription...'}
                            </>
                        ) : (
                            type === 'login' ? 'Se connecter' : "S'inscrire"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-sm">
                    <button
                        type="button"
                        className="text-gray-600 hover:text-[#E65A46] transition-colors"
                        onClick={onSubmit}
                        disabled={isSubmitting}
                    >
                        {type === 'login'
                            ? "Pas encore inscrit ? S'inscrire"
                            : "Déjà un compte ? Se connecter"}
                    </button>
                </div>
            </div>
        </div>
    );
}