import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';

const data = new SlashCommandBuilder()
	.setName('coin_flip_candy')
	.setDescription('Steal Candy from your friends')
	.addNumberOption(option =>
		option.setName('coin_flip_amount')
			.setDescription('The amount that you want to risk and earn')
			.setRequired(true)
	)
	.addStringOption(option =>
		option.setName("heads_or_tails")
			.setDescription('Do you want to do heads or tails')
			.setRequired(true)
	)

async function execute(interaction) {
	const data = JSON.parse(fs.readFileSync('./commands/resources/users.json'));
	const flip_amount = interaction.options._hoistedOptions[0].value;
	const coin_choice = interaction.options._hoistedOptions[1].value.toLowerCase();
	const self_id = interaction.user.id;
	const flip_result = ["heads", "tails"][Math.floor(Math.random() * 2)];

	if (coin_choice != "heads" && coin_choice != "tails") {
		await interaction.reply('Please use "heads" or "tails" for your coin flip choice');
		return;
	} else if (!data[self_id]) {
		await interaction.reply(`Please register yourself into the candy system before trying to steal :(`);
		return;
	} else if (data[self_id].candy < flip_amount) {
		await interaction.reply(`You don't have enough candy to flip this much!`);
		return;
	}

	let message = `The coin flipped **${flip_result}** and you chose **${coin_choice}**`

	if (coin_choice == flip_result) {
		data[self_id].candy += flip_amount;
		await interaction.reply(message + 
			`\nSuccessfully earnt ${flip_amount} :D New balance is ${data[self_id].candy}`);
	} else {
		data[self_id].candy -= flip_amount;
		await interaction.reply(message + 
			`\nLost ${flip_amount} D: New balance is ${data[self_id].candy}`);
	}

	fs.writeFileSync('./commands/resources/users.json', JSON.stringify(data));
}

export { data, execute }