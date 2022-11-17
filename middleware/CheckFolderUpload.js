var fs = require("fs");

function CheckFolderUpload(req, res, next) {
  var dir = "./" + "uploads" + "/";
  var dir1 = "./" + "uploads" + "/" + "users" + "/";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log("Creat uploads!");
  } else {
   // console.log("Dir uploads Exist!");
  }
  if (!fs.existsSync(dir1)) {
    fs.mkdirSync(dir1);
    console.log("Creat uploads/user!");
  } else {
  //  console.log("Dir uploads/user Exist!");
  }
  return next();
}

module.exports = CheckFolderUpload;
