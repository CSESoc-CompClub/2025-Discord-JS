import { SlashCommandBuilder } from 'discord.js';
import request from 'then-request';
import { setTimeout } from 'node:timers/promises';

const data = new SlashCommandBuilder()
	.setName('tell_amazing_joke')
	.setDescription('Tells an amazing joke (stolen from other people)');

async function execute(interaction) {
	let jokeReq = await request(
		'GET',
		'https://icanhazdadjoke.com/',
		{ headers: {
				"Accept": "text/plain"
			}
		}
	);
	let joke = jokeReq.body.toString();
	await interaction.reply(joke);
	setTimeout(2000);
	await interaction.followUp(":joy:");
}

export { data, execute }