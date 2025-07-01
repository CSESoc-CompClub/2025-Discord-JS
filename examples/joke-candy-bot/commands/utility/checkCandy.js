import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';

const data = new SlashCommandBuilder()
	.setName('check_candy')
	.setDescription('How many candy do you have?');

async function execute(interaction) {
	// Get all the relevant data
	const data = JSON.parse(fs.readFileSync('./commands/resources/users.json'));
	const userId = interaction.user.id;
	if (!userId) {
		throw Error("UserId is invalid");
	}

	// Check whether the user exists in the database already
	let userData = data[userId]
	let candy;
	if (userData) {
		candy = userData.candy;
	} else {
		data[userId] = {
			globalName: interaction.user.globalName,
			candy: 10,
			jokes: [],
			usedJokes: [],
			lastCandyDate: [0,0,0,0]
		}
		candy = 10;
	}

	fs.writeFileSync('./commands/resources/users.json', JSON.stringify(data));
	await interaction.reply(`User ${interaction.user.globalName} has a total of ${candy} candies`);
}

export { data, execute }