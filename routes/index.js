const express = require("express");
const router = express.Router();
const Place = require("../models/place");
const VisitedPlace = require("../models/visitedPlace");
const { cloudinaryImageUrl } = require("../utils/cloudinary");

router.get("/", async (req, res) => {
  const popularPlaces = await VisitedPlace.aggregate([
    { $group: { _id: "$place", visits: { $sum: 1 } } },
    { $sort: { visits: -1 } },
    { $limit: 3 },
  ]);

  const placeIds = popularPlaces.map((entry) => entry._id);
  const places = await Place.find({ _id: { $in: placeIds } });
  const placesById = new Map(places.map((place) => [place._id.toString(), place]));
  const trendingPlaces = popularPlaces
    .map((entry) => ({ place: placesById.get(entry._id.toString()), visits: entry.visits }))
    .filter((entry) => entry.place);

  const fallbackPlaces = trendingPlaces.length
    ? []
    : await Place.find({}).sort({ name: 1 }).limit(3);

  res.render("home", {
    trendingPlaces,
    fallbackPlaces,
    imageUrl: cloudinaryImageUrl,
  });
});

module.exports = router;
