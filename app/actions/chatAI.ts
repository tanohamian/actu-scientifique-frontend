"use server"
import { GoogleGenAI } from "@google/genai";
import { env } from "@config/env"; 


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function ask(question: string) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question,
        });
        console.log(response.text);
        return response.text;
    } catch (error) {
        console.log("Erreur lors de la requête à l'API Gemini :", error);
        return null;
    }
  
}
