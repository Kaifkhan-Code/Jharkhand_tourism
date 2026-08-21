const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");
const isLoggedIn = require("../middleware/isLoggedIn");
const { uploadReviewPhoto } = require("../utils/reviewUpload");

router.get("/", placeController.index);
router.get("/discover", isLoggedIn, placeController.discover);
router.get("/suggest", isLoggedIn, placeController.renderSuggestionForm);
router.post("/suggest", isLoggedIn, placeController.submitSuggestion);
router.get("/:id", placeController.show);
router.post("/:id/reviews", isLoggedIn, uploadReviewPhoto.single("photo"), placeController.submitReview);
router.post("/:id/visit", isLoggedIn, placeController.markVisited);
router.delete("/:id/visit", isLoggedIn, placeController.unmarkVisited);

module.exports = router;
