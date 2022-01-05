const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

// router.post('/login', authUser);
router.get("/myorders", [protect, getMyOrders]);
router.post("/", [protect, addOrderItems]);
router.get("/:id", [protect, getOrderById]);
router.put("/:id/pay", [protect, updateOrderToPaid]);
router.put("/:id/deliver", [protect, admin, updateOrderToDelivered]);
router.get("/", [protect, admin, getOrders]);

module.exports = router;
