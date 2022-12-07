const { PostAdmin } = require("../models/postadmin.model");
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const index = (req, res) => {
  PostAdmin.find({})
    .sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) res.status(500).send(err);
      if (data.length == 0) {
        res.json({ message: "There is No Posts Yet" });
      } else res.send(data);
    });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const SortbyRate = (req, res) => {
  // SHOW All  POSTS
  PostAdmin.find({})
    .sort({ rate: -1 })
    .exec(function (err, data) {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const AddPostAdmin = async (req, res, next) => {
  const { nom, lieux, categorie, description } = req.body;
  if (!nom || !lieux || !categorie || !description) {
    res.json({ error: "please add all the feilds" });
  }
  //
  const file = req.file;
  //
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    console.log("error", "Please upload a file");
    res.send({ code: 500, msg: "Please upload a file" });
    return next({ code: 500, msg: error });
  }
  //
  console.log(file.filename);
  var nomImage = file.filename;
  //
  try {
    const postData = new PostAdmin({
      nom: nom,
      lieux: lieux,
      rate: "0",
      photo: nomImage,
      categorie: categorie,
      description: description,
    });
    postData
      .save()
      .then((user) => {
        res.status(202).json({ message: "Post Has Added By Admin!" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const FindByCategory = (req, res) => {
  // SHOW All  POSTS
  PostAdmin.find({ categorie: req.body.categorie }).exec(function (err, data) {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
};
module.exports = {
  index,
  SortbyRate,
  AddPostAdmin,
  FindByCategory,
};
