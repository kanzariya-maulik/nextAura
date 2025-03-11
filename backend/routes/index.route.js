const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");
const userValidate = require("../middlewares/user.validate");

router.post("/register",userValidate,indexController.registerUser);

router.post("/login",indexController.loginUser);

module.exports = router;