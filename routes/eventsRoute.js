const express = require("express");

const router = express.Router();
const events = require("../controllers/eventController");

router.route("/events").get(events.getEvents).post(events.addEvent);
/* router.route("/events/:id").get(); */

module.exports = router;
