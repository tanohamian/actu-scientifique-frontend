'use server'
import baseUrl from "@/baseUrl"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { FormState } from "../admin/page"


function extractAuthToken(setCookieHeader: string | null): string | null {
    if (!setCookieHeader) return null;
    
    
    const parts = setCookieHeader.split(';');
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.startsWith('authToken=')) {
            return trimmedPart.substring('authToken='.length);
        }
    }
    return null;
}

export default async function LoginUser(formData:FormState) {

    const email = formData.email
    const password = formData.password
    let loginSuccessful = false;
    let authTokenValue: string | null = null; 

    try {
        const response = await fetch(`${baseUrl}/auth/login`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify({email:email,password:password})
        })

        if (!response.ok) {
            throw new Error(`Échec de la connexion : ${response.status}`);
        }

        const setCookieHeader = response.headers.get('set-cookie');
        
        if (setCookieHeader) {
            authTokenValue = extractAuthToken(setCookieHeader);
            console.log("Token extrait :", authTokenValue);
        }


        if (authTokenValue) {
            const res = await fetch(`${baseUrl}/auth/admin`, {
                headers: {
                    'Cookie': `authToken=${authTokenValue}`
                }
            })

            console.log("responseAdmin status : ", res.status)
            if (res.status === 200) {
                loginSuccessful = true
                revalidatePath('/admin/dashboard')
            } else {
                console.error("Échec de la vérification admin :", res.status);
            }
        }
        
    } catch (error) {
        console.error("Erreur lors de la connexion : ", error)
    }

    if(loginSuccessful){
        redirect('/admin/dashboard')
    }
}