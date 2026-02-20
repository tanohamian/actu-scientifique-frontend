'use server'
import { env } from '@app/config/env'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { OrderInterface, OrderPayload } from '../interfaces';
import { redirect } from 'next/navigation';
import { LANG } from '../enum/enums';
import { getLocale } from 'next-intl/server';



export async function FetchOrders() {
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    try {
        const response = await fetch(`${baseUrl}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        })
        if (response.ok) {
            const responseData = await response.json()
            const formattedOrders = responseData.orders.map((order: OrderInterface) => ({
                id: order.id,
                totalAmount: order.totalAmount,
                status: order.status,
                quantity: order.items[0]?.quantity,
                name: order.items[0]?.product?.name,
                category: order.items[0]?.product?.categories
            }));
            console.log("Response fetch orders : ", formattedOrders)
            return formattedOrders
        }
        return []
    } catch (error) {
        console.log("erreur lors de la recupration des commandes : ", error)
        return []
    }
}

export async function UpdateOrderStatus(id: string, status: string) {
    console.log("Mise à jour du statut de la commande : ", id, status)
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${baseUrl}/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            body: JSON.stringify({ status: status })
        })
        console.log("Reponse de la mise à jour : ", response)
        if (response.ok) {
            const responseData = await response.json()
            console.log("Commande mise à jour : ", responseData)
            revalidatePath('/admin/dashboard/produit_commandes')
            return responseData
        }
        return null
    } catch (error) {
        console.log("erreur lors de la mise à jour de la commande : ", error)
        return null
    }
}

export async function CreateOrder(payload: OrderPayload) {
    console.log("Creation d'une commande : ", payload)
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${baseUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            body: JSON.stringify({ id: payload.productId, quantity: payload.quantity })
        })
        console.log("Reponse de la creation : ", response)
        if (response.ok) {
            const responseData = await response.json()
            console.log("Commande créée : ", responseData)
            //revalidatePath('/admin/dashboard/produit_commandes')
            return responseData.orderId
        }
        return null
    } catch (error) {
        console.log("erreur lors de la creation de la commande : ", error)
        return null
    }
}
