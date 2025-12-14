'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function AddMedia(formData: FormData) {
    console.log("Received FormData:");


    const file = formData.get('file') as File;

    if (!file || file.size === 0) {
        throw new Error("Aucun fichier sélectionné ou fichier vide");
    }

    console.log("File details:", {
        name: file.name,
        size: file.size,
        type: file.type
    });

    const authToken = (await cookies()).get('authToken')?.value;

    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin'); 
    }

    try {
        const response = await fetch(`${env.baseUrl}/multimedia/`, {
            method: 'POST',
            headers: {
                'Cookie': `authToken=${authToken}`,
            },
            body: formData  
        });

        if (!response.ok) {
            //const errorData = await response.json();
            console.log("Server error response:", response);
            throw new Error(`Échec de l'upload du média : ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Upload successful:", result);
        
    } catch (error) {
        console.error("Erreur lors de l'upload du média:");
        console.log(error);
        throw error; 
    }

    redirect('/admin/dashboard/medias');
}