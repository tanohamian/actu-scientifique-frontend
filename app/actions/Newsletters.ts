"use server"
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';

export interface INewsletter {
    id?: string;
    titre: string;
    categorie: string;
    contenu: string;
    createdAt?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getAuthHeaders() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'Cookie': `authToken=${authToken}`
    };
}

export async function FetchNewsletters() {
    try {
        const response = await fetch(`${BASE_URL}/newsletters`, {
            method: 'GET',
            headers: await getAuthHeaders(),
            next: { revalidate: 0 }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data.newsletters || data.data || [];
        }
        return [];
    } catch (error) {
        console.error("Erreur FetchNewsletters:", error);
        return [];
    }
}

export async function AddNewsletter(data: INewsletter) {
    try {
        const response = await fetch(`${BASE_URL}/newsletters`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (response.ok) {
            revalidatePath('/admin/dashboard/newsletters');
            return { success: true };
        }
        return { success: false };
    } catch (error) {
        console.error("Erreur lors de la creation :", error);
        return { success: false };
    }
}


export async function UpdateNewsletter(id: string, data: INewsletter) {
    try {
        const response = await fetch(`${BASE_URL}/newsletters/${id}`, {
            method: 'PUT',
            headers: await getAuthHeaders(),
            body: JSON.stringify(data)
        });

        if (response.ok) {
            revalidatePath('/admin/dashboard/newsletters');
            return { success: true };
        }
        return { success: false };
    } catch (error) {
        console.error("Erreur lors de la modification :", error);
        return { success: false };
    }
}

export async function DeleteNewsletter(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/newsletters/${id}`, {
            method: 'DELETE',
            headers: await getAuthHeaders(),
        });
        if (response.ok) {
            revalidatePath('/admin/dashboard/newsletters');
            return true;
        }
        return false;
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        return false;
    }
}