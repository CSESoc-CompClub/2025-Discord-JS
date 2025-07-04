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

async function getCatMeme() {
    const url = 'https://api.apileague.com/retrieve-random-meme?keywords=cats';
    const apiKey = process.eventNames.MEME_API_KEY;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey,
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('There was an issue fetching the meme:', error);
      return 'Sorry, not the time for meme. Meow...'; 
  }
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith("coffee cat")) return;

    const lowerCaseMessage = message.content.toLowerCase();
    const catMemeUrl = await getCatMeme();

    const prompt = `You are cat loves coffee. Respond to the user in a playful, 
    sassy, a bit mean but humour way. Also, always end your answer with "MEOW". 
    Have some cute and emojis with your answer as well The user said: ${message.content}`;
    const aiResponse = await getAIResponse(prompt);
    

  if (message.content.includes("meme")) {
    message.channel.send({
      content: aiResponse,
      files: [catMemeUrl]
  });
  } else {
    message.reply(aiResponse);
  }
});

client.login(token);

