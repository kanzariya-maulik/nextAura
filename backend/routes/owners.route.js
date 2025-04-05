const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/owners.controller");
const userModel = require("../models/user.model");

router.get("/", ownerController.getAllOwners);
router.post("/", ownerController.createOwner);
router.get("/getUsers", ownerController.getUser);
router.get("/summary", ownerController.getSummary);

router.put("/orders/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await userModel.findOne({ "orders._id": id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const order = user.orders.id(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found in user data" });
    }

    order.status = status;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/getOrders", ownerController.getOrders);
router.get("/getAllUsers", ownerController.getAllUsers);
router.delete("/getAllUsers/:id", ownerController.deleteUserById);

router.get("/user/:id", ownerController.getUserById);
router.put("/user/:id", ownerController.editUserById);
module.exports = router;
