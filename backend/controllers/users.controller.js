const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.addToCart = async (req, res) => {
  try {
    // Check if token exists
    if (!req.cookies.token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const userId = decoded.id;
    const product_id = req.body.id;

    // Check if product_id exists
    if (!product_id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    // Find user in database
    const isExist = await User.findById(userId);
    if (!isExist) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Initialize the cart if undefined (Failsafe)
    if (!isExist.cart) {
      isExist.cart = [];
    }

    // Find if product already exists in the cart
    const existingProduct = isExist.cart.find(
      (item) => item.product_id && item.product_id.toString() === product_id
    );

    if (existingProduct) {
      // If product exists, increase quantity
      existingProduct.quantity += 1;
    } else {
      // If product does not exist, add it to the cart
      isExist.cart.push({ product_id, quantity: 1 });
    }

    // Save the updated user cart
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
