const { SlashCommandBuilder } = require("@discordjs/builders");
const { Rank } = require("canvacord");
const { AttachmentBuilder } = require("discord.js");
const { fetchGuildUser } = require("../db/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Show off your level with this command."),
  async execute(interaction) {
    console.log("stats");
    let guildUser = await fetchGuildUser(
      interaction.member.id,
      interaction.guildId
    );
    const rank = new Rank()
      .setAvatar(
        interaction.user.displayAvatarURL({ dynamic: false, format: "png" })
      )
      .setCurrentXP(guildUser.experience)
      .setLevel(guildUser.level)
      .setRequiredXP(100)
      .setStatus("online")
      .setProgressBar("#FFFFFF", "COLOR")
      .setUsername(interaction.user.username)
      .setDiscriminator(interaction.user.discriminator);

    rank.build().then((data) => {
      const attachment = new AttachmentBuilder(data, { name: "rank_card.png" });
      interaction.reply({ files: [attachment] });
    });
  },
};
