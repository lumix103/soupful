const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Make a simple poll.")
    .addStringOption((question) =>
      question
        .setName("question")
        .setDescription("Poll's questions")
        .setRequired(true)
    )
    .addStringOption((optionA) =>
      optionA
        .setName("option_a")
        .setDescription("Type anything for your option")
        .setRequired(false)
    )
    .addStringOption((optionB) =>
      optionB
        .setName("option_b")
        .setDescription("Type anything for your option")
        .setRequired(false)
    )
    .addStringOption((optionC) =>
      optionC
        .setName("option_c")
        .setDescription("Type anything for your option")
        .setRequired(false)
    )
    .addStringOption((optionD) =>
      optionD
        .setName("option_d")
        .setDescription("Type anything for your option")
        .setRequired(false)
    ),
  async execute(interaction) {
    // TODO:
    // Clean up options code
    // I don't want to make 25 variables and copy pastes for option_a,
    // option_b, option_c, ...
    const optionA = interaction.options.getString("option_a");
    const optionB = interaction.options.getString("option_b");
    const optionC = interaction.options.getString("option_c");
    const optionD = interaction.options.getString("option_d");
    const pollEmbed = new EmbedBuilder()
      .setColor(interaction.member.displayColor)
      .setTitle(interaction.options.getString("question"))
      .setAuthor({
        name: interaction.member.displayName + " asked ...",
        iconURL: interaction.member.displayAvatarURL(),
      })
      .setTimestamp()
      .setFooter({
        text: interaction.member.displayName,
        iconURL: interaction.member.displayAvatarURL(),
      });

    if (optionA)
      pollEmbed.addFields({
        name: `option :regional_indicator_a:`,
        value: optionA,
        inline: true,
      });
    if (optionB)
      pollEmbed.addFields({
        name: `option :regional_indicator_b:`,
        value: optionB,
        inline: true,
      });
    if (optionC)
      pollEmbed.addFields({
        name: `option :regional_indicator_c:`,
        value: optionC,
        inline: true,
      });
    if (optionD)
      pollEmbed.addFields({
        name: `option :regional_indicator_d:`,
        value: optionD,
        inline: true,
      });
    const message = await interaction.reply({
      embeds: [pollEmbed],
      fetchReply: true,
    });
    try {
      if (optionA)
        message.react(String.fromCodePoint("A".codePointAt(0) - 65 + 0x1f1e6));
      if (optionB)
        message.react(String.fromCodePoint("B".codePointAt(0) - 65 + 0x1f1e6));
      if (optionC)
        message.react(String.fromCodePoint("C".codePointAt(0) - 65 + 0x1f1e6));
      if (optionD)
        message.react(String.fromCodePoint("D".codePointAt(0) - 65 + 0x1f1e6));
    } catch (err) {
      console.log(err);
    }
  },
};
