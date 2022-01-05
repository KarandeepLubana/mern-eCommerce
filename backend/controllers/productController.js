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

// @desc     Delete a product
// @route    DELETE /api/products/:id
// @acesss   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  //   const product = products.find((product) => product._id === req.params.id);
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    // res.status(404).json({ message: "Product not found" });
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc     Create a product
// @route    POST /api/products/
// @acesss   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  //   const product = products.find((product) => product._id === req.params.id);
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc     Update a product
// @route    PUT /api/products/:id
// @acesss   Private/Admin
const updateProducts = asyncHandler(async (req, res) => {
  //   const product = products.find((product) => product._id === req.params.id);
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProducts,
};
