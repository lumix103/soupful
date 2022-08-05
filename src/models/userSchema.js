const { Schema, default: mongoose, model } = require("mongoose");

const GuildUserSchema = new Schema({
  guild_id: {
    type: String,
    require: true,
    unique: true,
  },
  experience: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
});

const UserSchema = new Schema({
  user_id: {
    type: String,
    require: true,
    unique: true,
  },
  guilds_data: {
    type: [GuildUserSchema],
    default: undefinded,
  },
});

const User = model("point_user", UserSchema);

module.exports = User;
