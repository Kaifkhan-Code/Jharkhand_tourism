const passport = require("passport");
const User = require("../models/user");

module.exports.renderSignup = (req, res) => {
  res.render("auth/signup");
};

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.session.preferenceRedirectTo = "/";
      res.redirect("/preferences");
    });
  } catch (err) {
    res.render("auth/signup", { error: err.message });
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("auth/login");
};

module.exports.login = (req, res) => {
  const redirectTo = req.session.redirectTo || "/";
  delete req.session.redirectTo;

  const safeRedirectTo = redirectTo === "/dashboard" || redirectTo === "/dashboard/admin" ? "/" : redirectTo;

  res.redirect(safeRedirectTo);
};

module.exports.renderPreferences = (req, res) => {
  res.render("auth/preferences", {
    selectedCategories: req.user.likedCategories || [],
    error: null,
  });
};

module.exports.savePreferences = async (req, res) => {
  const validCategories = [
    "waterfall",
    "hill-station",
    "wildlife",
    "temple",
    "tribal-heritage",
    "dam-lake",
    "nature",
    "park",
  ];
  const submittedCategories = Array.isArray(req.body.likedCategories)
    ? req.body.likedCategories
    : req.body.likedCategories
      ? [req.body.likedCategories]
      : [];
  const likedCategories = submittedCategories.filter((category) => validCategories.includes(category));

  if (likedCategories.length === 0) {
    return res.status(400).render("auth/preferences", {
      selectedCategories: submittedCategories,
      error: "Choose at least one category to continue.",
    });
  }

  req.user.likedCategories = [...new Set(likedCategories)];
  await req.user.save();

  const rawRedirectTo = req.session.preferenceRedirectTo || "/";
  const redirectTo = rawRedirectTo === "/dashboard" || rawRedirectTo === "/dashboard/admin" ? "/" : rawRedirectTo;
  delete req.session.preferenceRedirectTo;
  res.redirect(redirectTo);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
