'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { DbMedia } from '../admin/dashboard/newsletters/components/Affichage'

export default async function FetchMedias() {
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
        console.log("erreur lors de la recuperation des médias : ", error)
        return []
    }
}
