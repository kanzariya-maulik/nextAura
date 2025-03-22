module.exports.addToCart = async (req, res) => {
  console.log("Token from Cookie:", req.cookies.token);
  res.json({ success: true, token: req.cookies.token });
};
