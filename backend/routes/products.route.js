const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

router.get("/", productsController.getAllProducts);
router.post("/", productsController.createProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
