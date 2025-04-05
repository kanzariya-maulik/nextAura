const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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

module.exports.updateUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Update User
    user.fullname = req.body.fullname;
    user.address = req.body.address;
    user.email = req.body.email;
    user.country = req.body.country;
    user.pinCode = req.body.pinCode;
    user.contact = req.body.contact;

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports.order = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    const paymentId = req.body.paymentId;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required!",
      });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty. Cannot place an order!",
      });
    }

    // Move cart items to orders with payment ID
    user.orders.push({
      items: user.cart, // Copy all cart items
      paymentId: paymentId,
      orderDate: new Date(),
      amount: req.body.amount,
    });

    // Empty the cart after placing the order
    user.cart = [];

    // Save updated user data
    await user.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully!",
      order: user.orders[user.orders.length - 1], // Send latest order details
    });
  } catch (error) {
    console.error("Order Processing Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while placing the order.",
    });
  }
};

module.exports.getOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate({
      path: "orders.items.product_id",
      model: "Product",
      select: "name price image", // Fetch only required fields
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      orders: user.orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching orders.",
    });
  }
};

module.exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid old password.",
      });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while changing password.",
    });
  }
};
