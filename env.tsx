export const env = {
    baseUrl : process.env.NODE_ENV === 'production' ? process.env.BASE_URL as string : "http://localhost:8001/actu-sciences"
}