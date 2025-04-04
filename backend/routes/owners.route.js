const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/owners.controller");

router.get("/", ownerController.getAllOwners);
router.post("/", ownerController.createOwner);
router.get("/getUsers", ownerController.getUser);
router.get("/summary", ownerController.getSummary);

router.put("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order status" });
  }
});

router.get("/getOrders", ownerController.getOrders);

module.exports = router;
