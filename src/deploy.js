/**
 * Most of this command is grabbed from the
 * Discord.js guide.
 * https://discordjs.guide/creating-your-bot/creating-commands.html#registering-commands
 */

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const path = require("node:path");
const fs = require("node:fs");
require("dotenv").config();

const commands = [];
const command_paths = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(command_paths)
  .filter((file) => file.endsWith(".js"));

/**
 *  For convenience add the bot's client id
 *  and the guild's id you want to
 *  update into the env file.
 *  If no guild id is provided then commands
 *  will update globaly.
 */

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

if (guildId == null) {
  (async () => {
    try {
      console.log("Started refreshing application (/) commands.");
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      });
      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  })();
} else {
  rest
    .put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}
