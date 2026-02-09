'use server'
import { env } from '@/app/config/env'
//import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';
import { DbMedia } from '../interfaces';
import { redirect } from 'next/navigation';

export async function AddMedia(formData: FormData) {

    const authToken = (await cookies()).get('authToken')?.value;
    console.log("payload: ", formData)
    const file = (formData as FormData).get('file') as File;

    // Log de survie pour voir si Next.js a laissé passer le fichier
    console.log("--- SERVER ACTION RECEIVE ---");
    console.log("File exists:", !!file);
    if (file) console.log("File size on server:", file.size);

    if (!file || file.size === 0) {
        throw new Error("Aucun fichier sélectionné ou fichier vide");
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
            if (response.status === 401) //redirect('/admin');
                throw Error(`Échec de l'upload du média : ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Upload successful:", result);
        return result.file as DbMedia;
    } catch (error) {
        console.error("Erreur lors de l'upload du média:");
        console.log(error);
        throw error;
    }
}


export async function UpdateMedia(formData: FormData, id: string) {

    const authToken = (await cookies()).get('authToken')?.value;
    console.log("payload: ", formData)
    console.log("idMedia update: ", id)
    const file = formData.get('file') as File | null;

    if (file && file.size > 0) {
        console.log("Nouveau fichier détecté:", file.name);
    } else {
        console.log("Mise à jour textuelle uniquement (pas de nouveau fichier).");
        formData.delete('file');
    }
    console.log("File details:", {
        name: file?.name,
        size: file?.size,
        type: file?.type
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
            const errorText = await response.text();
            console.error("Erreur Backend:", errorText);
            throw Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Update successful:", result);
        return result as DbMedia;

    } catch (error) {
        console.error("Erreur lors de l'upload du média:");
        console.log(error);
        throw error;
    }

}
export async function FetchMedias() {
    const authToken = (await cookies()).get('authToken')?.value;
    try {
        const response = await fetch(`${env.baseUrl}/multimedia`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            cache: 'no-store',
        })
        console.log("Response fetch medias:", response);

        if (response.ok) {
            const responseData = await response.json()
            return responseData as DbMedia[]
        }
        return []
    } catch (error) {
        console.log("erreur lors de la récupération des médias : ", error)
        return []
    }
}

export async function DeleteMedia(mediaId: string) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/multimedia/${mediaId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        })

        if (response.ok) {
            console.log(response)
            revalidatePath('/admin/dashboard/gestion_media')
        }
        return []
    } catch (error) {
        console.log("erreur lors de la suppression du media : ", error)
        return []
    }
}

export async function FetchMediaById(mediaId: string) {
    const authToken = (await cookies()).get('authToken')?.value;
    try {
        const response = await fetch(`${env.baseUrl}/multimedia/${mediaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            cache: 'no-store',
        })
        console.log("Response fetch medias:", response);

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            return responseData as DbMedia
        }
        return
    } catch (error) {
        console.log("erreur lors de la récupération des médias : ", error)
        return
    }
}