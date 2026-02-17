'use server'
import { env } from '@app/config/env'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { Bourse } from '../interfaces';
import { getLocale } from 'next-intl/server';
import { LANG } from '../enum/enums';


export async function FetchBourses() {
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)
    const authToken = (await cookies()).get('authToken')?.value;
    try {
        const response = await fetch(`${baseUrl}/scholarships`, {
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
            return responseData.bourses as Bourse[]
        }
        return []
    } catch (error) {
        console.log("erreur lors de la récupération des bourses : ", error)
        return []
    }
}