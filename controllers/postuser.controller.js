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
  const { description, postedby, username, avatar } = req.body;
  if (!description || !postedby) {
    res.json({ error: "please add all the feilds" });
  }
  const file = req.file;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      console.log("error", "Please upload a file");
      res.send({ code: 500, msg: "Please upload a file" });
      return next({ code: 500, msg: error });
    }
    //res.send({ code: 200, msg: file.filename });
    console.log(file.filename);
    ///////////////////////////////////////////////////////////////////////////////
    console.log(req.body.description);
    console.log(req.body.postedby);
    console.log(req.body.username);
    console.log(req.body.avatar);

    //
    //console.log(new Date().toISOString().replace("T", " ").substring(0, 19));
    var CurrentDate = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);

    const postData = new PostUser({
      datepost: CurrentDate,
      description: description,
      photo: file.filename,
      postedby: postedby,
      username: username,
      avatar: avatar,
      nblike: "",
      reported: "NO",
    });
    postData
      .save()
      .then((user) => {
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

const deletepost = (req, res) => {
  var id = req.body._id;
  PostUser.findOneAndDelete({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      return res.status(202).json({ message: "Error" });
    }
    return res.status(200).json({ message: "Has Been Deleted!" });
  });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const updatepost = (req, res) => {
  let updatethis = {
    id: req.body._id,
    description: req.body.description,
  };
  console.log(updatethis);
  PostUser.findByIdAndUpdate(req.body._id, { $set: updatethis })
    .then(() => {
      res.json({ message: "The Post updated successfully" });
    })
    .catch((error) => {
      res.json({
        message: "an error occured when updating Post",
      });
    });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const reportThispost = (req, res) => {
  let updatethis = {
    id: req.body._id,
    reported: "YES",
  };
  console.log(updatethis);
  PostUser.findByIdAndUpdate(req.body._id, { $set: updatethis })
    .then(() => {
      res.json({ message: "Reported successfully" });
    })
    .catch((error) => {
      res.json({
        message: "an error occured when Report Post",
      });
    });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const GetReportedPost = (req, res) => {
  //try {
  PostUser.find({ reported: "YES" }).exec(function (err, data) {
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
const CancelReport = (req, res) => {
  let updatethis = {
    id: req.body._id,
    reported: "NO",
  };
  console.log(updatethis);
  PostUser.findByIdAndUpdate(req.body._id, { $set: updatethis })
    .then(() => {
      res.json({ message: "Reported Has been Canceled" });
    })
    .catch((error) => {
      res.json({
        message: "an error occured when Cancel Report Post",
      });
    });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
module.exports = {
  index,
  AddPostUser,
  GetAllMyPost,
  deletepost,
  updatepost,
  reportThispost,
  GetReportedPost,
  CancelReport,
};
