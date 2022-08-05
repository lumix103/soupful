const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user from the server.")
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
    .addIntegerOption((days) =>
      days
        .setName("days")
        .setDescription(
          "Number of days of messages to delete, must be between 0 and 7, inclusive"
        )
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const offender = await interaction.guild.members.fetch(
      interaction.options.getUser("offender")
    );
    const reason = interaction.options.getString("reason");
    const days = interaction.options.getInteger("days");

    if (!offender)
      return await interaction.reply({
        content: "Offender does not exist.",
        ephemeral: true,
      });
    // According to the discordjs documentation
    // days has to be within 0 and 7
    // https://discord.js.org/#/docs/discord.js/main/typedef/BanOptions
    if (days != null || (days < 0 && days > 7))
      return await interaction.reply({
        content:
          "Number of days of messages to delete, must be between 0 and 7, inclusive",
        ephemeral: true,
      });

    await offender
      .ban({
        days: days,
        reason: `${interaction.member.displayName} banned ${offender.displayName} because "${reason}"`,
      })
      .then(() => {
        interaction.reply({
          content: "Banned " + offender.displayName,
          ephemeral: true,
        });
      })
      .catch((err) => {
        interaction.reply({
          content: "Error: Failed to ban the user",
          ephemeral: true,
        });
      });
  },
};
