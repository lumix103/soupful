const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prune")
    .setDescription(
      "Delete n amount of messages that are younger than 2 weeks."
    )
    .addIntegerOption((amount) =>
      amount
        .setName("amount")
        .setDescription(
          "How many do you messages to delete? NOTE: amount has to be within 2 and 100."
        )
        .setRequired(true)
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageChannels | PermissionFlagsBits.ManageMessages
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    if (amount < 2 && amount > 100) {
      return await interaction.reply({
        content: "The amount of messages has to be withn 2 or 100.",
        ephemeral: true,
      });
    }

    interaction.channel.bulkDelete(amount).catch(
      interaction.reply({
        content: "Sorry but I couldn't delete those messages.",
        ephemeral: true,
      })
    );
  },
};
