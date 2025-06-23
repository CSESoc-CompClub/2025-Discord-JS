const { ActionRowBuilder, SlashCommandBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('grass')
		.setDescription('allows you to touch grass'),
	async execute(interaction) {

		const grass = new EmbedBuilder()
			.setTitle('grass...')
			.setImage('https://i.pinimg.com/564x/94/62/be/9462bed420872cf9942d979cc4b4741e.jpg');

		const grass_t = new EmbedBuilder()
		.setTitle('you touched grass')
		.setImage('https://i.ytimg.com/vi/vEqeyZlKAnI/maxresdefault.jpg');

		const grass_n = new EmbedBuilder()
		.setTitle('you took too long to touch grass')
		.setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMEd70F_fR6BUJy-9g3Y7LngN4VhjLopBbA&s');

		const touch_grass = new ButtonBuilder()
			.setCustomId('touch_grass')
			.setLabel('touch grass')
			.setStyle(ButtonStyle.Success);
		
		const buttons = new ActionRowBuilder()
			.addComponents(touch_grass);

		const response = await interaction.reply({ 
			embeds: [grass], 
			components: [buttons]
		})

		const collectorFilter = i => i.user.id === interaction.user.id;
		try {
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 1_000 });
			
			if (confirmation.customId === 'touch_grass') {
				await interaction.editReply({ embeds: [grass_t], components: [] });
			}
		} catch (e) {
			await interaction.editReply({ embeds: [grass_n], components: [] });
		}
	},
};