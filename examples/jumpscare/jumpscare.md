# ur ur ur ur
## Premise
Whenever a user joins a voice call, when this code is implemented correctly the bot will wait a random amount of minutes
between two ranges you give it, then when the time is right join the voice call with the user and jumpscare them :^) <br>
<br>


## Setup
Make sure you have the GUILD_VOICE_STATES intent enabled in your bot configuration and in the Discord Developer Portal - 
 this is done by enabling all three privileged gateway intents on the Discord Developer Portal and importing the relevant intents as explained later.
 
<br>

### Packages to install
Do "npm install discord.js @discordjs/voice" to install the voice package.

also "npm install @discordjs/opus" (audio encoder and decoder)

also "npm install sodium-native" (encryption of voice data)

also run "sudo apt install ffmpeg" (linux only)

Download an audio file of your choosing (I used the fnaf 1 jumpscare noise), name it jumpscare.mp3 and place it in a folder
called audio (which goes in the base directory)

<br>

### Imports and Intents

We  need to change the imports and client declaration in index.js so they become:
```
import { Client, Collection, Events, GatewayIntentBits, ChannelType } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
```
Also add the new imports to the top of index.js:
```
import { joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
```
<br>

## Code
Then all code below goes just above the last line of code (client.login(token);):

```
// function to generate a random delay between min and max minutes
function getRandomDelayInMinutes(min, max) {
    // Convert minutes to milliseconds
    const minMillis = min * 60 * 1000;
    const maxMillis = max * 60 * 1000;
    return Math.floor(Math.random() * (maxMillis - minMillis + 1)) + minMillis;
}

async function jumpscare(oldState, newState) {
    // check if the bot itself is joining the channel
    if (newState.member.user.id === client.user.id) {
        return; 
    }

    // check if any user has joined a voice channel
    if (!oldState.channelId && newState.channelId) {
        // generate the random delay
        const delay = getRandomDelayInMinutes(0, 0);

        console.log(`User ${newState.member.user.tag} joined a voice channel. Waiting for ${delay / (60 * 1000)} minutes.`);

        // wait asynchronously for the random delay
        await new Promise(resolve => setTimeout(resolve, delay));

        // get the voice channel that the user joined
        const voiceChannel = newState.guild.channels.cache.get(newState.channelId);
 
        if (voiceChannel && voiceChannel.type === ChannelType.GuildVoice) {
            try {
                // join the voice channel
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });

                connection.on(VoiceConnectionStatus.Ready, () => {
                    console.log(`Successfully connected to ${voiceChannel.name}`);
                });

                connection.on(VoiceConnectionStatus.Disconnected, () => {
                    console.log(`Disconnected from ${voiceChannel.name}`);
                });

                // create an audio player
                const player = createAudioPlayer();
                
                // create an audio resource with volume set to 1.0 (maximum volume)
                const resource = createAudioResource('audio/jumpscare.mp3', {
                    inlineVolume: true // enables volume control
                });

                // set the volume to maximum
                resource.volume.setVolume(1.0);

                player.play(resource);
                connection.subscribe(player);

                // handle audio player events
                player.on(AudioPlayerStatus.Idle, () => {
                    console.log('Jumpscare finished.');
                    connection.destroy(); // disconnect after playback
                });

                player.on('error', (error) => {
                    console.error('Error playing audio:', error);
                    connection.destroy(); // disconnect if an error occurs
                });

            } catch (error) {
                console.error('Error connecting to the voice channel:', error);
            }
        } else {
            console.log('The selected channel is not a voice channel or not found.');
        }
    }
}


// Register the voiceStateUpdate event listener
client.on(Events.VoiceStateUpdate, (oldState, newState) => jumpscare(client, oldState, newState));
```
and that's the rest of the code. Let's go over it in chunks, so we can see what each chunk does :))

### Code explanation
```
    // check if any user has joined a voice channel
    if (!oldState.channelId && newState.channelId) {
        // generate the random delay
        const delay = getRandomDelayInMinutes(0, 10);

        console.log(`User ${newState.member.user.tag} joined a voice channel. Waiting for ${delay / (60 * 1000)} minutes.`);

        // wait asynchronously for the random delay
        await new Promise(resolve => setTimeout(resolve, delay));

        // get the voice channel that the user joined
        const voiceChannel = newState.guild.channels.cache.get(newState.channelId);
```
There is a line later on which triggers the jumpscare function when a voice channel changes state - hence if the channel changes state a user must have joined the channel. 

```
        if (voiceChannel && voiceChannel.type === ChannelType.GuildVoice) {
            try {
                // join the voice channel
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });

                connection.on(VoiceConnectionStatus.Ready, () => {
                    console.log(`Successfully connected to ${voiceChannel.name}`);
                });

                connection.on(VoiceConnectionStatus.Disconnected, () => {
                    console.log(`Disconnected from ${voiceChannel.name}`);
                });

```
If we found a voice channel and the type of voice channel is correct, we join it - specifying the parameters required in the joinVoiceChannel function which comes from the discord.js library.

```
                // create an audio player
                const player = createAudioPlayer();
                
                // create an audio resource with volume set to 1.0 (maximum volume)
                const resource = createAudioResource('audio/jumpscare.mp3', {
                    inlineVolume: true // enables volume control
                });

                // set the volume to maximum
                resource.volume.setVolume(1.0);

                player.play(resource);
                connection.subscribe(player);

                // handle audio player events
                player.on(AudioPlayerStatus.Idle, () => {
                    console.log('Jumpscare finished.');
                    connection.destroy(); // disconnect after playback
                });

                player.on('error', (error) => {
                    console.error('Error playing audio:', error);
                    connection.destroy(); // disconnect if an error occurs
                });

```
To play audio, we need to create an audio player - we do so by calling the createAudioPlayer function we imported from disocrd.js/voice earlier.

When we play the audio, we need to play it to the connection to the voice channel we created earlier - hence connection.subscribe(player)

```
// Register the voiceStateUpdate event listener
client.on(Events.VoiceStateUpdate, (oldState, newState) => jumpscare(client, oldState, newState));
```

Without registering the voiceStateUpdate event listener, our function will not actively listen for a change in voiceState (that is, voice calls)
