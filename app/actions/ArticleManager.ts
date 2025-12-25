'use server'
import { env } from '@/env'
import { redirect } from 'next/navigation'
import { Article } from '../admin/dashboard/newsletters/components/Affichage'
import { cookies } from 'next/headers'

    export const AddArticle = async (formData:Article) => {
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
                throw new Error(`Échec de la connexion : ${response}`);
            }

        } catch (error) {
            console.error("Erreur lors de la connexion : ")
            console.log(error)
        }

        redirect('/admin/dashboard')
    }
    export const FetchArticles= async () : Promise<Article[] | void> =>{
        try {
            const authToken = (await cookies()).get('authToken')?.value;

            const response = await fetch(`${env.baseUrl}/articles/`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `authToken=${authToken}`,
                },
            })

            if (!response.ok) {
                console.log(response)
                throw new Error(`Échec de la connexion : ${response}`);
            }
            return response.json() as Promise<Article[]>

        } catch (error) {
            console.error("Erreur lors de la connexion : ")
            console.log(error)
            return
        }
    }
