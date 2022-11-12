const { Schema, model } = require("mongoose");

const GuildUserSchema = new Schema({
  guild_id: {
    type: String,
    required: true,
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

const GuildUser = model("point_guild_user", GuildUserSchema);

const UserSchema = new Schema({
  user_id: {
    type: String,
    require: true,
    unique: true,
  },
  guilds_data: {
    type: [{ type: Schema.Types.ObjectId, ref: "point_guild_user" }],
  },
});

const User = model("point_user", UserSchema);

module.exports = { User, GuildUser };
