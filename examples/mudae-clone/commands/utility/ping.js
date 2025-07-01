import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');

export async function execute(interaction) {
	const pingEmbed = {
		title: "Pong!",
		color: 0x0099FF,
		description: (interaction.createdTimestamp - Date.now() - 5000) + " ms (round trip)",
	}

	await interaction.reply({
		embeds: [pingEmbed],
	});
}