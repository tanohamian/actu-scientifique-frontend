'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { EventInterface } from '../components/eventDataTable'

export async function FetchEvents() {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        //redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/events')
            return responseData.events as EventInterface[]
        }
        return []
    } catch (error) {
        console.log("erreur lors de la récupération des évènements : ", error)
        return []
    }
}


export async function CreateEvent(event: EventInterface) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        //redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            body: JSON.stringify(event)
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/events')
            return responseData.event as EventInterface
        }
        return null
    } catch (error) {
        console.log("erreur lors de la création de l'évènement : ", error)
        return null
    }
}

export async function UpdateEvent(status: string, id: string, url: string) {
    console.log(status, id, url)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        //redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            body: JSON.stringify({ status: status, url: url })
        })
        console.log(response)
        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/events')
            return responseData.event as EventInterface
        }
        return null
    } catch (error) {
        console.log("erreur lors de la mise à jour de l'évènement : ", error)
        return null
    }
}

export async function DeleteEvent(id: string) {
    console.log(id)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        //redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/events')
            return responseData
        }
        return []
    } catch (error) {
        console.log("erreur lors de la suppression de l'évènement : ", error)
        return []
    }
}