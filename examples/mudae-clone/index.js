import { Client, Collection, GatewayIntentBits } from 'discord.js';
import config from './config.json' with { type: "json" };
const { token } = config;
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
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
	console.log(`${file} loaded`)
	const filePath = path.join(eventsPath, file);
	const event = await import(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Listen for messages
client.on('messageCreate', message => {
    // Ignore messages from the bot itself to prevent loops
    if (message.author.bot) return;

    // Check if the message contains the word "meow"
    if (message.content.toLowerCase().includes('meow')) {
        // Reply with a response
        message.reply('Nyaaa uwu ~ :3');
    }
});

client.login(token);