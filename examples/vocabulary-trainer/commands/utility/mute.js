import { SlashCommandBuilder } from 'discord.js';
import { mute } from '../../events/utils/service.js';

const data = new SlashCommandBuilder()
  .setName('mute-attack-notifications')
  .setDescription('Mutes attack notifications');

async function execute(interaction) {
  mute();
  return interaction.reply(`Attack notifications have been disabled.`);
}

export { data, execute };