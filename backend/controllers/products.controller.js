const products = require("../models/product.model");

module.exports.getAllProducts = async (_req, res) => {
  try {
    let result = await products.find({});
    res.status(200).json({ success: true, result });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "internal server error",
    });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    let result = await products.create(req.body);
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

module.exports.getAvailableProducts = async (req, res) => {
  let result = await products.find({ availability: true });
  res.status(200).json({
    success: true,
    result,
  });
};

module.exports.getDisountedProducts = async (req, res) => {
  let result = await products.find({ discount: { $gt: 0 } });
  res.status(200).json({
    success: true,
    result,
  });
};

module.exports.deleteProduct = async (req, res) => {
  let result = await products.findByIdAndDelete(req.params.id);
  res.json(result);
};
