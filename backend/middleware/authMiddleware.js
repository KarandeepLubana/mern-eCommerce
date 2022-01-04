const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //   console.log(req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("token found");

    try {
      // console.log("INSIDE 1");
      token = req.headers.authorization.split(" ")[1];
      // console.log("INSIDE 2", token, process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password"); // req.user will be accessible to all our protected routes

      // next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  next();
});

const admin = (req, res, next) => {
  console.log("IN ADMIN");
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, admin };
