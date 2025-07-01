export const GhostTypes = Object.freeze({
    ANIMAL: 0,
    POKEMON: 1,
    FOOD: 2,
    MASCOT: 3,
    CHARACTER: 4,
    PACMAN: 5,
    SANRIO: 6
});

// Reverse the GhostTypes object to get a mapping from number to string
export const getNameFromGhost = Object.keys(GhostTypes).reduce((acc, key) => {
    acc[GhostTypes[key]] = key;
    return acc;
}, {});

/* ----------------------------------------------------------------------------

This file contains the big dictionary of ghosts - if you want to add a ghost or
a new type, then add it to the GhostsIndex and put its image in ghost-resources,
and for types change the TypeTotals array at the bottom of the datastore.

-----------------------------------------------------------------------------*/

export let dataStore = {
    GhostsIndex : [
        {
            name: "Pikachu",
            image_url: 'ghost-resources/pikachu.jpg',
            rarity: 2,
            types: [GhostTypes.POKEMON, GhostTypes.MASCOT, GhostTypes.ANIMAL, GhostTypes.CHARACTER]
        }, 
        {
            name: "Mimikyu",
            image_url: 'ghost-resources/mimikyu.png',
            rarity: 5,
            types: [GhostTypes.POKEMON, GhostTypes.ANIMAL, GhostTypes.CHARACTER]
        },
        {
            name: "Hello Kitty",
            image_url:'ghost-resources/hellokitty.webp',
            rarity: 2,
            types: [GhostTypes.ANIMAL, GhostTypes.MASCOT, GhostTypes.CHARACTER, GhostTypes.SANRIO]
        },
        {
            name: "Cinnamoroll",
            image_url: 'ghost-resources/cinnamoroll.jpg',
            rarity: 1,
            types: [GhostTypes.ANIMAL, GhostTypes.MASCOT, GhostTypes.CHARACTER, GhostTypes.SANRIO]
        },
        {
            name: "Gudetama",
            image_url: 'ghost-resources/gudetama.jpg',
            rarity: 5,
            types: [GhostTypes.FOOD, GhostTypes.MASCOT, GhostTypes.CHARACTER, GhostTypes.SANRIO]
        },
        {
            name: "Strawberry Cake",
            image_url: 'ghost-resources/strawberrycake.jpg',
            rarity: 5,
            types: [GhostTypes.FOOD]
        },
        {
            name: "Inky",
            image_url: 'ghost-resources/inky.webp',
            rarity: 1,
            types: [GhostTypes.CHARACTER, GhostTypes.PACMAN]
        },
        {
            name: "Pinky",
            image_url: 'ghost-resources/pinky.webp',
            rarity: 1,
            types: [GhostTypes.CHARACTER, GhostTypes.PACMAN]
        },
        {
            name: "Blinky",
            image_url: 'ghost-resources/blinky.webp',
            rarity: 1,
            types: [GhostTypes.CHARACTER, GhostTypes.PACMAN]
        },
        {
            name: "Clyde",
            image_url: 'ghost-resources/clyde.webp',
            rarity: 1,
            types: [GhostTypes.CHARACTER, GhostTypes.PACMAN]
        },
        {
            name: "King Boo",
            image_url: 'ghost-resources/kingboo.webp',
            rarity: 5,
            types: [GhostTypes.CHARACTER]
        },
    ],
    TypeTotals: [
        {
            typeName: "animal",
            total: 4
        },
        {
            typeName: "pokemon",
            total: 2
        },
        {
            typeName: "food",
            total: 2
        },
        {
            typeName: "mascot",
            total: 4
        },
        {
            typeName: "character",
            total: 10
        },
        {
            typeName: "pacman",
            total: 4
        },
        {
            typeName: "sanrio",
            total: 3
        },
    ]
}
