const express = require("express");
const router = express.Router();
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", [protect, getUserProfile]);
router.put("/profile", [protect, updateUserProfile]);
router.get("/:id", [protect, admin, getUserById]);
router.put("/:id", [protect, admin, updateUser]);
router.get("/", [protect, admin, getUsers]);
router.delete("/:id", [protect, admin, deleteUser]);
module.exports = router;
