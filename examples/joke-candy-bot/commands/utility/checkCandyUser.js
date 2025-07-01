import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';

const data = new SlashCommandBuilder()
	.setName('check_candy_user')
	.setDescription('Check the Candy balance of your friends')
	.addUserOption(option =>
		option.setName('target')
			.setDescription('The person whose balance you want to check')
			.setRequired(true)
	)

async function execute(interaction) {
	const data = JSON.parse(fs.readFileSync('./commands/resources/users.json'));
	const target = interaction.options._hoistedOptions[0].user.id;

	if (!data[target]) {
		await interaction.reply(`Player has not registered into the candy system :(`);
		return;
	}

	await interaction.reply(`Player "${data[target].globalName}" has ${data[target].candy} candies`);
}

export { data, execute }