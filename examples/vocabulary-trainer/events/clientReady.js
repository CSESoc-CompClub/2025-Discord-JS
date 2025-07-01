import { Events } from "discord.js";
import schedule from "node-schedule";

import { setRules, obtainRules } from './utils/rules.js';
import { spawnMonster, checkHealth } from './utils/monsters.js';
import config from '../config.json' assert { type: "json" };
const { guildId } = config;

const name = Events.ClientReady;
const once = true;
const HEALTH_PER_MEMBER = 100;

const spawnWrapper = (client) => {
	const guild = client.guilds.cache.get(guildId);
	spawnMonster(HEALTH_PER_MEMBER * guild.memberCount);
	const rules = obtainRules();
	const generalChannel = guild.channels.cache.find(channel => channel.name === 'playground-1');
	generalChannel.send(`Beware adventurers! A monster has appeared in the Dream Realm! Defeat it by using words that follow the rules of the day! The rules of the day are: \n \t1. ${rules[0].name} \n2. ${rules[1].name}`);
	generalChannel.send(`\`\`\`
              /|                                           |\\                 
             /||             ^               ^             ||\\                
            / \\\\__          //               \\\\          __// \\               
           /  |_  \\         | \\   /     \\   / |         /  _|  \\              
          /  /  \\  \\         \\  \\/ \\---/ \\/  /         /  /     \\             
         /  /    |  \\         \\  \\/\\   /\\/  /         /  |       \\            
        /  /     \\   \\__       \\ ( 0\\ /0 ) /       __/   /        \\           
       /  /       \\     \\___    \\ \\_/|\\_/ /    ___/     /\\         \\          
      /  /         \\_)      \\___ \\/-\\|/-\\/ ___/      (_/\\ \\      \`  \\         
     /  /           /\\__)       \\/  oVo  \\/       (__/   \` \\      \`  \\        
    /  /           /,   \\__)    (_/\\ _ /\\_)    (__/         \`      \\  \\       
   /  \'           //       \\__)  (__V_V__)  (__/                    \\  \\      
  /  \'  \'        /\'           \\   |{___}|   /         .              \\  \\     
 /  \'  /        /              \\/ |{___}| \\/\\          \`              \\  \\    
/     /        \'                \\/{_____}\\/  \\          \\    \`         \\  \\  
     /                          /{_______}\\   \\          \\    \\            \\     
                               /{___/_\\___}\\   \`          \\    \`
			
			\`\`\``
	);
	generalChannel.send(`Vorazk, the Void Stalker has appeared! He has spawned with ${checkHealth()} health. Defeat him before the day ends!`);
	return;
};

/**
 * Runs whenever the client (bot) is ready to run!
 */
function execute(client) {
  console.log(`Logged in as ${client.user.tag}`);

	// Scheduling the monster spawn job. This job will run everyday at 10:00 AM.
  const job = schedule.scheduleJob('0 10 * * *', () => {
		console.log('It\'s 10:00 AM, time to spawn monsters!');
		
		// 1. Setting the rules for the day
		console.log('Setting rules for today...');
		setRules();
		const rules = obtainRules();
		console.log(`Rules: \n \t1. ${rules[0].name} \n \t2. ${rules[1].name}`);

		// 2. Spawning the monster
		spawnWrapper(client);
	});
	console.log(`Monster spawn job scheduled at ${job.nextInvocation()}`);

	// 2.1 Spawn the monster immediately
	setRules();
	spawnWrapper(client);

	// 3. The bot is ready and listening to messages
  console.log("Ready!");
	console.log("------------------------------------");
	console.log("Listening to messages... \n");
}

export { name, once, execute };
