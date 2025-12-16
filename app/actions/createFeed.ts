'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { env } from '@/app/config/env'
import { revalidatePath } from 'next/cache'
import { FeedInterface } from '../admin/dashboard/fil_actualite/page'

export default async function CreateFeed(feed: FeedInterface) {


    const authToken = (await cookies()).get('authToken')?.value;

    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }

    try {
        const response = await fetch(`${env.baseUrl}/feeds`, {
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
