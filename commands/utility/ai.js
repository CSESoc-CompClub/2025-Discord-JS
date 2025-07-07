import { SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('ask')
  .addStringOption((option) =>
    option
      .setName('question')
      .setDescription('The question to ask the AI')
      .setRequired(true)
  )
  .setDescription('Ask the AI');

async function execute(interaction) {
  console.log(interaction);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: interaction.options.getString('question'),
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    console.log('Error response:', await response.text());
    return;
  }

  const r = await response.json();
  const responseText = r.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log('Response Text:', responseText.trim());

  await interaction.reply(responseText.trim());
}

export { data, execute };
