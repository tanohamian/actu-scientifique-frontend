'use server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface ITraining {
    id?: string;
    titre: string;
    lien: string;
    description: string;
    date: string;
    createdAt?: string;
}

async function getAuthHeaders() {
    const authToken = (await cookies()).get('authToken')?.value;
    return {
        'Content-Type': 'application/json',
        'Cookie': `authToken=${authToken}`
    };
}

export async function FetchTrainings() {
    try {
        const response = await fetch(`${BASE_URL}/trainings`, {
            method: 'GET',
            headers: await getAuthHeaders(),
            next: { revalidate: 0 }
        });

        if (response.ok) {
            const data = await response.json();
            return data.formations as ITraining[];
        }
        return [];
    } catch (error) {
        console.error("Erreur FetchTrainings:", error);
        return [];
    }
}

export async function AddTraining(data: ITraining) {
    try {
        const response = await fetch(`${BASE_URL}/trainings`, {
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
        console.log(`Erreur lors de la creation du training : ${error}`)
        return
    }
}

export async function UpdateTraining(id: string, data: ITraining) {
    try {
        const response = await fetch(`${BASE_URL}/trainings/${id}`, {
            method: 'PUT',
            headers: await getAuthHeaders(),
            body: JSON.stringify(data)
        });

        if (response.ok) {
            revalidatePath('/admin/dashboard/formations_bourses');
            return { success: true };
        }
        const errorDetail = await response.json();
        return { success: false, error: errorDetail.message || "Erreur lors de la mise à jour" };
    } catch (error) {
        return { success: false, error: "Erreur réseau" };
        console.log(`Erreur lors de la modification: ${error}`)
    }
}

export async function DeleteTraining(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/trainings/${id}`, {
            method: 'DELETE',
            headers: await getAuthHeaders(),
        });
        if (response.ok) {
            revalidatePath('/admin/dashboard/formations_bourses');
            return true;
        }
        return false;
    } catch (error) {
        return false;
        console.log(`Erreur lors de la suppression : ${error}`)
    }
}