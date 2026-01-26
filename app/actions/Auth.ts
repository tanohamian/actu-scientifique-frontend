'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { FormState } from "../admin/page"
import { env } from '@/app/config/env'
import { cookies } from 'next/headers'
import { UserInterface } from '../admin/dashboard/users/page'



export async function RegisterUser(formData: UserInterface) {
  const authToken = (await cookies()).get('authToken')?.value;
  if (!authToken) {
    console.error("Cookie d'authentification manquant. Redirection vers la connexion.");
    redirect('/admin');
    return
  }
  try {
    const response = await fetch(`${env.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `authToken=${authToken}`,
      },

      body: JSON.stringify({ first_name: formData.first_name, last_name: formData.first_name, roles: formData.roles == "Administrateur" ? 'ROLE_ADMIN' : 'ROLE_VIEWER', email: formData.email, password: formData.password, username: formData.username })
    })
    if (!response.ok) {
      console.log(response)
      throw new Error(`Echec de creation utilisateur : ${response}`)
    }
    const responseJson = await response.json()
    revalidatePath('/admin/dashboard/users')
    return responseJson.user

  } catch (err) {
    console.log("erreur lors de la creation d'un utilisateur : ", err)
    return
  }

}

export default async function LoginUser(formData: FormState) {

  const email = formData.email
  const password = formData.password
  let authTokenValue: RegExpMatchArray | null = null;

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
    console.log("setCookieHeader : ", setCookieHeader)
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


    if (authTokenValue && authTokenValue[1]) {
      const res = await fetch(`${env.baseUrl}/auth/admin`, {
        headers: {
          'Cookie': `authToken=${authTokenValue[1]}`
        }
      })

      if (res.status === 200) {
        const responseJson = await res.json()
        revalidatePath('/admin/dashboard')
        return responseJson.user
      } else {
        console.error("Échec de la vérification admin :", res.status);
        return
      }
    }

  } catch (error) {
    console.error("Erreur lors de la connexion : ", error)
    return
  }


}