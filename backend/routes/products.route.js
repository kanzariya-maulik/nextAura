const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

router.get("/", productsController.getAllProducts);
router.get("/available", productsController.getAvailableProducts);
router.get("/discount", productsController.getDisountedProducts);
router.post("/", productsController.createProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;