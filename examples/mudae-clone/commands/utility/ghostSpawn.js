import { SlashCommandBuilder, ReactionCollector } from 'discord.js';
import { getGhostTypes, getRandomGhost, generateImageUrl, getImageAttachment } from '../../ghost-utility.js';
import { claimGhost, getGhostOwnerID } from '../../ghost-info.js';

export const data = new SlashCommandBuilder()
		.setName("ghostrandom")
		.setDescription("Spawns a random ghost :D");

export async function execute(interaction) {
    // part 1: spawning the ghost ------------------------------------------

    let ghost = getRandomGhost();
    let owner = getGhostOwnerID(ghost.name);
    let footerText;

    if (owner === "") {
        footerText = "react with any emoji to claim!"
    } else {
        const u = await interaction.client.users.fetch(owner);
        footerText = `belongs to ${u.username}`
    }

    const ghostEmbed = {
        title: ghost.name,
        color: 0x0099FF,
        image: { url: generateImageUrl(ghost)},
        fields: [
            { name: 'Rarity', value: ghost.rarity.toString() + "/5", inline: true },
            { name: 'Types', value: getGhostTypes(ghost), inline: true },
        ],
        footer: { 
            text: footerText
        }
    }

    const msg = await interaction.reply({
        embeds: [ghostEmbed],
        files: [getImageAttachment(ghost)],
        fetchReply: true
    });

    // part 2: handling the reacts ------------------------------------------

    const filter = (reaction, user) => !user.bot;

    const reactCollector = msg.createReactionCollector({ filter: filter, max: 1, time: 10000 })

    reactCollector.on('collect', async (reaction, user) => {
        console.log('ghost collected!')

        if (claimGhost(user.id, ghost)) {
            interaction.followUp(`${user.username} has claimed ${ghost.name}!`)
        } else {
            interaction.followUp(`oops! this ghost has already been claimed`)
        }
    });

    reactCollector.on('end', (collected, reason) => {
        if (reason === 'time') {
            console.log('No one reacted in time! The ghost disappeared :(');
        }
    });

}