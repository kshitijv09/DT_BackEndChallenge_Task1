const express = require("express");

const router = express.Router();
//const auth = require("../controllers/authController");

router.route("/events").get().post();
router.route("/events/:id").get().put().delete();
