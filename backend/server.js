const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require()


dotenv.config();

connectDB();

const app = express();

app.use(express.json()); // parses json data in the body

app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.use("/api/products", productRoutes);

app.use(notFound);

// This runs every whenever a request is made
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
