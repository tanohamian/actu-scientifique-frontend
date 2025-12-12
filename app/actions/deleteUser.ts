
import { env } from '@/app/config/env'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export default async function DeleteUser(id: string | undefined) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/users/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            }
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression de l'utilisateur")
        }

        console.log("Utilisateur supprimé avec succès", id)
        revalidatePath('/admin/users')
        return response.json()


    } catch (error) {
        console.log("erreur lors de  la suppression de l'utilisateur", error)
    }
}