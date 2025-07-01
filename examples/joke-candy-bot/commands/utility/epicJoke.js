import { SlashCommandBuilder } from 'discord.js';
import { setTimeout } from 'node:timers/promises';

const data = new SlashCommandBuilder()
	.setName('epic_joke')
	.setDescription('Tells and EPIC joke')

async function execute(interaction) {
	await interaction.deferReply();
	await setTimeout(2_000);
	await interaction.editReply('A giraffe and a penguin walked into a bar. The mouse did not.');
	await setTimeout(2_000);
	await interaction.followUp({ content: 'Feel free to laugh btw :)', ephemeral: true});
	await setTimeout(2_000);
	await interaction.editReply('Programming is good');
}

export { data, execute }