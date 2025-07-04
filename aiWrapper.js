const { OpenAI } = require("openai");
const fetch = require('node-fetch');  
require('dotenv').config();

let conversationHistory = [];

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
  });
  
async function getAIResponse(prompt) {
    conversationHistory.push({ role: 'user', content: prompt });
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4.1-2025-04-14',
            messages: conversationHistory,
            max_tokens: 300,
            temperature: 0.9,
        });

        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error with the AI request:', error);
        return 'Sorry, I am brewing coffee. Will be back in a sec. Meow!';
    }
}

module.exports = { getAIResponse };
