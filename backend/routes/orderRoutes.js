const express = require("express");
const router = express.Router();
const addOrderItems = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

// router.post('/login', authUser);
router.post("/", [protect, addOrderItems]);

module.exports = router;
