const express = require("express");
const router = express.Router();
const postController = require("../controllers/postuser.controller");
const RequireLogin = require("../middleware/RequireLogin");

///////////////////////////////////////////////////////
router.get("/all", postController.index); // Show All Users
router.post("/AddPostUser", postController.AddPostUser);
router.post("/GetAllMyPost", postController.GetAllMyPost);

module.exports = router;
