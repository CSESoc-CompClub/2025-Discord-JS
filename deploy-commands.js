import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import config from './config.json' with { type: "json" };
const { clientId, guildId, token } = config;
import { fileURLToPath } from 'url';
import util from 'node:util';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = await import(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log('[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.');
        }
    }
}
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

const lastDeployCommands = path.join(dirname, ".last-deploy-commands");
async function shouldRedeployCommands () {
    try {
        const last = await fs.promises.readFile(lastDeployCommands, "utf-8");
        const current = util.inspect(commands) + JSON.stringify(config.token);
        return last !== current;
    } catch {
        // If we failed to open ".last-deploy-commands", then we have never deployed before.
        return true;
    }
}

// and deploy your commands!
(async () => {
    if (await shouldRedeployCommands()) {
        try {
            console.log('Started refreshing ${commands.length} application (/) commands.');

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            console.log('Successfully reloaded ${data.length} application (/) commands.');
            await fs.promises.writeFile(lastDeployCommands, util.inspect(commands) + JSON.stringify(config.token));
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    }
})();