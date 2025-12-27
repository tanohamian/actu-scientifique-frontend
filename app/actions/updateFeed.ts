'use server'
import { FeedInterface } from "../admin/dashboard/fil_actualite/page"
import { env } from "@/app/config/env"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"


export default async function UpdateFeed(id: string, feed: FeedInterface) {
    console.log("update feed : ", feed)
    console.log("update feed id : ", id)
    const authToken = (await cookies()).get('authToken')?.value;

    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }

    try {
        const response = await fetch(`${env.baseUrl}/feeds/${id}`, {
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


