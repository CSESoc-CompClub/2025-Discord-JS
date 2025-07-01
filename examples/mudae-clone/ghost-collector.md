# GHOST COLLECTOR

In this section, we'll look at how to create our own ghost collector bot, as you can see on the discord! It has the following commands:

We will implement the following commands:

| Function Name  | Functionality |
| ------------ |---------------|
| `ghostrandom` | Spawns a random, claimable ghost |
| `userghostlist (user)` | Lists the given user's collected ghosts |


Hence, the requirements for our bot will include:

- users in the discord channel can prompt for 'ghosts' to spawn, which are just a randomised embed with a ghost and some information about it
- each user can react to claim a ghost as part of their collection - first come first serve!
- users can generate a list of all the ghosts that they (or another user) currently have.

In our main directory....

## Walkthrough of Files

`ghosts-index.js`
Contains a list of all ghosts and all ghost types. You can use the pre-set lists of ghosts, add to it or make your own - instructions are given in the file. **You will need to complete this file!!**

`ghost-info.js`
Contains 3 functions, which define the functionality of the bot. We will be filling out these functions for the server to use when the bot is working.

`ghost-utility.js`
Contains helper functions for you to use with your bot! Note that you don't need to understand how these given functions work, only how to use them. **Don't edit anything in this file!!**

In `commands/utility`...

`ghostSpawn.js`
The slash command for spawning ghosts

`userGhostList.js`
The slash command for getting the list of someone's claimed ghosts

## Helpful Links / tips

[How to collect message reactions](https://discord.js.org/docs/packages/discord.js/14.16.2/ReactionCollector:Class)

[Adding more inputs for a slash command](https://discordjs.guide/slash-commands/advanced-creation.html#adding-options)

[The user object](https://discord.js.org/docs/packages/discord.js/14.16.2/User:Class#id)

[embeds in depth](https://discordjs.guide/popular-topics/embeds.html#embed-preview)