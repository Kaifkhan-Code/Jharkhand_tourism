const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const itineraryController = require("../controllers/itineraryController");

const router = express.Router();

router.use(isLoggedIn);
router.get("/", itineraryController.index);
router.post("/places/:placeId", itineraryController.add);
router.delete("/places/:placeId", itineraryController.remove);

module.exports = router;
