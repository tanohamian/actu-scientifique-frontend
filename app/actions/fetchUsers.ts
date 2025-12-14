'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { UserInterface } from '../admin/dashboard/users/page'

export default async function FetchUsers() {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin'); 
    }
    try {
       const response = await fetch(`${env.baseUrl}/users/all`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
       }) 

       if(response.ok){
         const responseData = await response.json()
         console.log(responseData)
         revalidatePath('/admin/dashboard/users')
         return responseData as UserInterface[]
       }
       return []
    } catch (error) {
        console.log("erreur lors de la recuperation des utilisateurs : ", error)
    }
}
