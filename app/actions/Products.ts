'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { Product } from '../admin/page'

export async function FetchProducts() {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin'); 
    }
    try {
       const response = await fetch(`${env.baseUrl}/products`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
       }) 

       if(response.ok){
         const responseData = await response.json()
         console.log(responseData)
         revalidatePath('/admin/dashboard/gestion_article')
         return responseData.products as Product[]
       }
       return []
    } catch (error) {
        console.log("erreur lors de la récuperation des produits : ", error)
        return []
    }
}
