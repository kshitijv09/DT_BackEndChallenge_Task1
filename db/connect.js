const { MongoClient, ObjectId } = require("mongodb");

const connectDB = (url) => {
  /* if (!url.startsWith("mongodb://")) {
    throw new Error("Invalid MongoDB connection string");
  } */
  const urL =
    "mongodb+srv://kshitijv09:surajpura@cluster0.9yxaavh.mongodb.net/EventHandler?retryWrites=true&w=majority";
  const client = new MongoClient(urL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client.connect();
};

module.exports = connectDB;
