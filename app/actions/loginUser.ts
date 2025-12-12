'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { FormState } from "../admin/page"
import { env } from '@/env'
import { cookies } from 'next/headers'





export default async function LoginUser(formData:FormState) {

    const email = formData.email
    const password = formData.password
    let loginSuccessful = false;
    let authTokenValue: RegExpMatchArray  | null = null; 

    try {
        const response = await fetch(`${env.baseUrl}/auth/login`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify({email:email,password:password})
        })
        console.log(response)
        if (!response.ok) {
            throw new Error(`Échec de la connexion : ${response.status}`);
        }

        const setCookieHeader = response.headers.get('set-cookie');

        
        if (setCookieHeader) {
            authTokenValue = setCookieHeader.match(/authToken=([^;]*)/);

        if (authTokenValue && authTokenValue[1]) {
                (await cookies()).set('authToken', authTokenValue[1], {
                    httpOnly: true,
                    maxAge: 3600,
                    path: '/',
                    sameSite: 'lax'
                });
            }
        }


        if (authTokenValue) {
            const res = await fetch(`${env.baseUrl}/auth/admin`, {
                headers: {
                    'Cookie': `authToken=${authTokenValue[1]}`
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