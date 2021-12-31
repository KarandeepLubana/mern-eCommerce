const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
// const Product = require("../models/productModels");

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log("REQUEST SEND");

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // res.send({
  //   email,
  //   password,
  // });
});

module.exports = authUser;
