"use server";
import { env } from "@app/config/env";
//import { revalidatePath } from 'next/cache'
import { Stat } from "@app/interfaces";
import { getLocale } from "next-intl/server";
import { LANG } from "../enum/enums";
interface FetchStatsParams {
  endpoint?: string;
  daysRange: number;
}
export async function FetchStats(paramsObject: FetchStatsParams = { endpoint: '/', daysRange: 7}): Promise<{ count: number; data: Stat[] }> {
  let paramsString = '';
  if (paramsObject) {
    const { endpoint, daysRange } = paramsObject;
    paramsString = `?endpoint=${encodeURIComponent(endpoint!)}&daysRange=${encodeURIComponent(daysRange)}`;
  }
  const lang = await getLocale();
  const baseUrl = env.getApiUrl(lang as LANG);
  const url = `${baseUrl}/stats${paramsString}`;
  if (env.onLocal) console.log(env);
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      //revalidatePath('/admin/dashboard/gestion_article')
      if (responseData.count == 0) {
        console.log("liste vide")
      }
      return responseData as { count: number; data: Stat[] };
    }
    let text =  await response.text()
    let error = await JSON.parse(text);
    console.log("Erreur lors de la récupération des statistiques : ", error);
    return { count: 0, data: [] };
  } catch (error) {
    console.log("erreur lors de la récupération des statistiques : ", error);
    return { count: 0, data: [] };
  }
}
