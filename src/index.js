const { Client, Collection, Intents } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

const soupful = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

soupful.commands = new Collection();

const commands_path = path.join(__dirname, "commands");
const command_files = fs
  .readdirSync(commands_path)
  .filer((file) => file.endsWith(".js"));

for (const file of command_files) {
  const file_path = path.join(commands_path, file);
  const command = require(file_path);
  soupful.commands.set(command.data.name, command);
}

const events_path = path.join(__dirname, "events");
const event_files = fs
  .readdirSync(events_path)
  .filter((file) => file.endsWith(".js"));
for (const file of event_files) {
  const file_path = path.join(events_path, file);
  const event = require(file_path);
  if (event.once) {
    soupful.once(event.name, (...args) => event.execute(...args));
  } else {
    soupful.on(event.name, (...args) => event.execute(...args));
  }
}

soupful.login(process.env.TOKEN);
