import InputComponent from "@components/input";
import { useState } from "react";


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
        <div className="bg-white">
            <h1>Connexion</h1>
            <InputComponent  typeInput="text" placeholderInput="Adresse e-mail" inputValue={formData.email} setInputValue={(valueInput=>handleInputChange('email',valueInput))} />
            <InputComponent  typeInput="password" placeholderInput="Mot de passe" inputValue={formData.email} setInputValue={(valueInput=>handleInputChange('password',valueInput))} />
        </div>
    )
}