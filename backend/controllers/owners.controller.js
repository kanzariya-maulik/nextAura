const ownerModel = require("../models/owner.model");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");

module.exports.getAllOwners = async (_req, res) => {
  try {
    let result = await owner.find({});
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ error: "Not able to fetch Owners Data" });
  }
};

module.exports.getAllUsers = async (_req, res) => {
  try {
    const result = await userModel.find({});
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Not able to fetch Users Data" });
  }
};

module.exports.createOwner = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;
    console.log(ownerModel);

    let existingOwner = await ownerModel.find({ email });
    if (existingOwner) {
      return res.status(400).json({ error: "Email already exists" });
    }

    let owner = new ownerModel({ fullname, email });
    owner.password = await owner.hashPassword(password);
    let createdOwner = await owner.save();

    let token = owner.generateToken();
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    delete createdOwner._doc.password;
    return res.status(201).json({
      success: true,
      data: createdOwner,
    });
  } catch (error) {
    console.error("Error creating owner:", error);
    return res.status(500).json({ error: "Not able to create Owner Data" });
  }
};

module.exports.getUser = async (_req, res) => {
  try {
    let result = await userModel.find({}).populate({
      path: "orders.items.product_id",
      model: "Product",
      select: "name price image", // Fetch only required fields
    });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Not able to fetch User Data" });
  }
};

module.exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports.editUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
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

module.exports.getSummary = async (req, res) => {
  const allUsers = await userModel.find().populate({
    path: "orders.items.product_id",
    model: "Product",
    select: "price",
  });
  const allProducts = await productModel.find();
  const totalOrders = allUsers.reduce(
    (sum, user) => sum + user.orders.length,
    0
  );
  const totalRevenue = allUsers.reduce((sum, user) => {
    return (
      sum + user.orders.reduce((orderSum, order) => orderSum + order.amount, 0)
    );
  }, 0);

  res.status(200).json({
    success: true,
    data: {
      totalUsers: allUsers.length,
      totalProducts: allProducts.length,
      totalRevenue,
      totalOrders,
    },
  });
};

module.exports.getOrders = async (req, res) => {
  try {
    const allOrders = await userModel.find().select("orders").populate({
      path: "orders.items.product_id",
      model: "Product",
      select: "-__v", // Exclude only __v field, include everything else
    });

    res.status(200).json({
      success: true,
      data: allOrders.map((user) => user.orders).flat(), // Flatten the orders array
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

module.exports.deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await userModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
