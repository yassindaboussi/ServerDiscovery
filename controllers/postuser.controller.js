const { PostUser } = require("../models/postuser.model");
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const index = (req, res) => {
  PostUser.find({})
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
const AddPostUser = async (req, res, next) => {
  const { datepost, description, photo, video, postedby, categorie } = req.body;
  if (
    !datepost ||
    !description ||
    !photo ||
    !video ||
    !postedby ||
    !categorie
  ) {
    res.json({ error: "please add all the feilds" });
  }
  try {
    console.log(req.body.datepost);
    console.log(req.body.description);
    console.log(req.body.photo);
    console.log(req.body.video);
    console.log(req.body.postedby);
    console.log(req.body.categorie);
    //
    //console.log(new Date().toISOString().replace("T", " ").substring(0, 19));
    var CurrentDate = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);

    const postData = new PostUser({
      datepost: CurrentDate,
      description: description,
      photo: photo,
      video: video,
      postedby: postedby,
      categorie: categorie,
    });
    postData
      .save()
      .then((user) => {
        // res.json({ message: "SignUp Done!" });
        res.status(202).json({ message: "Post Has Added!" });
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
const GetAllMyPost = (req, res) => {
  //try {
  console.log("====>>>>>>>>>>>> " + req.body.postedby);
  PostUser.find({ postedby: req.body.postedby }).exec(function (err, data) {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
  /*} catch (err) {
    res.status(500).json(err);
  }*/
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
module.exports = {
  index,
  AddPostUser,
  GetAllMyPost,
};
