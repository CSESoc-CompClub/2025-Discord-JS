import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';
import { getTodayHour } from '../../helpers/dates.js';

const data = new SlashCommandBuilder()
	.setName('hourly_candy')
	.setDescription('Adds Candy to your Account')

async function execute(interaction) {
	// Get all the relevant data
	const data = JSON.parse(fs.readFileSync('./commands/resources/users.json'));
	const userId = interaction.user.id;
	if (!userId) {
		throw Error("UserId is invalid");
	}

	// Check whether the user exists in the database already
	let userData = data[userId]
	if (userData) {
		// If exists, check whether same date
		const date = getTodayHour();
		if (JSON.stringify(date) === JSON.stringify(userData.lastCandyDate)) {
			// They have already run the command today
			await interaction.reply('You have already run the command today. Please wait until next hour');
			return;
		} else {
			if (Math.random() >= 0.98) {
				await interaction.reply(`Special Bonus!`);
				userData.candy += 10;
			}
			userData.candy += 10;
			userData.lastCandyDate = date;
		}
	} else {
		data[userId] = {
			globalName: interaction.user.globalName,
			candy: 10,
			jokes: [],
			usedJokes: [],
			lastCandyDate: getTodayHour()
		}
	}

	fs.writeFileSync('./commands/resources/users.json', JSON.stringify(data));
	await interaction.reply(`10 candy has been added for user ${interaction.user.globalName} ` +
		`for a total of ${data[userId].candy}`);
}

export { data, execute }
