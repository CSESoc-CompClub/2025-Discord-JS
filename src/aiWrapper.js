
const { GoogleGenAI } = require( "@google/genai");

const ai = new GoogleGenAI({}); 

async function getAIResponse(prompt) {

  try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
          });

        return response.text;
    } catch (error) {
        console.error('Error with the AI request:', error);
        return 'Brain is too rotten try again later. 💀';
    }
}

module.exports = { getAIResponse };