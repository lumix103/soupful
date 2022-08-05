// const { Greeting } = require("discord-canvas");
// const { MessageAttachment } = require("discord.js");
// TODO: Greeting class is not working as intended
// will need to find another alternative to discord-canvas
module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(member) {
    // const greet = new Greeting()
    //   .setAvatar(member.displayAvatarURL({ dynamic: false, format: "png" }))
    //   .setUsername(member.displayName)
    //   .setDiscriminator(member.discriminator)
    //   .setText("Welcome!");
    // greet.toAttachment().then((data) => {
    //   const attachment = new MessageAttachment(data, "welcome.png");
    //   member.guild.systemChannel.send({ files: [attachment] });
    // });
  },
};
