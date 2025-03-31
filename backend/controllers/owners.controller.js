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
