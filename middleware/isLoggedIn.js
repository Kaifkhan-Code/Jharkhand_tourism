module.exports = function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.redirectTo = req.originalUrl;
    req.flash = req.flash || (() => {}); // safe no-op if flash isn't wired up yet
    return res.redirect("/login");
  }
  next();
};
