const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");

router.post("/register", indexController.registerUser);

router.post("/login", indexController.loginUser);

module.exports = router;
