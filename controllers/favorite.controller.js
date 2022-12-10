const { FavoritePost } = require("../models/favorite.model");
const { PostAdmin } = require("../models/postadmin.model");
var ObjectId = require("mongodb").ObjectID;
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const AddFavorite = async (req, res, next) => {
  const { idPost, idUser } = req.body;
  if (!idPost || !idUser) {
    res.json({ error: "please add all the feilds" });
  }
  //
  FavoritePost.findOne({
    idPost: req.body.idPost,
    idUser: req.body.idUser,
  }).then((pannn) => {
    if (pannn) {
      res.status(200).json({ message: "Favories Already Exist!" });
    } else {
      const postData = new FavoritePost({
        idPost: idPost,
        idUser: idUser,
      });
      postData
        .save()
        .then((user) => {
          res.status(200).json({ message: "Favories Has Been Added!" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const FavoritefindByUser = (req, res) => {
  FavoritePost.find({ idUser: req.body.idUser }).exec(function (
    err,
    dataFavorite
  ) {
    if (err) res.status(500).send(err);
    //else res.send(data);
    else {
      //data.idPost;
      //res.status(200).send(data[0].idPost.toString());
      //console.log(dataFavorite);
      //console.log(dataFavorite.length);
      let total = "";
      const List = [];
      if (dataFavorite.length > 0) {
        for (let i = 0; i < dataFavorite.length; i++) {
          total = dataFavorite[i].idPost.toString();
          console.log(total);
          List.push(total);
        }
        console.log(List);
        var obj_ids = List.map(function (id) {
          return ObjectId(id);
        });
        // db.test.find({ _id: { $in: obj_ids } });
        PostAdmin.find({ _id: { $in: obj_ids } }).exec(function (
          err,
          dataPosts
        ) {
          if (err) res.status(500).send(err);
          else res.send(dataPosts);
        });
      }
    }
  });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const FavoriteDelete = (req, res) => {
  FavoritePost.findOneAndRemove(
    { idPost: req.body.idPost, idUser: req.body.idUser },
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).json({ message: "Favoris Has been Deleted!" });
    }
  );
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const VerifFavorite = async (req, res, next) => {
  const { idPost, idUser } = req.body;
  if (!idPost || !idUser) {
    res.json({ error: "please add all the feilds" });
  }
  //
  FavoritePost.findOne({
    idPost: req.body.idPost,
    idUser: req.body.idUser,
  }).then((pannn) => {
    if (pannn) {
      res.status(200).json({ message: "Exist!" });
    } else {
      res.status(201).json({ message: "Not Exist!" });
    }
  });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
module.exports = {
  AddFavorite,
  FavoritefindByUser,
  FavoriteDelete,
  VerifFavorite,
};
