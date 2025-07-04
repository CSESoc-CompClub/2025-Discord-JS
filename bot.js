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

async function getCoffeeMeme() {
    const url = 'https://api.apileague.com/retrieve-random-meme?keywords=coffee';
    const apiKey = 'a923143d0a45442bba6905247750d1df';
  
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

async function getCatMeme() {
    const url = 'https://api.apileague.com/retrieve-random-meme?keywords=cats';
    const apiKey = 'a923143d0a45442bba6905247750d1df';
  
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
    const coffeeMemeUrl = await getCoffeeMeme();
    const catMemeUrl = await getCatMeme();

    const prompt = `You are cat loves coffee. Respond to the user in a playful, sassy, a bit mean and most importantly coffee-loving way. Also, always end your answer with "MEOW". The user said: ${message.content}`;
    const aiResponse = await getAIResponse(prompt);

    message.reply(aiResponse);

    if (lowerCaseMessage.includes('cat')) {
        message.reply(`${catMemeUrl}`);
    }
    else if (lowerCaseMessage.includes('coffee')) {
        message.reply(`${coffeeMemeUrl}`);
    }
});

client.login(token);

