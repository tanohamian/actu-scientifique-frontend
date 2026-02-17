'use server'
import { env } from '@app/config/env'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { Formation } from '../interfaces';
import { getLocale } from 'next-intl/server';
import { LANG } from '../enum/enums';


export async function FetchFormations() {
    const authToken = (await cookies()).get('authToken')?.value;
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    try {
        const response = await fetch(`${baseUrl}/trainings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `authToken=${authToken}`
            }
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            revalidatePath('/admin/dashboard/formations_bourses')
            return responseData.formations as Formation[]
        }
        return []
    } catch (error) {
        console.log("erreur lors de la récupération des formations : ", error)
        return []
    }
}