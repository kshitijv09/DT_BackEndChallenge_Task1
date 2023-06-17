const express = require("express");
const app = express();
const eventsRoute = require("./routes/eventsRoute");
const connectDB = require("./db/connect");
require("dotenv").config();

const multer = require("multer");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v3/app", eventsRoute);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port} `));
  } catch (error) {
    console.log(error);
  }
};

start();
