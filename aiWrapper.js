const { OpenAI } = require("openai");
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
  });
  
async function getAIResponse(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
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
