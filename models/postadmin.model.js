const mongoose = require("mongoose");

const postadminSchema = mongoose.Schema({
  nom: {
    type: String,
    request: true,
  },
  lieux: {
    type: String,
    Request: true,
  },
  rate: {
    type: String,
    Request: true,
  },
  nbOfrate: {
    type: String,
    Request: true,
  },
  photo: {
    type: String,
    Request: true,
  },
  categorie: {
    type: String,
    Request: true,
  },
  description: {
    type: String,
    Request: true,
  },
  /* postedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },*/
});

const PostAdmin = mongoose.model("PostAdmin", postadminSchema);

module.exports = { PostAdmin };
