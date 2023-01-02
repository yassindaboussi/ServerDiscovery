const mongoose = require("mongoose");

const postuserSchema = mongoose.Schema({
  datepost: {
    type: String,
    request: true,
  },
  description: {
    type: String,
    Request: true,
  },
  photo: {
    type: String,
    Request: true,
  },
  postedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    Request: true,
  },
  avatar: {
    type: String,
    Request: true,
  },
  nblike: {
    type: String,
    Request: true,
  },
  reported: {
    type: String,
    Request: true,
  },
});

const PostUser = mongoose.model("PostUser", postuserSchema);

module.exports = { PostUser };
