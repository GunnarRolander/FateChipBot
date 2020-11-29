const fs = require('fs');                               // Loads the Filesystem library
const Discord = require('discord.js');                  // Loads the discord API library
const { prefix, token } = require('./config.json');     // Loads the "token" and "prefix" values from the config file

const client = new Discord.Client(); // Initiates the client
client.commands = new Discord.Collection(); // Creates an empty list in the client object to store all commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Loads the code for each command from the "commands" folder
// Loops over each file in the command folder and sets the commands to respond to their name
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection(); // Creates an empty list for storing timeouts so people can't spam with commands

let chips = {
    "bag":{
        "white": 20,
        "red": 10,
        "blue": 5
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getChipText(chipBag) {
    return chipBag.white + " white :white_circle:, " + chipBag.red + " red :red_circle: and " + chipBag.blue + " blue :blue_circle: chips."
}

// Starts the bot and makes it begin listening for commands.
client.on('ready', () => {
    console.log('Bot Online');
});

/**
 * This function controls how the bot reacts to messages it receives
 */
client.on('message', message => {
    // Ignore bot messages and messages that dont start with the prefix defined in the config file
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // Split commands and arguments from message so they can be passed to functions
    const args = message.content.slice(prefix.length).split(/ +/);
    console.log(args)
    args.shift()
    const commandName = args.shift().toLowerCase();
    console.log(message.content)
    console.log(commandName)
    console.log(args)
    console.log(message.author.username)
    let response = ""
    switch(commandName) {
        case "reset":
            chips = {
                bag:{
                    white: 20,
                    red: 10,
                    blue: 5
                }
            }
            response = "Chip bag state reset. 20 white :white_circle:, 10 red :red_circle:, 5 blue :blue_circle:."
            break;
        case "draw":
            const nrOfChips = args[0] || 1;
            chips[message.author.username] = chips[message.author.username] || {
                white: 0,
                red: 0,
                blue: 0
            }
            let drawMessage = "You've drawn "
            for (var i = 0; i < nrOfChips; i++) {
                if (i > 0 && i == nrOfChips - 1) {
                    drawMessage += "and "
                }
                const randNr = getRandomInt(chips.bag.red + chips.bag.white + chips.bag.blue)
                console.log("Randnr: " + randNr + ", bag white:" + chips.bag.white + ", bag red: " + chips.bag.red + ", bag blue:" + chips.bag.blue)
                if (randNr < chips.bag.white) {
                    chips[message.author.username].white += 1
                    chips.bag.white += -1
                    drawMessage += "a white chip :white_circle:"
                } else if (randNr < chips.bag.white + chips.bag.red) {
                    chips[message.author.username].red += 1
                    chips.bag.red += -1
                    drawMessage += "a red chip :red_circle:"
                } else if (randNr < chips.bag.white + chips.bag.red + chips.bag.blue) {
                    chips[message.author.username].blue += 1
                    chips.bag.blue += -1
                    drawMessage += "a blue chip :blue_circle:"
                } else { 
                    drawMessage += "no more chips since the bag is empty :("
                    break;
                }
                if (i < nrOfChips - 1) {
                    drawMessage += ", "
                }       
            }
            drawMessage += "."
            response = drawMessage;
            break;
        case "spend":
            let spendMessage = "";
            const chipColor = args[0]
            if (['white', 'red', 'blue'].indexOf(chipColor) >= 0 && chips[message.author.username] && chips[message.author.username][chipColor] > 0) {
                chips[message.author.username][chipColor] += -1
                chips.bag[chipColor] += 1
                spendMessage = "You have spent a " + chipColor + " :" + chipColor + "_circle: chip."
            } else {
                spendMessage = "Something went wrong. I can't be arsed to add feluskrifter just nu."
            }
            response = spendMessage;
            break;
        case "chips":
            let chipMessage = 'You have '
            if (chips[message.author.username]) {
                chipMessage += getChipText(chips[message.author.username])
            } else {
                chipMessage += 'no chips! Draw some before you start spending.'  
            }
            response = chipMessage;
            break;
        case "help":
            response = "Available commands:\nreset - resets chip state. \ndraw n - draws n chips. \nspend white/red/blue - spends a chip. \nchips - shows your chips. \nstate - shows the current state of chip affairs."
            break;
        case "state":
            let stateMessage = "Current fate chip state:"
            console.log(chips)
            for (var key in chips) {
                stateMessage += "\n" + key + " has "
                stateMessage += getChipText(chips[key])
            };
            response = stateMessage
            break;
        default:
            response = " please enter a command when you call the bot."
    }
    message.reply(response)
});

client.login(token); // Log the bot in using the token provided in the config file