require("dotenv").config();
const express = require("express");
require("express-async-errors");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const cars = require("./data/cars.json");
const router = require("./src/routes/index");
const {
  errorHandler,
  notFoundURLHandler,
} = require("./src/middlewares/errors");

//  Inisiasi express
const app = express();
const port = process.env.PORT || 4000;

// activate body parser/reader
app.use(express.json());

// we need to read form-body (body parser) if you want upload file
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024}, // 50 MB
  })
)

// routing
app.get("/", (req, res) => {
  res.status(200).json({
    message: "ping successfully",
  });
});

app.use("/", router);

// This function is for 404 handle URL
app.use("*", notFoundURLHandler);

// This function is to handle error when API hit, it always be the last middleware
app.use(errorHandler);

// Run the express.js application
app.listen(port, () => {
  console.log(`The express.js app is runing on port ${port}`);
});
