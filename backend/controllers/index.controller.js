const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ownerModel = require("../models/owner.model");
const nodemailer = require("nodemailer");

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

module.exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Hello ${user.name || "User"},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error("Error in forgetPassword:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Token and password required." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
