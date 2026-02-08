export const env = {
    onProduction : process.env.CUSTOM_NODE_ENV === "production" as string ? true: false,
    baseUrl : process.env.API_MODE === "production" as string ? process.env.BASE_URL as string : process.env.LOCAL_BASE_URL as string
} as const;