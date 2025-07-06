const { Client, Events, GatewayIntentBits } = require('discord.js');

const { getAIResponse } = require('./aiWrapper');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  });


client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith("coffee cat")) return;

    const lowerCaseMessage = message.content.toLowerCase();
    const catMemeUrl = await getCatMeme();

    const prompt = `The user said: ${message.content}`;
    const aiResponse = await getAIResponse(prompt);

    message.reply(aiResponse);
  }
);

client.login(token);

