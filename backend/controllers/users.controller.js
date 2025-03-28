const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Product = require("../models/product.model");

module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const product_id = req.body.id;

    if (!product_id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const isExist = await User.findById(userId);
    if (!isExist) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!isExist.cart) {
      isExist.cart = [];
    }

    const existingProduct = isExist.cart.find(
      (item) => item.product_id && item.product_id.toString() === product_id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      isExist.cart.push({ product_id, quantity: 1 });
    }

    await isExist.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart: isExist.cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product_id");
    res.status(200).json({
      success: true,
      data: user.cart,
      userEmail: user.email,
      name: user.fullname,
      contact: user.contact,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports.deleteFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const updatedCart = user.cart.filter(
      (item) => item._id.toString() !== productId
    );

    if (updatedCart.length === user.cart.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Update the user's cart with the filtered list
    user.cart = updatedCart;

    // Save the updated user data
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: "internal server error",
    });
  }
};
