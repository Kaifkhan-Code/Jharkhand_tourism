const Place = require("../models/place");
const VisitedPlace = require("../models/visitedPlace");
const ItineraryPlace = require("../models/itineraryPlace");
const PlaceSubmission = require("../models/placeSubmission");
const Review = require("../models/review");
const { uploadReviewPhotoToCloudinary } = require("../utils/reviewUpload");

const categories = ["waterfall", "hill-station", "wildlife", "temple", "tribal-heritage", "dam-lake"];

module.exports.renderSuggestionForm = async (req, res) => {
  const submissions = await PlaceSubmission.find({ submittedBy: req.user._id }).sort({ createdAt: -1 });
    res.render("places/suggest", { error: null, formData: {}, submissions, query: req.query });
};

module.exports.submitSuggestion = async (req, res) => {
  const { name, district, category, description, howToReach, locationUrl } = req.body;
  const formData = { name, district, category, description, howToReach, locationUrl };
  const submissions = await PlaceSubmission.find({ submittedBy: req.user._id }).sort({ createdAt: -1 });

  if (!name || !district || !description || !categories.includes(category)) {
    return res.status(400).render("places/suggest", {
      error: "Please provide the location name, district, category, and description.",
      formData,
      submissions,
        query: {},
    });
  }

  await PlaceSubmission.create({ submittedBy: req.user._id, ...formData });
  res.redirect("/places/suggest?submitted=1");
};

// GET /places — Explore: all places, with optional filters
module.exports.index = async (req, res) => {
  const { category, season, district } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (season) filter.bestSeason = season;
  if (district) filter.district = new RegExp(district, "i");

  const places = await Place.find(filter).sort({ name: 1 });

  let visitedIds = [];
  if (req.user) {
    const visited = await VisitedPlace.find({ user: req.user._id }).select("place");
    visitedIds = visited.map((v) => v.place.toString());
  }

  res.render("places/index", { places, visitedIds, query: req.query });
};

// GET /places/:id — single place detail
module.exports.show = async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (!place) {
    return res.status(404).render("places/show", { place: null });
  }

  let isVisited = false;
  let isInItinerary = false;
  let myReview = null;
  if (req.user) {
    const record = await VisitedPlace.findOne({ user: req.user._id, place: place._id });
    isVisited = !!record;
    const itineraryRecord = await ItineraryPlace.findOne({ user: req.user._id, place: place._id });
    isInItinerary = !!itineraryRecord;
    myReview = await Review.findOne({ user: req.user._id, place: place._id });
  }

  const reviews = await Review.find({ place: place._id, status: "approved" })
    .populate("user", "username")
    .sort({ createdAt: -1 });
  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  res.render("places/show", {
    place,
    isVisited,
    isInItinerary,
    reviews,
    averageRating,
    myReview,
    query: req.query,
  });
};

module.exports.submitReview = async (req, res) => {
  const rating = Number.parseInt(req.body.rating, 10);
  const comment = (req.body.comment || "").trim();
  const place = await Place.findById(req.params.id);
  if (!place) return res.status(404).render("places/show", { place: null });

  if (!Number.isInteger(rating) || rating < 1 || rating > 5 || !comment) {
    return res.redirect(`/places/${place._id}?reviewError=1`);
  }

  const existingReview = await Review.findOne({ user: req.user._id, place: place._id });
  if (existingReview) return res.redirect(`/places/${place._id}?reviewPending=1`);

  const photo = req.file ? await uploadReviewPhotoToCloudinary(req.file) : null;
  await Review.create({
    user: req.user._id,
    place: place._id,
    rating,
    comment,
    photo: photo
      ? { filename: photo.public_id, pendingPath: photo.public_id, url: photo.secure_url }
      : undefined,
  });
  res.redirect(`/places/${place._id}?reviewSubmitted=1`);
};

// GET /discover — personalized "For You" recommendations
// Simple content-based filtering: score unvisited places by how many tags
// overlap with places the user has already visited.
module.exports.discover = async (req, res) => {
  const visited = await VisitedPlace.find({ user: req.user._id }).populate("place");
  const visitedIds = visited.map((v) => v.place._id);

  const tagScores = {};
  visited.forEach((v) => {
    (v.place.tags || []).forEach((tag) => {
      tagScores[tag] = (tagScores[tag] || 0) + 1;
    });
  });

  const unvisited = await Place.find({ _id: { $nin: visitedIds } });

  const recommended = unvisited
    .map((place) => {
      const score = (place.tags || []).reduce((sum, tag) => sum + (tagScores[tag] || 0), 0);
      return { place, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.place);

  res.render("places/discover", { places: recommended, hasVisitedAny: visited.length > 0 });
};

// POST /places/:id/visit — mark a place as visited
module.exports.markVisited = async (req, res) => {
  try {
    await VisitedPlace.create({ user: req.user._id, place: req.params.id });
  } catch (err) {
    // duplicate key error just means it was already marked — ignore silently
  }
  res.redirect(`/places/${req.params.id}`);
};

// DELETE /places/:id/visit — unmark, in case they misclick
module.exports.unmarkVisited = async (req, res) => {
  await VisitedPlace.deleteOne({ user: req.user._id, place: req.params.id });
  res.redirect(`/places/${req.params.id}`);
};
