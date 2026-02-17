'use server'
import { cookies } from 'next/headers'
import { env } from '@app/config/env'
import { revalidatePath } from 'next/cache'
import { FeedInterface } from '../interfaces';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { LANG } from '../enum/enums';

export async function CreateFeed(feed: FeedInterface) {
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;

    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }

    try {
        const response = await fetch(`${baseUrl}/feeds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            },
            body: JSON.stringify(feed)
        })

        if (!response.ok) {
            console.log('Failed to create feed');
        }
        revalidatePath('/admin/dashboard/fil_actualite')
        const data = await response.json()
        return data
    } catch (error) {
        console.log("erreur lors de la creation du feed : ", error)
    }
}

export async function DeleteFeed(feed: FeedInterface) {
    const authToken = (await cookies()).get('authToken')?.value;
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }

    try {
        const response = await fetch(`${baseUrl}/feeds/${feed.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            }
        })

        if (!response.ok) {
            console.log('Failed to delete feed');
        }
        revalidatePath('/admin/dashboard/fil_actualite')
        const data = await response.json()
        return data
    } catch (error) {
        console.log("erreur lors de la suppression du feed : ", error)
    }
}

export async function GetFeeds() {
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    try {
        const response = await fetch(`${baseUrl}/feeds`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            }
        })

        if (!response.ok) {
            console.log("aucune feed")
        }
        return response.json()
    } catch (error) {
        console.log("erreur lors de la récupération des feeds : ", error)
    }

}


export async function UpdateFeed(id: string, feed: FeedInterface) {
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    console.log("update feed : ", feed)
    console.log("update feed id : ", id)
    const authToken = (await cookies()).get('authToken')?.value;

    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }

    try {
        const response = await fetch(`${baseUrl}/feeds/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            },
            body: JSON.stringify(feed)
        })

        if (!response.ok) {
            console.log('Failed to update feed');
        }
        const data = await response.json()
        revalidatePath('/admin/dashboard/fil_actualite')
        return data
    } catch (error) {
        console.log("erreur lors de la mise à jour du feed : ", error)
    }
}