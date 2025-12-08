'use server'
import baseUrl from "@/baseUrl"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { FormState } from "../admin/page"




export default async function LoginUser(formData:FormState) {

    const email = formData.email
    const password = formData.password
    await fetch(`${baseUrl}/auth/login`,{
        method:'POST',
        body:JSON.stringify({email:email,password:password})
    })
    revalidatePath('/admin/dashboard')
    redirect('/admin/dashboard')
}
