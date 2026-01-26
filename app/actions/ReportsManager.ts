'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export interface IReport {
    id?: string;
    title: string;
    date: Date;
    reward: number;
    description: string;

}

export async function FetchReports() {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        //redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/reports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        })
        console.log("Response fetch reports:", response);

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/reports')
            return responseData.reportages
        }
        return []
    } catch (error) {
        console.log("erreur lors de la récupération des reportages : ", error)
        return []
    }
}


//Ajouter un reportage

export async function AddReport(data: IReport) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        //redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/formations_bourses');
            return { success: true };
        }

        const errorData = await response.json();
        return { success: false, error: errorData.message || "Échec de l'ajout" };
    } catch (error) {
        console.error("Erreur AddReport:", error);
        return { success: false, error: "Erreur réseau" };
    }
}

// Supprimer un reportage

export async function DeleteReport(id: string) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        //redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/reports/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
        });

        if (response.ok) {
            revalidatePath('/admin/dashboard/formations_bourses');
            return true;
        }
        return false;
    } catch (error) {
        console.error("Erreur DeleteReport:", error);
        return false;
    }
}

//Update un report

export async function UpdateReport(id: string, data: IReport) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        //redirect('/admin');
    }
    try {
        const response = await fetch(`${env.baseUrl}/reports/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            revalidatePath('/admin/dashboard/formations_bourses');
            return { success: true };
        }
        return { success: false };
    } catch (error) {
        console.error("Erreur UpdateReport:", error);
        return { success: false };
    }
}