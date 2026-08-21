const express = require("express");
const router = express.Router();
const assistantController = require("../controllers/assistantController");

router.get("/", assistantController.renderChat);
router.post("/", assistantController.ask);

module.exports = router;
