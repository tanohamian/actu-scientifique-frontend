'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';
import { DbMedia } from '../admin/dashboard/newsletters/components/Affichage';

export async function AddMedia(formData: FormData) {

    const authToken = (await cookies()).get('authToken')?.value;
    console.log("payload: ", formData)
    const file = (formData as FormData).get('file') as File;

    if (!file || file.size === 0) {
        throw Error("Aucun fichier sélectionné ou fichier vide");
    }

    console.log("File details:", {
        name: file.name,
        size: file.size,
        type: file.type
    });
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
            const errorData = response;
            console.log("Server error response:", JSON.stringify(errorData));
            throw Error(`Échec de l'upload du média : ${response.status} ${response.statusText}`);
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

export async function UpdateMedia(formData: FormData, id: string) {

    const authToken = (await cookies()).get('authToken')?.value;
    console.log("payload: ", formData)
    const file = (formData as FormData).get('file') as File;

    if (!file || file.size === 0) {
        throw Error("Aucun fichier sélectionné ou fichier vide");
    }

    console.log("File details:", {
        name: file.name,
        size: file.size,
        type: file.type
    });
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/multimedia/${id}`, {
            method: 'PUT',
            headers: {
                'Cookie': `authToken=${authToken}`,
            },
            body: formData  
        });

        if (!response.ok) {
            const errorData = response;
            console.log("Server error response:", JSON.stringify(errorData));
            throw Error(`Échec de l'upload du média : ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Update successful:", result);
        
    } catch (error) {
        console.error("Erreur lors de l'upload du média:");
        console.log(error);
        throw error; 
    }

    redirect('/admin/dashboard/medias');
}
export async function FetchMedias() {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin'); 
    }
    try {
        const response = await fetch(`${env.baseUrl}/multimedia`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        }) 
        console.log("Response fetch medias:", response);

       if(response.ok){
         const responseData = await response.json()
         console.log(responseData)
         revalidatePath('/admin/dashboard/medias')
         return responseData as DbMedia[]
       }
       return []
    } catch (error) {
        console.log("erreur lors de la récupération des médias : ", error)
        return []
    }
}

export async function DeleteMedia(mediaId : string) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin'); 
    }
    try {
       const response = await fetch(`${env.baseUrl}/multimedia/${mediaId}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
       }) 

       if(response.ok){
         console.log(response)
         revalidatePath('/admin/dashboard/gestion_media')
       }
       return []
    } catch (error) {
        console.log("erreur lors de la suppression du media : ", error)
        return []
    }
}