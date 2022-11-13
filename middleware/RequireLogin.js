const jwt = require("jsonwebtoken");

function RequireLogin(req, res, next) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for This Request!");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_Key);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}

module.exports = RequireLogin;
