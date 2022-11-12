const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");
require("dotenv").config();

const soupful = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ],
});

soupful.commands = new Collection();

const commands_path = path.join(__dirname, "commands");
const command_files = fs
  .readdirSync(commands_path)
  .filter((file) => file.endsWith(".js"));

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

mongoose
  .connect(process.env.DB, {
    useUnifiedTopology: true,
    keepAlive: true,
  })
  .catch((err) => {
    console.log(`${err}`);
  });

soupful.login(process.env.BOT_TOKEN);
