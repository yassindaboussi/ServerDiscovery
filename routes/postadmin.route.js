const express = require("express");
const router = express.Router();
const postController = require("../controllers/postadmin.controller");
const RequireLogin = require("../middleware/RequireLogin");
const CheckFolderUpload = require("../middleware/CheckFolderUpload");

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
    cb(null, "uploads/posts");
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

///////////////////////////////////////////////////////
router.get("/all", postController.index); // Show All
router.post("/SortbyRate", postController.SortbyRate);
router.post("/FindByCategory", postController.FindByCategory);

router.post(
  "/AddPostAdmin",
  CheckFolderUpload,
  upload.single("photo"),
  postController.AddPostAdmin
); // Upload Avatar

module.exports = router;
