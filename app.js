const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();

const multer = require("multer");
const upload = multer();

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
