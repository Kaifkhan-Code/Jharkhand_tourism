const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", isLoggedIn, dashboardController.customer);
router.get("/admin", isAdmin, dashboardController.admin);
router.post("/admin/submissions/:id/approve", isAdmin, dashboardController.approveSubmission);
router.post("/admin/submissions/:id/reject", isAdmin, dashboardController.rejectSubmission);
router.post("/admin/reviews/:id/approve", isAdmin, dashboardController.approveReview);
router.post("/admin/reviews/:id/reject", isAdmin, dashboardController.rejectReview);
router.get("/admin/reviews/:id/photo", isAdmin, dashboardController.reviewPhoto);

module.exports = router;
