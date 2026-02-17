import { LANG } from "../enum/enums";

const getApiUrl = (lang : LANG) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_MODE === "production"  ? (lang == LANG.FR ? process.env.FR_BASE_URL : process.env.EN_BASE_URL) : process.env.LOCAL_BASE_URL as string;
    return baseUrl;
}
export const env = {
    devMode : process.env.NEXT_PUBLIC_DEV_MODE === 'true',
    onProduction: process.env.NODE_ENV === "production"  ? true: false,
    onLocal : process.env.LOCAL === "true" ? true : false,
    baseUrl: process.env.NEXT_PUBLIC_API_MODE === "production"  ? process.env.FR_BASE_URL as string : process.env.LOCAL_BASE_URL as string,
    getApiUrl,
    adminUrl: process.env.NEXT_PUBLIC_API_MODE === "production" as string ? process.env.ADMIN_BASE_URL as string : ""
} as const;