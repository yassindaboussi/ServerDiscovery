const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const RequireLogin = require("../middleware/RequireLogin");

router.get("/all", RequireLogin, userController.index); // Show All Users
router.post("/signin", userController.signin); // Login
router.post("/singup", userController.signup); // SignUp
//
router.post("/SendConfirmEmail", userController.SendConfirmEmail); // Confirm Email
router.get("/VerifCodeEmail/:email/:codeVerif", userController.VerifCodeEmail); // Verif CodeEmail
//
router.post("/SendCodeForgot", userController.SendCodeForgot); //  Send FogetCode
router.post("/VerifCodeForgot", userController.VerifCodeForgot); //  Verif FogetCode
router.post("/ChangePasswordForgot", userController.ChangePasswordForgot); //  Change Password Forget
//

module.exports = router;
