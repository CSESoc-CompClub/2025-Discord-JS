import { SlashCommandBuilder } from 'discord.js';
import fs from 'fs';

const data = new SlashCommandBuilder()
	.setName('write_joke')
	.setDescription('Writes a new good joke')
	.addStringOption(option =>
		option.setName('joke')
			.setDescription('The Joke that you want to add')
			.setRequired(true)
	)

async function execute(interaction) {
	const jokesJson = fs.readFileSync('./commands/resources/joke.json', {flag: 'r'});
	const jokesObj = JSON.parse(jokesJson);
	const joke = interaction.options._hoistedOptions[0].value;
	jokesObj.jokes.push(joke);
	fs.writeFileSync('./commands/resources/joke.json', JSON.stringify(jokesObj).toString());
	await interaction.reply(`Added the joke ${joke} to the joke library`);
}

export { data, execute }