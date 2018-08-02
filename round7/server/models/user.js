const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
  isAdult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }]
});

UserSchema.statics.format = user => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    isAdult: user.isAdult,
    blogs: user.blogs
  };
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
