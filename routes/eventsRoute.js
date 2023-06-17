const express = require("express");

const router = express.Router();
const events = require("../controllers/eventController");

router.route("/events").get(events.getEvent).post(events.addEvent);
router.route("/events/:id").get(events.getEvents);

module.exports = router;
