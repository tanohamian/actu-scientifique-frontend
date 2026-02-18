'use server'
import { env } from '@app/config/env'
//import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';
import { DbMedia } from '../interfaces';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { LANG } from '../enum/enums';



export async function UpdateMedia(formData: FormData, id: string) {
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
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
        const response = await fetch(`${baseUrl}/multimedia/${id}`, {
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
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    try {
        const response = await fetch(`${baseUrl}/multimedia`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            cache: 'no-store',
        })
        //console.log("Response fetch medias:", response);

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
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${baseUrl}/multimedia/${mediaId}`, {
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
    const lang = await getLocale()
        const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    try {
        const response = await fetch(`${baseUrl}/multimedia/${mediaId}`, {
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