import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';

const data = new SlashCommandBuilder()
	.setName('steal_candy')
	.setDescription('Steal Candy from your friends')
	.addUserOption(option =>
		option.setName('stealing_target')
			.setDescription('The person you want to steal from')
			.setRequired(true)
	)
	.addNumberOption(option =>
		option.setName('stealing_amount')
			.setDescription('The amount that you want to steal')
			.setRequired(true)
	)

async function execute(interaction) {
	const data = JSON.parse(fs.readFileSync('./commands/resources/users.json'));
	const target = interaction.options._hoistedOptions[0].user.id;
	const stealing_amount = interaction.options._hoistedOptions[1].value;
	const self_id = interaction.user.id;

	if (!data[self_id]) {
		await interaction.reply(`Please register yourself into the candy system before trying to steal :(`);
		return;
	} else if (target === self_id) {
		await interaction.reply(`You can not steal from yourself!`);
		return;
	} else if (!data[target]) {
		await interaction.reply(`Player has not registered into the candy system :(`);
		return;
	} else if (data[self_id].candy < 0) {
		await interaction.reply(`You don't have enough candy to pay the penalty if you get caught!`);
		return;
	} 

	let targetDetails = data[target];
	if (targetDetails.candy < stealing_amount) {
		await interaction.reply(`Player does not have this amount`);
		return;
	}

	const steal_successful = Math.random() >= 0.55;
	if (steal_successful) {
		targetDetails.candy -= stealing_amount;
		data[self_id].candy += stealing_amount;
		await interaction.reply(`Successfuly stole ${stealing_amount} from ${targetDetails.globalName}`);
	} else {
		const fine = Math.floor(stealing_amount * Math.random() * 1.5);
		data[self_id].candy -= fine;
		await interaction.reply(`You've been fined heavily for your sins! You have been fined ${fine} candies. Your new balance is ${data[self_id].candy}`);
	}

	fs.writeFileSync('./commands/resources/users.json', JSON.stringify(data));
}

export { data, execute }