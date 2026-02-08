export const env = {
    production : process.env.API_MODE === 'local' as string ? false: true,
    baseUrl : process.env.API_MODE === 'local' as string ? process.env.LOCAL_BASE_URL as string : "https://api.actuscientifique.com/actu-sciences",
} as const;