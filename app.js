const express = require("express");
const app = express();
const eventsRoute = require("./routes/eventsRoute");
const connectDB = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/v3/app", eventsRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port} `));
  } catch (error) {
    console.log(error);
  }
};

start();
