const express = require("express");

const router = express.Router();
const events = require("../controllers/eventController");

router.route("/events").post(events.addEvent);
//router.route("/events/:id");

module.exports = router;
