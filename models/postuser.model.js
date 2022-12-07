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
  video: {
    type: String,
    Request: true,
  },
  categorie: {
    type: String,
    Request: true,
  },
  postedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const PostUser = mongoose.model("PostUser", postuserSchema);

module.exports = { PostUser };
