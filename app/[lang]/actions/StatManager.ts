'use server'
import { env } from '@app/config/env'
//import { revalidatePath } from 'next/cache'
import { Stat } from '@app/interfaces'
import { getLocale } from 'next-intl/server'
import { LANG } from '../enum/enums'



export async function FetchStats () : Promise<{count: number, data: Stat[]}> {
    const lang = await getLocale()
    const baseUrl = env.getApiUrl(lang as LANG)    
    console.log(env)
    try {
        const response = await fetch(`${baseUrl}/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            //revalidatePath('/admin/dashboard/gestion_article')
            return responseData as {count: number, data: Stat[]}
        }
        return { count: 0, data: [] }
    } catch (error) {
        console.log("erreur lors de la récupération des articles : ", error)
        return { count: 0, data: [] }
    }
}

