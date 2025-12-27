'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { UserInterface } from '../admin/dashboard/users/page'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function AddUser(formData: UserInterface) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            },

            body: JSON.stringify({ first_name: formData.first_name, last_name: formData.first_name, roles: formData.roles == "Administrateur" ? 'ROLE_ADMIN' : 'ROLE_VIEWER', email: formData.email, password: formData.password, username: formData.username })
        })
        if (!response.ok) {
            console.log(response)
            throw new Error(`Echec de creation utilisateur : ${response}`)
        }
        const responseJson = await response.json()
        revalidatePath('/admin/dashboard/users')
        return responseJson.user

    } catch (err) {
        console.log("erreur lors de la creation d'un utilisateur : ", err)
        return
    }

}

export async function FetchUsers() {
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

export async function DeleteUser(id: string | undefined) {
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

export async function UpdateRole(userId: string | undefined, role: string) {
    console.log("userId : ", userId)
    console.log("role : ", role)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/users/promote/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`,
            },
            body: JSON.stringify({ role: role }),
        });
        console.log("response : ", response)
        if (!response.ok) {
            throw new Error('Failed to update user role');
        }
        const data = await response.json();
        console.log("data : ", data.user)
        revalidatePath('/admin/dashboard/users')
        return data.user;
    } catch (error) {
        console.error('Error updating user role:', error);
    }
};