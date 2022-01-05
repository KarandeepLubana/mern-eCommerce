const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProducts,
  createProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router.put("/:id", [protect, admin, updateProducts]);
// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
router.get("/", getProducts);

router.post("/", [protect, admin, createProduct]);

// @desc     Fetch single product
// @route    GET /api/products/:id
// @acesss   Public
router.get("/:id", getProductById);

router.delete("/:id", [protect, admin, deleteProduct]);


module.exports = router;
