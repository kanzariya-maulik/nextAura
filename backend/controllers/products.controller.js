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
    let newProduct = await products(req.body);
    let url = req.file.path;
    let filename = req.file.filename;
    newProduct.image.filename = filename;
    newProduct.image.url = url;
    const result = await newProduct.save();
    res.status(200).json({ success: true, result });
  } catch (err) { 
    console.log(err);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    let result = await products.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports.editProduct = async (req, res) => {
  try {
    let result = await products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
