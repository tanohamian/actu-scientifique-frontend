"use server"
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';
import { env } from '../config/env';
import { redirect } from 'next/navigation';
import { LANG } from '../enum/enums';
import { getLocale } from 'next-intl/server';

export interface IScholarship {
    id?: string;
    title: string;
    lien?: string;
    reward?: number;
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
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    try {
        const response = await fetch(`${baseUrl}/scholarships`, {
            method: 'GET',
            headers: await getAuthHeaders(),
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
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }


    const payload: Record<string, unknown> = { ...data };
    if (!payload.lien || (typeof payload.lien === "string" && payload.lien.trim() === "")) delete payload.lien;
    if (!payload.reward || Number(payload.reward) <= 0) delete payload.reward;

    try {
        const response = await fetch(`${baseUrl}/scholarships`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            revalidatePath('/admin/dashboard/formations_bourses');
            return { success: true };
        }

        const errorData = await response.json();
        console.error("Erreur API AddScholarship:", errorData);
        return { success: false, error: errorData.message || "Échec de l'ajout" };
    } catch (error) {
        console.error("Erreur AddScholarship:", error);
        return { success: false, error: "Erreur réseau" };
    }
}

export async function UpdateScholarship(id: string, data: IScholarship) {
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }


    const payload: Record<string, unknown> = { ...data };
    if (!payload.lien || (typeof payload.lien === "string" && payload.lien.trim() === "")) delete payload.lien;
    if (!payload.reward || Number(payload.reward) <= 0) delete payload.reward;

    try {
        const response = await fetch(`${baseUrl}/scholarships/${id}`, {
            method: 'PUT',
            headers: await getAuthHeaders(),
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            revalidatePath('/admin/dashboard/formations_bourses');
            return { success: true };
        }
        
        const errorData = await response.json();
        console.error("Erreur API UpdateScholarship:", errorData);
        return { success: false };
    } catch (error) {
        console.error("Erreur UpdateScholarship:", error);
        return { success: false };
    }
}

export async function DeleteScholarship(id: string) {
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin');
    }
    try {
        const response = await fetch(`${baseUrl}/scholarships/${id}`, {
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