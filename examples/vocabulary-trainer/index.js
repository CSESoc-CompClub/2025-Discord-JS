import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

import config from './config.json' assert { type: "json" };
const { token, guildId } = config;

// Create a new bot client
export const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	] 
});

client.commands = new Collection();
const foldersPath = path.join(import.meta.dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = await import(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(import.meta.dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = await import(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
	console.log(`${file} loaded`)
}

export function sendDeathMessage() {
	const guild = client.guilds.cache.get(guildId);
	const generalChannel = guild.channels.cache.find(channel => channel.name === 'general');
	generalChannel.send(` \`\`\`
 ,-=-.  
/  +  \\    
| ~~~ |    
|R.I.P|  
|_____|
			\`\`\` `);
	generalChannel.send(`Good job! Vorazk has been defeated! But beware, he will return soon! 🧛‍♂️`);
}

// Run the client by logging in with your Token
client.login(token);