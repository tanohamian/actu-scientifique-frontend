'use server'
import { revalidatePath } from 'next/cache'
import { FormState } from "../admin/page"
import { env } from '@/app/config/env'
import { cookies } from 'next/headers'
import { UserInterface } from '../admin/dashboard/users/page'
import { redirect } from 'next/navigation'



export async function RegisterUser(formData: UserInterface) {
  try {
    const response = await fetch(`${env.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ first_name: formData.first_name, last_name: formData.last_name, roles: formData.roles == "Administrateur" ? 'ROLE_ADMIN' : 'ROLE_VIEWER', email: formData.email, password: formData.password, username: formData.username })
    })
    if (!response.ok) {
      console.log(response)
      throw new Error(`Echec de creation utilisateur : ${response}`)
    }
    const responseJson = await response.json()
    return responseJson.user

  } catch (err) {
    console.log("erreur lors de la creation d'un utilisateur : ", err)
    return
  }

}

export async function LoginUser(formData: FormState) {

  const email = formData.email
  const password = formData.password
  try {
    const response = await fetch(`${env.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    if (!response.ok) {
      throw new Error(`Échec de la connexion : ${response.status}`);
    }


    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      const token = setCookieHeader.split(';')[0].split('=')[1];
      const cookieStore = await cookies();
      cookieStore.set('authToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 3600
      });
    }
    console.log("response : ", response)
    const responseJson = await response.json()
    console.log("responseJson : ", responseJson)
    return responseJson.role

  } catch (error) {
    console.error("Erreur lors de la connexion : ", error)
    return
  }


}


export async function IsAdmin() {
  const authToken = (await cookies()).get('authToken')?.value;
  if (!authToken) {
    console.error("Cookie d'authentification manquant");
    redirect('/admin')
  }
  try {
    const response = await fetch(`${env.baseUrl}/auth/admin`, {
      method: 'GET',
      headers: {
        'Cookie': `authToken=${authToken}`
      }
    })
    if (response.status === 200) {
      const responseJson = await response.json()
      console.log("responseJson : ", responseJson)
      revalidatePath('/admin/dashboard')
      return responseJson.message
    } else {
      console.error("Échec de la vérification admin :", response.status);
      return
    }
  } catch (error) {
    console.error("Erreur lors de la vérification admin : ", error)
    return
  }
}