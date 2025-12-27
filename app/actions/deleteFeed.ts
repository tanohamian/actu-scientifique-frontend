'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { env } from '@/app/config/env'
import { FeedInterface } from "../admin/dashboard/fil_actualite/page"

export default async function DeleteFeed(feed: FeedInterface) {
    const authToken = (await cookies()).get('authToken')?.value;

    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }

    try {
        const response = await fetch(`${env.baseUrl}/feeds/${feed.id}`, {
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