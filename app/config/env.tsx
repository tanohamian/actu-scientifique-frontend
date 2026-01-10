export const env = {
    baseUrl : process.env.API_MODE === 'local' as string ? process.env.LOCAL_BASE_URL as string : "https://actuscientifique.com/actu-sciences"
}