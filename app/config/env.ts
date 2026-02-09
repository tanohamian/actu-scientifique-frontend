export const env = {
    devMode : process.env.DEV_MODE === 'true',
    onProduction: process.env.CUSTOM_NODE_ENV === "production"  ? true: false,
    onLocal : process.env.LOCAL === "true" ? true : false,
    baseUrl: process.env.API_MODE === "production"  ? process.env.BASE_URL as string : process.env.LOCAL_BASE_URL as string,
    adminUrl: process.env.API_MODE === "production" as string ? process.env.ADMIN_BASE_URL as string : ""
} as const;