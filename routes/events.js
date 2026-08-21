const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/", eventController.index);
router.get("/:id", eventController.show);

module.exports = router;
