const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const RequireLogin = require("../middleware/RequireLogin");

router.get("/all", RequireLogin, userController.index); // Show All Users
router.post("/signin", userController.signin); // Login
router.post("/singup", userController.signup); // SignUp
//
router.post("/SendConfirmEmail", userController.SendConfirmEmail); // Confirm Email
router.get("/VerifCodeEmail/:email/:codeVerif", userController.VerifCodeEmail); // VerifCode Email
//
router.post("/SendFogetCode", userController.SendFogetCode); //  Send FogetCode

module.exports = router;
