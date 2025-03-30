const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res, next) => {
  // console.log(req.cookies.token);
  if (!req.cookies.token) {
    return res.status(401).json({
      message: "You are not authenticated",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};
