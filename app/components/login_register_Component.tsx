'use client'
import InputComponent, { InputProps } from './input';
import LoginUser, { RegisterUser } from '../actions/Auth';
import { useState } from 'react';
import { UserInterface } from '../admin/dashboard/users/page';


interface LoginRegisterComponentProps {
    type: 'login' | 'register';
    title: string;
    inputs: InputProps[];
    onClose: () => void;
    onSubmit: () => void;
}

export default function LoginRegisterComponent({ type, title, inputs, onClose, onSubmit }: LoginRegisterComponentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);

            if (type === 'login') {
                const loginData = {
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                };
                await LoginUser(loginData);

            } else {
                const registerData = {
                    first_name: formData.get('first_name') as string,
                    last_name: formData.get('last_name') as string,
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                    username: formData.get('username') as string,
                    roles: "ROLE_VIEWER",
                };
                await RegisterUser(registerData as UserInterface);
                console.log('Inscription non implémentée');
                onSubmit();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="relative bg-white w-full max-w-[450px] rounded-xl shadow-2xl p-8 flex flex-col items-center">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col items-center mb-6">
                    <img src="/images/loupe_afrique.svg" className="w-20 h-20 mb-2" alt="Logo" />
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    {inputs.map((input, index) => (
                        <InputComponent key={index} {...input} />
                    ))}
                </div>

                <button className="w-full mt-6 bg-[#E65A46] hover:bg-[#d14d3a] text-white font-bold py-3 rounded-lg transition-all" >
                    {type === 'login' ? 'Se connecter' : "S'inscrire"}
                </button>

                <div className="mt-6 text-sm">
                    <button className="text-gray-600 hover:text-[#E65A46] transition-colors" onClick={onSubmit}>
                        {type === 'login'
                            ? "Pas encore inscrit ? S'inscrire"
                            : "Déjà un compte ? Se connecter"}
                    </button>
                </div>
            </div>
        </div>
    );
}