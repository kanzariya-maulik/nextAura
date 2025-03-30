const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const multer = require("multer");
const { storage } = require("../utils/cloudConfig");
const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept the file if it's an image
    } else {
      cb(new Error("Only image files are allowed"), false); // Reject the file if it's not an image
    }
  },
});

router.get("/", productsController.getAllProducts);
router.post("/",upload.single("image"), productsController.createProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;