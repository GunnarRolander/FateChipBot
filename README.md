# Deadlands Fate Chip Discord Bot

A very simple and quick Discord bot written with discord.js
Based on bredmors simple discord bot: https://github.com/bredmor/simple-discord-js-bot

## Prerequisites
 * Node JS >= 12.0.0
 * NPM >= 6.9.0
 * Git

## Setup
Do `git clone https://github.com/GunnarRolander/FateChipBot.git` then navigate to the folder named `FateChipBot`.

Use `npm install` to install all the dependencies.

Enter the command prefix you want to use, and your discord bot API token in `config.json`

Use `node index.js` to start the bot

>**Note:**
If you don't already have a Discord bot application setup you can create one by going to the [Discord Developer Portal](https://discord.com/developers/applications/me), then create a new application, give it a name, go to the "Bot" tab, then click on "Add Bot", and you're good to go!

## Usage
After adding the bot to a server, call its command via `!bot <command>` where "!bot" is the prefix you defined in config.js

## Commands

* reset - returns all fate chips to the bag.
* draw n - draws n number of fate chips from the bag.
* spend <colour> - spends a white/red/blue fate chip.
* chips - shows you what chips you have.
* state - shows what chips everyone has, including the bag.
