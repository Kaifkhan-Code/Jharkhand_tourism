if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");

const connectDB = require("./config/db");
const User = require("./models/user");

const indexRoutes = require("./routes/index");
const placeRoutes = require("./routes/places");
const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const itineraryRoutes = require("./routes/itinerary");
const assistantRoutes = require("./routes/assistant");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
let databaseConnection;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.error("Failed to connect to MongoDB on startup:", err.message);
    process.exit(1);
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Jharkhand Tourism running on http://localhost:${PORT}`);
  });
}

app.use(async (req, res, next) => {
  try {
    databaseConnection ||= connectDB();
    await databaseConnection;
    next();
  } catch (err) {
    next(err);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
    store: process.env.MONGO_URI
      ? MongoStore.create({ mongoUrl: process.env.MONGO_URI })
      : undefined,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Make the logged-in user available in every view without passing it manually
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRoutes);
app.use("/places", placeRoutes);
app.use("/events", eventRoutes);
app.use("/itinerary", itineraryRoutes);
app.use("/assistant", assistantRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/", authRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

if (require.main === module) start();

module.exports = app;

