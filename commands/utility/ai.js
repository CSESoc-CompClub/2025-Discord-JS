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
            model: "gpt-4.1",
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
    console.log(AIResponse);
    console.log("CUT -------")
    console.log(AIResponse.slice(0, 2000))
    await interaction.reply(AIResponse.slice(0, 1999));
}


export { data, execute };