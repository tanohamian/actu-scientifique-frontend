export const env = {
    production : process.env.NODE_ENV === "production" as string ? true: false,
    baseUrl : process.env.API_MODE === "production" as string ? process.env.LOCAL_BASE_URL as string : "https://api.actuscientifique.com/actu-sciences",
} as const;