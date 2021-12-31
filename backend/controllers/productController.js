const asyncHandler = require("express-async-handler");
const Product = require("../models/productModels");

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // throw new Error("Some Error");
  res.json(products);
});

// @desc     Fetch single product
// @route    GET /api/products/:id
// @acesss   Public
const getProductById = asyncHandler(async (req, res) => {
  //   const product = products.find((product) => product._id === req.params.id);
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    // res.status(404).json({ message: "Product not found" });
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = { getProducts, getProductById };
