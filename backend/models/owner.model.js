const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  gstin: String,
});

ownerSchema.methods.generateToken = function () {
  return jwt.sign({ email: this.email, id: this._id }, process.env.JWT_KEY);
};

ownerSchema.methods.hashPassword = async function (password) {
  let salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

ownerSchema.methods.matchPassword = function (inputPassword) {
  return bcrypt.compareSync(inputPassword, this.password);
};

module.exports = mongoose.model("Owner", ownerSchema);
