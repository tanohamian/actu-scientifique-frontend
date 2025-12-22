export const env = {
    baseUrl: process.env.BASE_URL as string ? process.env.BASE_URL as string : "http://localhost:8000/actu-sciences",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY as string
}