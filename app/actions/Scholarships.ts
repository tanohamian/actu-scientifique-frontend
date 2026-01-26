"use server"
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';
import { env } from '../config/env';

export interface IScholarship {
    id?: string;
    titre: string;
    lien: string;
    description: string;
    date: string;
}


async function getAuthHeaders() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;
    
    return {
        'Content-Type': 'application/json',
        'Cookie': `authToken=${authToken}`
    };
}

export async function FetchScholarships() {
    try {
        const response = await fetch(`${env.baseUrl}/scholarships`, {
            method: 'GET',
            //headers: await getAuthHeaders(),
            next: { revalidate: 0 }
        });

        if (response.ok) {
            const data = await response.json();
            return data.bourses || [];
        }
        
        console.error(`FetchScholarships a échoué avec le statut : ${response.status}`);
        return [];
    } catch (error) {
        console.error("Erreur FetchScholarships:", error);
        return [];
    }
}

export async function AddScholarship(data: IScholarship) {
    try {
        const response = await fetch(`${env.baseUrl}/scholarships`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            revalidatePath('/admin/dashboard/formations_bourses');
            return { success: true };
        }
        
        const errorData = await response.json();
        return { success: false, error: errorData.message || "Échec de l'ajout" };
    } catch (error) {
        console.error("Erreur AddScholarship:", error);
        return { success: false, error: "Erreur réseau" };
    }
}

export async function UpdateScholarship(id: string, data: IScholarship) {
    try {
        const response = await fetch(`${env.baseUrl}/scholarships/${id}`, {
            method: 'PUT',
            headers: await getAuthHeaders(),
            body: JSON.stringify(data)
        });

        if (response.ok) {
            revalidatePath('/admin/dashboard/formations_bourses');
            return { success: true };
        }
        return { success: false };
    } catch (error) {
        console.error("Erreur UpdateScholarship:", error);
        return { success: false };
    }
}

export async function DeleteScholarship(id: string) {
    try {
        const response = await fetch(`${env.baseUrl}/scholarships/${id}`, {
            method: 'DELETE',
            headers: await getAuthHeaders(),
        });

        if (response.ok) {
            revalidatePath('/admin/dashboard/formations_bourses');
            return true;
        }
        return false;
    } catch (error) {
        console.error("Erreur DeleteScholarship:", error);
        return false;
    }
}