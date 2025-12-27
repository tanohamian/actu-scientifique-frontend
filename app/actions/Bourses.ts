'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export interface Bourse {
    id?: string;
    titre: string;
    lien: string;
    description: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export async function FetchBourses() {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin'); 
    }
    try {
       const response = await fetch(`${env.baseUrl}/bourses`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
       }) 

       if(response.ok){
         const responseData = await response.json()
         console.log(responseData)
         revalidatePath('/admin/dashboard/formations_bourses')
         return responseData.data as Bourse[]
       }
       return []
    } catch (error) {
        console.log("erreur lors de la récupération des bourses : ", error)
        return []
    }
}