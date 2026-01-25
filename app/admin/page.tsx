'use client'

import { useState } from "react";
import LoginUser from "../actions/Auth";
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

export interface Product {
    title?: string
    id: string,
    name: string
    categories: Categories
    price: number
    preview_image: string
    description?: string
    createdAt: Date
    stock: number
}

export default function Connexion() {




    const [formData, setFormData] = useState<FormState>({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const handleInputChange = (field: keyof FormState, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    /*const handleSubmit = async () => {
        setLoading(true)
        setMessage('')
        try{
            const response = await fetch(`${baseUrl}/auth/login`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({email : formData.email,password :formData.password})
            })
            if(response.ok){
                console.log("Connexion avec:", formData);
                router.push('/admin/dashboard');
            }
            
        }catch(err){
            console.log("erreur lors de l'inscription : ", err),
            setMessage((err as any).message)
        }finally{
            setLoading(false)
        }
    };*/


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

                <div>
                    <div className={inputGroupClasses}>
                        <label className={labelClasses} htmlFor="email">
                            Adresse e-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="exemple@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={inputClasses}
                        />
                    </div>

                    <div className={inputGroupClasses}>
                        <label className={labelClasses} htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className={inputClasses}
                        />
                    </div>

                    <button
                        onClick={() => LoginUser(formData)}
                        className={buttonClasses}
                    >
                        {loading ? <p>••••••</p> : <p>Se connecter</p>}
                    </button>
                </div>

                <div className={linkContainerClasses}>
                    <span className={linkClasses}>
                        Mot de passe oublié ?
                    </span>
                </div>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
}