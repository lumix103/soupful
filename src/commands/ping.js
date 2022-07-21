const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription('Relpies with "pong!"'),
  execute(interaction) {
    interaction.reply("pong!");
  },
};
