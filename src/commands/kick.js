const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a user from the server.")
    .addUserOption((offender) =>
      offender
        .setName("offender")
        .setDescription("User to ban.")
        .setRequired(true)
    )
    .addStringOption((reason) =>
      reason
        .setName("reason")
        .setDescription("Reason for banning user.")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const offender = await interaction.guild.members.fetch(
      interaction.options.getUser("offender")
    );
    const reason = interaction.options.getString("reason");

    if (!offender)
      return await interaction.reply({
        content: "Offender does not exist.",
        ephemeral: true,
      });

    await offender
      .kick(
        `${interaction.member.displayName} kicked ${offender.displayName} because "${reason}"`
      )
      .then(() => {
        interaction.reply({
          content: "Kicked " + offender.displayName,
          ephemeral: true,
        });
      })
      .catch((err) => {
        interaction.reply({
          content: "Error: Failed to kick the user",
          ephemeral: true,
        });
      });
  },
};
