'use server'
import { env } from '@/app/config/env'
import { redirect } from 'next/navigation'
import { UserInterface } from '../admin/dashboard/users/page'
import { cookies } from 'next/headers'
import { refresh, revalidatePath } from 'next/cache'

export default async function AddUser(formData:UserInterface) {
    const authToken = (await cookies()).get('authToken')?.value;
    if (!authToken) {
        console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
        redirect('/admin'); 
    }
    try{
        const response = await fetch(`${env.baseUrl}/auth/register`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body:JSON.stringify({first_name:formData.first_name,last_name:formData.first_name,roles:formData.roles == "Administrateur" ? 'ROLE_ADMIN' : 'ROLE_VIEWER',email:formData.email,password:formData.password,username:formData.username})
        })
        if(!response.ok){
            console.log(response)
            throw new Error(`Echec de creation utilisateur : ${response}`)
        }
        const responseJson = await response.json()
        revalidatePath('/admin/dashboard/users')
        return responseJson.user
        
    }catch(err){
        console.log("erreur lors de la creation d'un utilisateur : ", err)
        return
    }
   
}
