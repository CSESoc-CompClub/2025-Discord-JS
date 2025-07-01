[Note] This guide is half a CompClub Guide for Beginners and half a guide to replicate this project
[NOTE] This code requires the use of Node v20.11 up. It may not work on the newest Node version (v22.8.0). If so, utilise a previous version.

# Guide to how to create this Discord Bot
BoilerPlate Code website: https://discordjs.guide/#before-you-begin
DiscordJs Documentation: https://discord.js.org/docs/packages/builders/1.8.2

## Tasks for Creating this bot
This bot has a couple functions/slash commands that you need to implement to mimic the functionality of this bot. 

If you want to try create this bot, try to implement the following slash commands without looking at the source code. If you're struggling, feel free to reach out to a mentor for help!

| Function Name  | Functionality |
| ------------ |---------------|
| `epic_joke` | Tells a single joke with multiple messages. The joke is the same everytime |
| `amazing_joke` | Tells a random dad joke (Note: look into using an API for this) |
| `tell_joke` | Tell a joke stored within this bot's database |
| `write_joke` | add a joke to this bot's database |
| `check_candy` | Checks the amount of candy this user owns |
| `hourly_candy` | Every hour, a user gains 10 candy with the chance to earn the double the candy. This function should fail if the user has already called the function within the past hour |
| `check_candy` | Checks how much candy the user has |
| `check_candy_user` | Checks how much candy any user has |
| `coin_flip_candy` | Flips a coin and decides whether the user gets to double the money that they choose to risk |
| `leaderboard` | Requests the top 5 people with the most candy |
| `leaderboard_position` | Requests the User's position within the leaderboard |
| `steal_candy` | Has a chance to steal candy from a separate user but if fails, results in a lost of candy. Can not steal if the user does not have a positive balance of candy |

# Guides
If you need help with implementing some of the following functions, feel free to look through the following guides to help understand some things more!

## Working with a local Database
We're not going to store information through a database service such as `MongoDb` or `MySQL` as that could take a bit too much time but feel free to have a look into that in your spare time.

Instead, we're going to want to store our data locally and we're going to do that by storing our data within a file. To ensure that this data is easily readable and storable, we want to utilise a consistent (and ideally universal) method for storing information. Rather than storing the data into a simple `.txt` file, we will be using a specific text file called a `JSON` file (`.json`)

### JSON and JSON Files
JSON (Javascript Object Notation) is a way of writing text/strings such that if you were to look at it, it would look similar to if you were to print out a javascript object. This way, the data is not only readable to a human user but also easily decipherable by a computer as it know what patterns to expect.

It is important to note that JSON is not different from regular text but merely the way that it is formatted that makes it useful.

Now, although JSON looks fairly similar to a javascript object, there are some differences that you should note:
- JSON, although it looks like an object, is by technicality, text (a string of chracters). As a result, we will need to convert it from a JSON String into a javascript Object when we read the data and vice versa when we write the data to save it
- All keys within the object must be surrounded with apostrophes. E.g `{ test: 5 }` would not be legal but `{ "test": 5 }` would be legal
- There should not be any trailing commas. After the last property listed within the JSON file, there should not be a comma between it and the closing `}` bracket. E.g, the following would NOT be allowed as there is a comma after the "yes" property even though it is the last property in the object
```
{
	"test": 1,
	"yes": 2,
}
```

### Reading and Writing to the File
Now that we've covered what JSON is, we need to know how to **read** data from a file and **write** data to a file. If you've done this in other languages, javascript's package for doing this is `fs` so feel free to look into that.

When we want to read a file, we want to use `fs.readFileSync()` and pass in the path to the file we want to read and if we want to write to a file, we want to use `fs.writeFileSync()` to write to the file. If you're still a bit confused, perhaps have a read of this page from geek for geeks [here](https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/) or try and absorb from the following sample code

```js
// Pass the path to the file you want to read from
let data = fs.readFileSync('./fileName.txt');

// Do whatever you want to do with the data in the file
console.log(data);

let newData = "Uh oh Spaghettio";

// Pass the file that you want to write to and what data you want to write
fs.writeFileSync('./fileName.txt', newData);

```

### Converting between Javascript and JSON
Now that we've learnt how to read and write to and from files, let's apply this to JSON!

We will keep the default state of our JSON file as `{}` which when translated to javascript notation, would simply be an empty object. We can add corresponding keys into the JSON file for its default state if we wish however for this project, the keys will simply be the user ids so I will keep it empty.

Say that we now have a file that has the following JSON code in a file `fruit.txt`
```
{
	"red": "apple",
	"green": "pepper",
	"yellow": "banana"
}
```

We know that JSON is essentially just a large string so we after we use `let data = readFileSync('fruit.txt)`, we also need to convert this JSON String into a javascript object so that we can access the red, green, yellow properties.

We can convert a JSON string to javascript by using the function `JSON.parse()` which takes in a string and attempts to convert it to a javascript object.

The reverse of this would be converting from a javascript object to a JSON string so that we can store the information back into the text file. We would do this with the `JSON.stringify()` function.

Example:
```js
import fs from 'fs'

// read from the file
const fruitJSON = fs.readFileSync('./fruit.json');

// Convert the JSON string to a javascript object
let fruit = JSON.parse(fruitJSON);

// Now we can manipulate the value of the object
fruit["blue"] = "Blueberry";

// Convert the javascript object back into a JSON String
const newFruitJSON = JSON.stringify(fruit);

// Time to write the new data back into the file to save it
fs.writeFileSync('./fruit.json', newFruitJSON);
```

## Extra Message Functions

If we want to add any extra message features or our bot to do any specific things with messages, we can.

We can experiment with the following:
| Function Name  | Functionality |
| ------------ |---------------|
| `.followUp` | Getting the bot to respond with multiple messages |
| `.reply` | Getting the bot to just reply with a regular response into the chat |
| ephemeral option - true | Getting the bot to send messages that are only visible to the user |
| `.editReply` | Getting the bot to edit a message|
| `.deferReply` | Getting the bot to hold off on messaging for a bit. |

If you want to look at documentation because that's your thing:
- https://discord.js.org/docs/packages/discord.js/main/Message:Class
- https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses
