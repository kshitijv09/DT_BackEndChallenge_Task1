const connectDB = require("../db/connect");
const { ObjectId } = require("mongodb");
const multer = require("multer");
const upload = multer().single("image");
/* const getSingleEvent = async (req, res) => {
  const client = await connectDB();
  const db = client.db("EventHandler"); // Replace with your database name

  const collection = db.collection("events");

  const eventId = req.query.id;

  try {
    const event = await collection.findOne({ _id: new ObjectId(eventId) });
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    res.json(event);
  } catch (error) {
    console.error("Failed to get event:", error);
    res.status(500).json({ error: "Failed to get event" });
  }
}; */

const getEvents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const eventId = req.query.id || null;
  const type = req.query.type || "latest";

  try {
    const client = await connectDB();
    const db = client.db("EventHandler"); // Replace with your database name

    const collection = db.collection("events");

    const totalCount = await collection.countDocuments();

    let query = {};

    if (eventId) {
      query = await collection.findOne({ _id: new ObjectId(eventId) });
      res.json({ query });
    } else {
      if (type === "latest") {
        query = collection.find().sort({ schedule: -1 });
      } else {
        query = collection.find();
      }

      const totalPages = Math.ceil(totalCount / limit);

      const events = await query
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();

      res.json({
        events,
        currentPage: page,
        totalPages,
      });
    }
  } catch (error) {
    console.error("Failed to get events:", error);
    res.status(500).json({ error: "Failed to get events" });
  }
};

const addEvent = async (req, res) => {
  try {
    await upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred during file uploading
        console.error("Multer Error:", err);
        res.status(400).json({ error: "Error uploading file" });
        return;
      } else if (err) {
        // An unknown error occurred during file uploading
        console.error("Unknown Error:", err);
        res.status(500).json({ error: "Failed to upload file" });
        return;
      }

      const client = await connectDB();
      const db = client.db("EventHandler"); // Replace with your database name

      const collection = db.collection("events");

      const eventData = {
        type: "event",
        uid: 18,
        name: req.body.name,
        tagline: req.body.tagline,
        schedule: new Date(req.body.schedule),
        description: req.body.description,
        files: {
          image: req.file.buffer,
        },
        moderator: req.body.moderator,
        category: req.body.category,
        sub_category: req.body.sub_category,
        rigor_rank: parseInt(req.body.rigor_rank, 10),
        attendees: req.body.attendees,
      };

      /* try {
    if (!eventData.name) {
      throw new Error("Name is required.");
    }

    if (!eventData.schedule || isNaN(eventData.schedule.getTime())) {
      throw new Error("Invalid schedule date.");
    }

    if (!eventData.description) {
      throw new Error("Description is required.");
    }

    if (!eventData.moderator) {
      throw new Error("Moderator is required.");
    }

    if (!eventData.category) {
      throw new Error("Category is required.");
    }

    if (!eventData.sub_category) {
      throw new Error("Sub-category is required.");
    }

    if (!eventData.rigor_rank || isNaN(eventData.rigor_rank)) {
      throw new Error("Invalid rigor rank.");
    }

    if (!Array.isArray(eventData.attendees)) {
      throw new Error("Attendees must be an array.");
    } */

      await collection.insertOne(eventData);
      res.json({ msg: "Item Updated" });
    });
  } catch (error) {
    console.error("Failed to create event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

const updateEvent = async (req, res) => {
  const client = await connectDB();
  const db = client.db("EventHandler"); // Replace with your database name

  const collection = db.collection("events");

  const eventId = req.params.id;
  const eventData = req.body;
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(eventId) },
      { $set: eventData }
    );
    res.json({ name: result.name });
  } catch (error) {
    console.error("Failed to update event:", error);
    res.status(500).json({ error: "Failed to update event" });
  }
};

const deleteEvent = async (req, res) => {
  const client = await connectDB();
  const db = client.db("EventHandler"); // Replace with your database name

  const collection = db.collection("events");

  const eventId = req.params.id;

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(eventId) });
    res.json({ result });
  } catch (error) {
    console.error("Failed to delete event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

module.exports = { getEvents, updateEvent, addEvent, deleteEvent };
