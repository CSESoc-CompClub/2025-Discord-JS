require('dotenv').config();
// const { Client, IntentsBitField} = require('discord.js');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { getAIResponse } = require('./aiWrapper');
require('dotenv').config();
const token = process.env.TOKEN;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  });


client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});



client.on('messageCreate', async (message) => {
  if (message.author.bot) {
    return;
  }

  if (!message.content.startsWith('brainrot')) return;

  const lowerCaseMessage = message.content.toLowerCase();

  const prompt = `Translate the users message using brainrot language. The user said: ${message.content}`;
  const aiResponse = await getAIResponse(prompt);
  message.reply(aiResponse);
});



client.login(token);