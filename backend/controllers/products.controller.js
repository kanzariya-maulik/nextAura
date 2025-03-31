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

module.exports.getProduct = async (req, res) => {
  try {
    let result = await products.findById(req.params.id);
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
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
    let product = await products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(req.body);

    const {
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      availability,
    } = req.body;

    // Update image if a new one is uploaded
    if (req.file) {
      product.image = {
        filename: req.file.filename,
        url: req.file.path,
      };
    }

    // Update other product fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.discount = discount || product.discount;
    product.bgcolor = bgcolor || product.bgcolor;
    product.panelcolor = panelcolor || product.panelcolor;
    product.textcolor = textcolor || product.textcolor;
    product.availability =
      availability !== undefined ? availability : product.availability;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating product" });
  }
};
