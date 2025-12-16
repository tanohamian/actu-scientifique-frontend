'use server'
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { FeedInterface } from "../admin/dashboard/fil_actualite/page"
import { revalidatePath } from "next/cache"
import { env } from "../config/env"

export default async function GetFeeds() {
    const authToken = (await cookies()).get('authToken')?.value;

    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/feeds`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            }
        })

        if (!response.ok) {
            console.log("aucune feed")
        }
        revalidatePath('/admin/dashboard/fil_actualite')
        return response.json()
    } catch (error) {
        console.log("erreur lors de la recuperation des feeds : ", error)
    }

}