import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Reaslkdj with Pong!');

async function execute(interaction) {
	await interaction.reply('Pong!');
}

export { data, execute }
