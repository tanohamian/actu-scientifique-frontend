'use server'
import { env } from '@/app/config/env'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { Article, DbArticle } from '../interfaces'


export async function AddArticle(formData: Article | FormData, json: boolean = false,) {
    const authToken = (await cookies()).get('authToken')?.value;
    console.log("payload: ", formData)
    const file = (formData as FormData).get('file') as File;

    if (!file || file.size === 0) {
        throw Error("Aucun fichier sélectionné ou fichier vide");
    }

    console.log("File details:", {
        name: file.name,
        size: file.size,
        type: file.type
    });
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/articles/`, {
            method: 'POST',
            headers: json ?
                {
                    'Content-Type': 'application/json',
                    'Cookie': `authToken=${authToken}`,
                } : {

                    'Cookie': `authToken=${authToken}`,
                },

            body: json ? JSON.stringify(formData) : formData as FormData,

        })

        if (!response.ok) {
            const errorData = response;
            console.log("Server error response:", JSON.stringify(errorData));
            throw Error(`Échec de l'upload du média : ${response.status} ${response.statusText}`);
        }
        return (await response.json()).article as DbArticle


    } catch (error) {
        console.error("Erreur lors de la création de l'article : ")
        console.log(error)
    }

}

export async function FetchArticles() {
    const authToken = (await cookies()).get('authToken')?.value;
    try {
        const response = await fetch(`${env.baseUrl}/articles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            },
            cache: 'no-store',
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/gestion_article')
            return responseData.articles as Article[]
        }
        return []
    } catch (error) {
        console.log("erreur lors de la récupération des articles : ", error)
        return []
    }
}

export async function DeleteArticle(articleId: string) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/articles/${articleId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        })

        if (response.ok) {
            console.log(response)
            revalidatePath('/admin/dashboard/gestion_article')
        }
        return true
    } catch (error) {
        console.log("erreur lors de la suppression de l'article : ", error)
        return false
    }
}

export async function FetchArticleById(articleId: string) {
    const authToken = (await cookies()).get('authToken')?.value;
    try {
        const response = await fetch(`${env.baseUrl}/articles/${articleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            },
            cache: 'no-store',
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            return responseData.article as Article
        }
        return null
    } catch (error) {
        console.log("erreur lors de la récupération de l'article : ", error)
        return null
    }
}