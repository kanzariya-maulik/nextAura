const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const { isAuthenticated } = require("../middlewares/user.isAuthenticated");

router.post("/addToCart", isAuthenticated, usersController.addToCart);
router.get("/cart",isAuthenticated, usersController.getCart);
router.delete("/cart/:id",isAuthenticated, usersController.deleteFromCart);
module.exports = router;
