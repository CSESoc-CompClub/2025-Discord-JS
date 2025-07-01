import { Events } from 'discord.js';

const name = Events.MessageCreate;

async function execute(message) {
	if (message.author.bot) return;

	try {
		if (message?.content?.toLowerCase()?.includes("ligma")) {
			message.reply("ligma balls");
		}
	} catch (error) {
		console.error(error);
	}
}

export { name, execute }