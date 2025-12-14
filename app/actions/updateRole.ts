'use server'
import { env } from '@/app/config/env'
import { refresh, revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface UserInterface {
    id?: string
    username?: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: string;
    password?: string
}


export default async function UpdateRole(userId: string | undefined, role: string) {
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
        revalidatePath('/admin/dashboard/users')
        return data;
    } catch (error) {
        console.error('Error updating user role:', error);
    }
};