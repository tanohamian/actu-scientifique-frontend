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
        const response = await fetch(`${env.baseUrl}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/gestion_article')
            return responseData.products as Product[]
        }
        return []
    } catch (error) {
        console.log("erreur lors de la récupération des produits : ", error)
        return []
    }
}

export async function AddProduct(product: FormData) {
    console.log(product)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/products`, {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            body: product
        })
        console.log(response)
        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/gestion_article')
            return responseData.product as Product
        }
        return []
    } catch (error) {
        console.log("erreur lors de l'ajout d'un produit : ", error)
        return []
    }
}

export async function UpdateProduct(product: FormData, id: string) {
    console.log(product)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            body: product
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/gestion_article')
            return responseData.product as Product
        }
        return []
    } catch (error) {
        console.log("erreur lors de la mise à jour d'un produit : ", error)
        return []
    }
}

export async function DeleteProduct(id: string) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/gestion_article')
            return responseData
        }
        return []
    } catch (error) {
        console.log("erreur lors de la suppression d'un produit : ", error)
        return []
    }
}

