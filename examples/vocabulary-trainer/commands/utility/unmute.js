import { SlashCommandBuilder } from 'discord.js';
import { unmute } from '../../events/utils/service.js';

const data = new SlashCommandBuilder()
  .setName('unmute-attack-notifications')
  .setDescription('Unmutes attack notifications');

async function execute(interaction) {
  unmute();
  return interaction.reply(`Attack notifications have been enabled.`);
}

export { data, execute };