import { Events } from "discord.js";
import { 
  checkRule, 
  getAttackMessage, 
  checkMuted 
} from './utils/service.js';
import { attackMonster, checkHealth } from './utils/monsters.js';

const name = Events.MessageCreate;

async function execute(message) {
  if (message.author.bot) return; // If the message is sent by a bot, do not process it
	if (checkHealth() <= 0) {
		message.reply(` \`\`\`
  ,-=-.  
 /  +  \\    
 | ~~~ |    
 |R.I.P|  
 |_____|
			 \`\`\` `);
		message.reply(`Good job! Vorazk has been defeated! But beware, he will return soon! 🧛‍♂️`);
		return
	}; // If the monster is already dead, do not process any more messages
	if (message.channel.name !== 'playground-1') return; // If the message is not sent in the 'playground-1' channel, do not process it

	console.log("--> " + message.content);
	const originalContent = message.content;

	// Split the message into separate words
	const words = originalContent.split(" ");

	let damage = 0;

	// This function is incomplete, the original library is not working
	const wordExists = (word) => {
		if (word.length <= 2) {
			return false;
		}
		return true;
	};

	// Check each word if it is valid
	for (const word of words) {
		try {
			if (checkRule(word) && wordExists(word)) {
				console.log(`The word "${word}" is valid.`);
				damage += word.length; // If valid, add the length of the word as damage
			} else {
				if (!wordExists(word)) {
					console.log(`The word "${word}" does not exist in the English dictionary.`);
				} else {
					console.log(`The word "${word}" is invalid.`);
					// This happens when the word breaks one or two of the rules
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	// If any of the words are valid, attack the monster
	if (damage > 0) {
		console.log(`Total damage: ${damage}`);
		attackMonster(damage);
		console.log(`Current health: ${checkHealth()}`);

		if (!checkMuted()) {
			message.reply(getAttackMessage(damage));
		}
	}
}

export { name, execute };