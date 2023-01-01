const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
var bodyParser = require("body-parser");
//const socketIO = require("socket.io");
var fs = require("fs");
const path = require("path");
//////////////////////////////////////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT || 9090;
//const databaseName = "DiscoveryBD";
//////////////////////////////////////////////////////////////////////////////
const dotenv = require("dotenv"); // Fichier .env (All My Secret Key)
dotenv.config();
//////////////////////////////////////////////////////////////////////////////
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
//////////////////////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//////////////////////////////////////////////////////////////////////////////
//console.log(__dirname + "/uploads");
/*mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+");
    console.log("MongoDB Database is connected!");
    console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+");
  })
  .catch((ex) => {
    console.log(ex);
    console.log("Unable to connect to database");
  });
*/
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
//////////////////////////////////////////////////////////////////////////////
app.use(express.json());
app.use(morgan("dev")); // Utiliser morgan
app.use(express.urlencoded({ extended: true })); // Pour analyser application/x-www-form-urlencoded
//////////////////////////////////////////////////////////////////////////////
////////////////////Routes
app.use("/api/user", require("./routes/user.route"));
app.use("/api/postuser", require("./routes/postuser.route"));
app.use("/api/postadmin", require("./routes/postadmin.route"));
app.use("/api/favorite", require("./routes/favorite.route"));
/////////////////// Default Page

/////////////////// http://localhost:9090/imaguser/image-1668355834015.jpg
app.use("/imaguser", express.static(path.join(__dirname, "uploads", "users"))); //
app.use("/imgPosts", express.static(path.join(__dirname, "uploads", "posts"))); //
/////////////////////////////////////////////////////////////////////////
/*const listingPath = path.join(__dirname, "uploads", "users");
app.get("*", (req, res) => {
  // Build the path of the file using the URL pathname of the request.
  const filePath = path.join(listingPath, req.path);
  // If the path does not exist, return a 404.
  if (!fs.existsSync(filePath)) {
    return res.status(404).end();
  }
  // Check if the existing item is a directory or a file.
  if (fs.statSync(filePath).isDirectory()) {
    const filesInDir = fs.readdirSync(filePath);
    // If the item is a directory: show all the items inside that directory.
    return res.send(filesInDir);
  } else {
    const fileContent = fs.readFileSync(filePath, "utf8");
    // If the item is a file: show the content of that file.
    return res.send(fileContent);
  }
});*/
//////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.json({ message: "Are You Ready?" });
});
//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})
