const { Events } = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    channel = member.guild.channels.cache.find(
      (chan) => chan.name.toLowerCase() === "welcome"
    );

    if (!channel) {
      return;
    }

    channel.send(`Welcome ${member.user.username} to the server!`);
  },
};
