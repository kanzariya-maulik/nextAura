const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  cart: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
  contact: {
    type: String,
  },
  image: {
    filename: String,
    url: String,
  },
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ email: this.email, id: this._id }, process.env.JWT_KEY);
};

userSchema.methods.hashPassword = async function (password) {
  let salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = function (inputPassword) {
  return bcrypt.compareSync(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
