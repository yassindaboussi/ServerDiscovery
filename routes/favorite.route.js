const express = require("express");
const router = express.Router();
const FavoriteController = require("../controllers/favorite.controller");

router.post("/AddFavorite", FavoriteController.AddFavorite);
router.post("/FavoritefindByUser", FavoriteController.FavoritefindByUser);
router.post("/FavoriteDelete", FavoriteController.FavoriteDelete);
//

module.exports = router;
