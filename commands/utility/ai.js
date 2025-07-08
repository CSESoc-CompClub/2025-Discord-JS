import { SlashCommandBuilder } from 'discord.js';
import OpenAI from "openai";

import config from '../../config.json' with { type: "json" };
const { aiApiKey } = config;
const data = new SlashCommandBuilder()
  .setName('ask')
  .addStringOption((option) =>
    option
      .setName('question')
      .setDescription('The question to ask the AI')
      .setRequired(true)
  )
  .setDescription('Ask the AI');

const client = new OpenAI({ apiKey: aiApiKey });



async function getAiResponse(prompt) {
    try {
        const response = await client.responses.create({
            model: "gpt-3.5-turbo",
            input: `Respond to the user. Give a response under 2000 characters. The user said: ${prompt}`,
        });
        return response.output_text;
    } catch (error) {
        console.error('Error with the AI request:', error);
        return 'AI is tired try again later.';
    }
}

async function execute(interaction) {
    const prompt = interaction.options.getString('question');
    const AIResponse = await getAiResponse(prompt);

    await interaction.reply(AIResponse.slice(0, 2000));
}


export { data, execute };