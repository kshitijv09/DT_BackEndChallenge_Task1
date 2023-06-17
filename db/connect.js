const { MongoClient } = require("mongodb");

const connectDB = (url) => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client.connect();
};

module.exports = connectDB;
