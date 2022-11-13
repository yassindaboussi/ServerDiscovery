const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
//
const RequireLogin = require("../middleware/RequireLogin");
const multer = require("multer");
//
//configure multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    // cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 9000000, // Max 9 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});
///////////////////////////////////////////////////////
////Image

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
router.post(
  "/UploadAvatarUser",
  upload.single("image"),
  userController.UploadAvatarUser
); // Show All Users

module.exports = router;
