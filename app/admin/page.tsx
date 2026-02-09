'use client'

import { useState } from "react";
import { LoginUser } from "../actions/Auth";
import { useRouter } from "next/navigation";
import { env } from "../config/env";

export interface FormState {
    email: string;
    password: string;
}

export const Categories = {
    EBOOK: "livres",
    CLOTHES: "vêtements",
    TECHNOLOGYOBJECT: "objets tech"
} as const
export type Categories = typeof Categories[keyof typeof Categories]



export default function Connexion() {
    const [formData, setFormData] = useState<FormState>({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const router = useRouter()

    const handleInputChange = (field: keyof FormState, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await LoginUser(formData);
            console.log("response : ", response)
            if (response == 'ROLE_ADMIN') {
                const dashboardRoute = env.devMode? "/admin/dashboard": "/dashboard" 
                router.push(dashboardRoute)
            } else {
                setMessage("Vous n'avez pas les droits pour acceder à cette page")
            }

        } catch (err) {
            console.error("Erreur lors de la connexion : ", err);
            setMessage(err instanceof Error ? err.message : 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    const containerClasses = `
        min-h-screen 
        flex 
        justify-center 
        items-center 
        bg-gradient-to-br 
        from-[#588DA9] 
        to-[#4a7390] 
        font-sans 
        p-5 
        md:p-0
    `;

    const formContainerClasses = `
        bg-white 
        rounded-xl 
        shadow-2xl 
        p-8 
        md:p-12 
        w-full 
        max-w-md
    `;

    const titleClasses = `
        text-[#588DA9] 
        text-2xl 
        md:text-3xl 
        font-semibold 
        mb-2 
        text-center
    `;

    const subtitleClasses = `
        text-gray-500 
        text-xs 
        md:text-sm 
        mb-8 
        text-center
    `;

    const inputClasses = `
        w-full 
        p-3 
        md:p-4 
        text-base 
        border-2 
        border-gray-200 
        rounded-lg 
        outline-none 
        transition-all 
        duration-300 
        focus:border-[#588DA9]
        disabled:bg-gray-100
        disabled:cursor-not-allowed
    `;

    const buttonClasses = `
        w-full 
        p-3 
        md:p-4 
        bg-[#588DA9] 
        text-white 
        text-base 
        font-semibold 
        border-none 
        rounded-lg 
        cursor-pointer 
        transition-all 
        duration-300 
        mt-3 
        shadow-md 
        hover:bg-[#4a7390]
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        flex
        items-center
        justify-center
        gap-2
    `;

    const inputGroupClasses = "mb-6";
    const labelClasses = "block text-gray-700 text-sm font-medium mb-2";
    const linkContainerClasses = "text-center mt-6";
    const linkClasses = `
        text-[#588DA9] 
        text-sm 
        font-medium 
        cursor-pointer 
        hover:underline 
        transition-colors
    `;

    return (
        <div className={containerClasses}>
            <div className={formContainerClasses}>
                <h1 className={titleClasses}>Connexion</h1>
                <p className={subtitleClasses}>Accédez à votre tableau de bord</p>

                <form onSubmit={handleSubmit}>
                    <div className={inputGroupClasses}>
                        <label className={labelClasses} htmlFor="email">
                            Adresse e-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="exemple@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={inputClasses}
                            required
                            disabled={loading}
                            autoComplete="email"
                        />
                    </div>

                    <div className={inputGroupClasses}>
                        <label className={labelClasses} htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className={inputClasses}
                            required
                            disabled={loading}
                            autoComplete="current-password"
                        />
                    </div>

                    {message && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600 text-center">{message}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className={buttonClasses}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Connexion en cours...</span>
                            </>
                        ) : (
                            <span>Se connecter</span>
                        )}
                    </button>
                </form>

                <div className={linkContainerClasses}>
                    <span className={linkClasses}>
                        Mot de passe oublié ?
                    </span>
                </div>
            </div>
        </div>
    );
}