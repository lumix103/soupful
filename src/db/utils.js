const { GuildUser, User } = require("./schemas/userSchema");

module.exports.fetchUser = async function (userId, guildId) {
  let user = await User.findOne({ user_id: userId })
    .populate("guilds_data")
    .exec();
  if (!user) {
    user = new User();
    user.user_id = userId;
    let guildUser = new GuildUser({ guild_id: guildId });
    await guildUser.save();

    user.guilds_data.push(guildUser);

    await user.save();
    return user;
  } else {
    return user;
  }
};

module.exports.createGuildUser = async function (userId, guildId) {
  let user = await module.exports.fetchUser(userId, guildId);
  let guildUser = new GuildUser({ guild_id: guildId });
  await guildUser.save();
  user.guilds_data.push(guildUser);
  await user.save();
  return guildUser;
};

module.exports.fetchGuildUser = async function (userId, guildId) {
  let user = await module.exports.fetchUser(userId, guildId);

  let guild = user.guilds_data.find((data) => data.guild_id === guildId);

  if (!guild) {
    return await module.exports.createGuildUser(userId, guildId);
  } else {
    return guild;
  }
};

module.exports.updateExperience = async function (guildModel) {
  let guildUser = await GuildUser.findById(guildModel._id);
  guildUser.experience = guildUser.experience + 1;
  let level = (guildUser.experience - (guildUser.experience % 100)) / 100;
  guildUser.level = level === 0 ? 1 : level;
  guildUser.save();
};
