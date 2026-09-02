const express = require("express");
const router = express.Router();
const discoverExternalController = require("../controllers/discoverExternalController");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, discoverExternalController.search);
router.post("/import", isLoggedIn, discoverExternalController.importPlace);

module.exports = router;