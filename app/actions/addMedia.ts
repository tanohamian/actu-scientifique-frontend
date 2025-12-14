'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { Media } from '../admin/dashboard/newsletters/components/Affichage'
import { cookies } from 'next/headers'



export default async function AddMedia(formData:Media) {

    const authToken = (await cookies()).get('authToken')?.value;

    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin'); 
    }
    try {
        const response = await fetch(`${env.baseUrl}/multimedia/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            },
            
            body:JSON.stringify(formData)
        })

        if (!response.ok) {
            console.log(response)
            throw new Error(`Échec de la récupération des medias : ${response}`);
        }


        
    } catch (error) {
        console.error("Erreur lors de la récupération des medias : ")
        console.log(error)
    }

    redirect('/admin/dashboard/medias')
}