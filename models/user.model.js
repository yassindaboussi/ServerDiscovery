const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  codeVerif: {
    type: String,
    required: false,
  },
  codeForget: {
    type: String,
    required: false,
  },
  verified: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
