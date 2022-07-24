const { execute } = require("./ready");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    soupful = interaction.client;
    if (!interaction.isCommand()) return;
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
