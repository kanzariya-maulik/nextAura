const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const ownerModel = require("../models/owner.model");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    let user = new userModel({ fullname, email });
    user.password = await user.hashPassword(password);
    let createdUser = await user.save();

    let token = user.generateToken();
    const isProduction = process.env.NODE_ENV === "production"; // Check environment
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    delete createdUser._doc.password;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: createdUser,
      token,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json({ success: false, message: "Error creating user" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    let isOwner = false;

    if (!user) {
      user = await ownerModel.findOne({ email });
      isOwner = !!user;
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account doesn't exist, please create an account",
      });
    }

    let isValidPassword = await user.matchPassword(password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    let token = user.generateToken();
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    delete user._doc.password;
    res.status(200).json({
      success: true,
      message: isOwner
        ? "Owner logged in successfully"
        : "User logged in successfully",
      user,
      token,
      role: isOwner ? "owner" : "user",
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ success: false, message: "Error logging in" });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      expires: new Date(0),
    });
    res.status(200).json({ success: true, message: "Logout successfully" });
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json({ success: false, message: "Error logging out user" });
  }
};
