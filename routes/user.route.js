const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
//
const RequireLogin = require("../middleware/RequireLogin");
const CheckFolderUpload = require("../middleware/CheckFolderUpload");
const CheckEmail = require("../middleware/CheckEmail");
//
var multer, storage, path, crypto;
multer = require("multer");
path = require("path");
crypto = require("crypto");
var fs = require("fs");
//
//configure multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
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

/*const upload = multer({
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
});*/
///////////////////////////////////////////////////////
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
  CheckFolderUpload,
  upload.single("image"),
  userController.UploadAvatarUser
); // Upload Avatar
//
router.post("/EditProfil", userController.EditProfil); //  Edit Profil
//

module.exports = router;
