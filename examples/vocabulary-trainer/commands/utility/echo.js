import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(true));

async function execute(interaction) {
  const input = interaction.options.getString('input');
  return interaction.reply(`This is your echo: ${input}`);
}

export { data, execute };