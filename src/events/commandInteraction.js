const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    soupful = interaction.client;
    if (!interaction.isChatInputCommand()) return;
    const command = soupful.commands.get(interaction.commandName);
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
    if (!command) {
      return;
    }
  },
};
