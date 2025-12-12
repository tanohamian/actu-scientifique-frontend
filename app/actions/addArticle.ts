'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { Article } from '../admin/dashboard/newsletters/components/Affichage'
import { cookies } from 'next/headers'



export default async function AddArticle(formData:Article) {

    const authToken = (await cookies()).get('authToken')?.value;

    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin'); 
    }
    try {
        const response = await fetch(`${env.baseUrl}/articles/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            },
            
            body:JSON.stringify(formData)
        })

        if (!response.ok) {
            console.log(response)
            throw new Error(`Échec de la récupération des articles : ${response}`);
        }


        
    } catch (error) {
        console.error("Erreur lors de la récupération des articles : ")
        console.log(error)
    }

    redirect('/admin/dashboard')
}