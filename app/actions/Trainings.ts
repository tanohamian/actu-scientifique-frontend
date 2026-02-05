'use server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';
import { env } from '../config/env';
import { ITraining } from '../interfaces';
import { redirect } from 'next/navigation';


async function getAuthHeaders() {
    const authToken = (await cookies()).get('authToken')?.value;
    return {
        'Content-Type': 'application/json',
        'Cookie': `authToken=${authToken}`
    };
}

export async function FetchTrainings() {
    try {
        const response = await fetch(`${env.baseUrl}/trainings`, {
            method: 'GET',
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
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/trainings`, {
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
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/trainings/${id}`, {
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

        console.log(`Erreur lors de la modification: ${error}`)
        return { success: false, error: "Erreur réseau" };
    }
}

export async function DeleteTraining(id: string) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/trainings/${id}`, {
            method: 'DELETE',
            headers: await getAuthHeaders(),
        });
        if (response.ok) {
            revalidatePath('/admin/dashboard/formations_bourses');
            return true;
        }
        return false;
    } catch (error) {

        console.log(`Erreur lors de la suppression : ${error}`)
        return false;
    }
}