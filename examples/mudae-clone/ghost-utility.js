import { AttachmentBuilder } from 'discord.js';
import { dataStore, getNameFromGhost } from './ghosts-index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ----------------------------------------------------------------------------

Hi Programmer! This file contains some utility functions for building your 
ghost collector bot. Note that you don't need to understand how any of these 
functions actually work! You  only need to worry about their given description
and be able to use them accordingly in other files. If you are curious about
written code, ask a mentor! :D

-----------------------------------------------------------------------------*/

// randomly generates a ghost - rarer ghosts are less likely to appear!
// returns a Ghost (has a name, image, rarity etc)
export function getRandomGhost() {
    let totalWeight = 0;
    const cumulative = [];

    let ghosts = dataStore.GhostsIndex;

    ghosts.forEach(g => {
        totalWeight += 1 / g.rarity;
        cumulative.push(totalWeight);
    });

    const rand = Math.random() * totalWeight;

    for (let i = 0; i < cumulative.length; i++) {
        if (rand < cumulative[i]) {
            return ghosts[i];
        }
    }
}

// gets the types of the given ghost as a string - useful for discord embed
export function getGhostTypes(ghost) {
    return ghost.types.map(type => getNameFromGhost[type]).join(", ");
}

// creates an attachment from the ghost's supplied image - useful for discord embed
export function getImageAttachment(ghost) {
    const imagePath = 
        path.join(__dirname + "/commands/utility", '..', '..', ghost.image_url);
    return new AttachmentBuilder(imagePath);
}

// creates an embeddable url from the ghost's supplied image 
// useful for discord embed
export function generateImageUrl(ghost) {
    const imagePath = 
        path.join(__dirname + "/commands/utility", '..', '..', ghost.image_url);
    return `attachment://${path.basename(imagePath)}`
}