const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = async function isLoggedIn(req, res, next) {
  if (!req.cookies.token) {
    res.status(400).json({ error: "you need to login first" });
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_TOKEN);
    let user = userModel.findOne({ email: decoded.email }).select("-password");
    req.user = user;
    next();
  } catch (e) {
    res.status(400).json({ error: "invalid token" });
  }
};
