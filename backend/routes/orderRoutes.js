const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

// router.post('/login', authUser);
router.get("/myorders", [protect, getMyOrders]);
router.post("/", [protect, addOrderItems]);
router.get("/:id", [protect, getOrderById]);
router.put("/:id/pay", [protect, updateOrderToPaid]);

module.exports = router;
