const connectDB = require("../db/connect");

const getEvents = async (req, res) => {
  const db = await connectDB();
  const collection = db.collection("events");
  const eventId = req.params.id;

  try {
    const event = await collection.findOne({ _id: ObjectId(eventId) });
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    res.json(event);
  } catch (error) {
    console.error("Failed to get event:", error);
    res.status(500).json({ error: "Failed to get event" });
  }
};

const addEvent = async (req, res) => {
  const client = await connectDB();
  const db = client.db("EventHandler"); // Replace with your database name

  const collection = db.collection("events");

  const eventData = {
    /* type: "event", */
    name: req.body.name,
  };

  try {
    const result = await collection.insertOne(eventData);
    res.json({ id: result.insertedId });
  } catch (error) {
    console.error("Failed to create event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

module.exports = { getEvents, addEvent };
