const { Events } = require("discord.js");
const { fetchUser, createGuildUser, updateExperience } = require("../db/utils");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    let user = await fetchUser(message.member.id, message.guildId);
    let guild = user.guilds_data.find(
      (data) => data.guild_id === message.guildId
    );
    if (!guild) {
      createGuildUser(message.member.id, message.guildId);
    } else {
      updateExperience(guild);
    }
  },
};
