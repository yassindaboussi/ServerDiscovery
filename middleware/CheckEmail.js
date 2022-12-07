const { User } = require("../models/user.model");

function CheckEmail(req, res, next, fields) {
  const emailreq = req.body.email || req.query.email || req.param.email;
  const userMail = User.findOne({ email: emailreq }); //req.body.email.toLowerCase()
  console.log("===>>> " + JSON.stringify(fields));
  console.log("waaaaaaaaaaa" + req.body.email);
  if (!userMail) {
    return res.status(403).send("A Email is required for This Request!");
  } else {
    return next();
  }
}

module.exports = CheckEmail;
