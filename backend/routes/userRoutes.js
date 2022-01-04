const express = require("express");
const router = express.Router();
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", [protect, getUserProfile]);
router.put("/profile", [protect, updateUserProfile]);
router.get("/", [protect, admin, getUsers]);

module.exports = router;
