const express = require("express");

const router = express.Router();
const events = require("../controllers/eventController");

router.route("/events").get(events.getEvents).post(events.addEvent);
router.route("/events/:id").put(events.updateEvent).delete(events.deleteEvent);

module.exports = router;
