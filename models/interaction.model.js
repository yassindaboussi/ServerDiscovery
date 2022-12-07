const mongoose = require("mongoose");

const interactionPostsSchema = mongoose.Schema({
  rate: {
    type: String,
    Request: true,
  },
  nbOfrate: {
    type: String,
    Request: true,
  },
  commetaire: {
    type: String,
    Request: true,
  },
  /* postedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },*/
});

const interactionPosts = mongoose.model(
  "interactionPosts",
  interactionPostsSchema
);

module.exports = { interactionPosts };
