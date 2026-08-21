const User = require("../models/user");
const Place = require("../models/place");
const Event = require("../models/event");
const VisitedPlace = require("../models/visitedPlace");
const ItineraryPlace = require("../models/itineraryPlace");
const PlaceSubmission = require("../models/placeSubmission");
const Review = require("../models/review");
const { configureCloudinary } = require("../utils/cloudinary");

module.exports.customer = async (req, res) => {
  const likedCategories = req.user.likedCategories || [];
  const [visited, itinerary, preferredPlaces, popularPlaces] = await Promise.all([
    VisitedPlace.find({ user: req.user._id })
      .populate("place")
      .sort({ visitedOn: -1 }),
    ItineraryPlace.find({ user: req.user._id })
      .populate("place")
      .sort({ createdAt: -1 }),
    Place.find({ category: { $in: likedCategories } }).sort({ name: 1 }).limit(4),
    VisitedPlace.aggregate([
      { $group: { _id: "$place", visits: { $sum: 1 } } },
      { $sort: { visits: -1 } },
      { $limit: 3 },
    ]),
  ]);

  const popularPlaceIds = popularPlaces.map((entry) => entry._id);
  const popularPlaceRecords = await Place.find({ _id: { $in: popularPlaceIds } });
  const placesById = new Map(popularPlaceRecords.map((place) => [place._id.toString(), place]));
  const trendingPlaces = popularPlaces
    .map((entry) => ({ place: placesById.get(entry._id.toString()), visits: entry.visits }))
    .filter((entry) => entry.place);
  const fallbackTrendingPlaces = trendingPlaces.length
    ? []
    : await Place.find({}).sort({ name: 1 }).limit(3);

  res.render("dashboard/customer", {
    visited,
    itinerary,
    likedCategories,
    preferredPlaces,
    trendingPlaces,
    fallbackTrendingPlaces,
  });
};

module.exports.admin = async (req, res) => {
  const [userCount, placeCount, eventCount, visitCount, recentUsers, pendingSubmissions, pendingReviews] = await Promise.all([
    User.countDocuments(),
    Place.countDocuments(),
    Event.countDocuments(),
    VisitedPlace.countDocuments(),
    User.find({}).select("username email role").sort({ _id: -1 }).limit(8),
    PlaceSubmission.find({ status: "pending" }).populate("submittedBy", "username email").sort({ createdAt: -1 }),
    Review.find({ status: "pending" }).populate("user", "username email").populate("place", "name district").sort({ createdAt: -1 }),
  ]);

  res.render("dashboard/admin", {
    stats: { userCount, placeCount, eventCount, visitCount },
    recentUsers,
    pendingSubmissions,
    pendingReviews,
  });
};

module.exports.approveReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id, status: "pending" });
  if (!review) return res.redirect("/dashboard/admin");

  review.status = "approved";
  review.reviewedAt = new Date();
  await review.save();
  res.redirect("/dashboard/admin");
};

module.exports.reviewPhoto = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id, status: "pending" });
  if (!review || !review.photo || !review.photo.pendingPath) return res.sendStatus(404);
  res.redirect(review.photo.url);
};

module.exports.rejectReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id, status: "pending" });
  if (!review) return res.redirect("/dashboard/admin");
  if (review.photo && review.photo.pendingPath) {
    await configureCloudinary().uploader.destroy(review.photo.pendingPath, { resource_type: "image" });
  }
  review.status = "rejected";
  review.reviewedAt = new Date();
  await review.save();
  res.redirect("/dashboard/admin");
};

module.exports.approveSubmission = async (req, res) => {
  const submission = await PlaceSubmission.findOne({ _id: req.params.id, status: "pending" });
  if (!submission) return res.redirect("/dashboard/admin");

  await Place.create({
    name: submission.name,
    district: submission.district,
    category: submission.category,
    tags: [],
    bestSeason: "all-year",
    description: submission.description,
    howToReach: submission.howToReach,
  });
  submission.status = "approved";
  submission.reviewedAt = new Date();
  await submission.save();
  res.redirect("/dashboard/admin");
};

module.exports.rejectSubmission = async (req, res) => {
  await PlaceSubmission.findOneAndUpdate(
    { _id: req.params.id, status: "pending" },
    { status: "rejected", reviewedAt: new Date() }
  );
  res.redirect("/dashboard/admin");
};
