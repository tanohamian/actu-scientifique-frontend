
export const env = async () => {
    return{
        devMode : await process.env.DEV_MODE === 'true' ? true : false,
        onProduction: await process.env.CUSTOM_NODE_ENV === "production"  ? true: false,
        onLocal : await process.env.LOCAL === "true" ? true : false,
        baseUrl: await process.env.API_MODE === "production"  ? process.env.BASE_URL as string : process.env.LOCAL_BASE_URL as string,
        adminUrl: await process.env.API_MODE === "production" as string ? process.env.ADMIN_BASE_URL as string : ""
    } as const; 
} 