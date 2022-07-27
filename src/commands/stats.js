const { SlashCommandBuilder } = require("@discordjs/builders");
const { Rank } = require("canvacord");
const { MessageAttachment } = require("discord.js");

// TODO: stats command is not finished
// need to add connection to database
// to store and update the user's xp.
// This is here to have something reply back
// in the meantime

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Show off your level with this command."),
  async execute(interaction) {
    const rank = new Rank()
      .setAvatar(
        interaction.user.displayAvatarURL({ dynamic: false, format: "png" })
      )
      .setCurrentXP(0)
      .setRequiredXP(100)
      .setStatus("online")
      .setProgressBar("#FFFFFF", "COLOR")
      .setUsername(interaction.user.username)
      .setDiscriminator(interaction.user.discriminator);

    rank.build().then((data) => {
      const attachment = new MessageAttachment(data, "rank_card.png");
      interaction.reply({ files: [attachment] });
    });
  },
};
