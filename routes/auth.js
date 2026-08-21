const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/signup", authController.renderSignup);
router.post("/signup", authController.signup);

router.get("/login", authController.renderLogin);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  authController.login
);

router.get("/preferences", isLoggedIn, authController.renderPreferences);
router.post("/preferences", isLoggedIn, authController.savePreferences);

router.post("/logout", authController.logout);

module.exports = router;
