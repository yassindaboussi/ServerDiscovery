const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  idPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostAdmin",
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const FavoritePost = mongoose.model("favoritePosts", favoriteSchema);

module.exports = { FavoritePost };
