const fetch = require('node-fetch');  
require('dotenv').config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.AI_API_KEY,
});

async function getAIResponse(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Explain how AI works in a few words",
          });

        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error with the AI request:', error);
        return 'Sorry, I am brewing coffee. Will be back in a sec. Meow!';
    }
}

module.exports = { getAIResponse };
