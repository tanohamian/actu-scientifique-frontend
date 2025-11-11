'use client';

import InputComponent from "@components/input";
import { useState } from "react";
import ButtonComponent from "@components/button";


interface FormState {
    email: string;
    password: string;
}

export default function Connexion(){


   const [formData, setFormData]= useState<FormState>({
        email:"",
        password:""
    });

    const handleInputChange = (field: keyof FormState, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return(
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4" >
                <h1>Connexion</h1>
                <InputComponent  typeInput="text" placeholderInput="Adresse e-mail" inputValue={formData.email} setInputValue={(valueInput=>handleInputChange('email',valueInput))} />
                <InputComponent  typeInput="password" placeholderInput="Mot de passe" inputValue={formData.email} setInputValue={(valueInput=>handleInputChange('password',valueInput))} />
                <ButtonComponent  textButton="Connexion" />
            </div>
        </div>
    )
}