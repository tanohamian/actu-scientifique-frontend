import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/config/env';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();


        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`  ${key}: [File] ${value.name} (${value.size} bytes, ${value.type})`);
            } else {
                console.log(`  ${key}:`, value);
            }
        }

        const file = formData.get('file') as File | null;

        if (file && file.size > 0) {
            console.log("Nouveau fichier détecté:", file.name);
        } else {
            console.log("Mise à jour textuelle uniquement (pas de nouveau fichier).");
            formData.delete('file');
        }

        console.log("✅ Fichier validé:", file?.name, file?.size);

        const cookieStore = await cookies();
        const authToken = cookieStore.get('authToken')?.value;

        if (!authToken) {
            console.error("❌ Pas de token d'authentification");
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            );
        }


        const response = await fetch(`${env.baseUrl}/articles/`, {
            method: 'POST',
            headers: {
                'Cookie': `authToken=${authToken}`,
            },
            body: formData
        });


        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Erreur backend:", errorText);
            return NextResponse.json(
                { error: `Erreur backend: ${response.status}` },
                { status: response.status }
            );
        }

        const result = await response.json();
        console.log("✅ Succès:", result);

        return NextResponse.json(result);

    } catch (error) {
        console.error("❌ Erreur dans l'API route:", error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const formData = await request.formData();
        const id = formData.get('id')


        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`  ${key}: [File] ${value.name} (${value.size} bytes, ${value.type})`);
            } else {
                console.log(`  ${key}:`, value);
            }
        }

        const file = formData.get('file') as File | null;

        if (file && file.size > 0) {
            console.log("Nouveau fichier détecté:", file.name);
        } else {
            console.log("Mise à jour textuelle uniquement (pas de nouveau fichier).");
            formData.delete('file');
        }

        console.log("✅ Fichier validé:", file?.name, file?.size);

        const cookieStore = await cookies();
        const authToken = cookieStore.get('authToken')?.value;

        if (!authToken) {
            console.error("❌ Pas de token d'authentification");
            return NextResponse.json(
                { error: 'Non authentifié' },
                { status: 401 }
            );
        }


        const response = await fetch(`${env.baseUrl}/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Cookie': `authToken=${authToken}`,
            },
            body: formData
        });


        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Erreur backend:", errorText);
            return NextResponse.json(
                { error: `Erreur backend: ${response.status}` },
                { status: response.status }
            );
        }

        const result = await response.json();

        return NextResponse.json(result);

    } catch (error) {
        console.error("❌ Erreur dans l'API route:", error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

