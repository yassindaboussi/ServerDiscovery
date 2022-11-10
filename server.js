const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
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
mongoose
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
//////////////////////////////////////////////////////////////////////////////
app.use(express.json());
app.use(morgan("dev")); // Utiliser morgan
app.use(express.urlencoded({ extended: true })); // Pour analyser application/x-www-form-urlencoded
//////////////////////////////////////////////////////////////////////////////
////////////////////Routes
app.use("/api/user", require("./routes/user.route"));
//////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
