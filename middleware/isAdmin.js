const isLoggedIn = require("./isLoggedIn");

module.exports = [
  isLoggedIn,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).render("403");
    }
    next();
  },
];