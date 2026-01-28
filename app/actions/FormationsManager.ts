'use server'
import { env } from '@/app/config/env'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export interface Formation {
    id?: string;
    title: string;
    lien: string;
    description: string;
    date: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export async function FetchFormations() {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        //redirect('/admin'); 
    }
    try {
        const response = await fetch(`${env.baseUrl}/trainings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/formations_bourses')
            return responseData.formations as Formation[]
        }
        return []
    } catch (error) {
        console.log("erreur lors de la récupération des formations : ", error)
        return []
    }
}