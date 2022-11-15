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
    // mood af
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
    )
    .addStringOption((option) =>
      option
        .setName("option_e")
        .setDescription("Type anything for your option")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("option_f")
        .setDescription("Type anything for your option")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("option_g")
        .setDescription("Type anything for your option")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("option_h")
        .setDescription("Type anything for your option")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("option_i")
        .setDescription("Type anything for your option")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("option_j")
        .setDescription("Type anything for your option")
        .setRequired(false)
    ),
  async execute(interaction) {
    const optionA = interaction.options.getString("option_a");
    const optionB = interaction.options.getString("option_b");
    const optionC = interaction.options.getString("option_c");
    const optionD = interaction.options.getString("option_d");
    const pollEmbed = new EmbedBuilder()
      .setColor(interaction.member.displayHexColor)
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

    for (let ch of "abcdefghij") {
      const option = interaction.options.getString("option_" + ch);
      if (option)
        pollEmbed.addFields({
          name: `option :regional_indicator_${ch}:`,
          value: option,
          inline: true,
        });
    }
    const message = await interaction.reply({
      embeds: [pollEmbed],
      fetchReply: true,
    });
    try {
      for (let ch of "abcdefghij") {
        const option = interaction.options.getString("option_" + ch);
        if (option)
          message.react(
            String.fromCodePoint(ch.toUpperCase().codePointAt(0) - 65 + 0x1f1e6)
          );
      }
    } catch (err) {
      console.log(err);
    }
  },
};
