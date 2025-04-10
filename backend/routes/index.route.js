const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");
const { isAuthenticated } = require("../middlewares/user.isAuthenticated");

router.post("/register", indexController.registerUser);

router.post("/login", indexController.loginUser);

router.get("/logout", isAuthenticated, indexController.logoutUser);

router.post("/forgetpassword", indexController.forgetPassword);
router.post("/resetpassword", indexController.resetPassword);
module.exports = router;