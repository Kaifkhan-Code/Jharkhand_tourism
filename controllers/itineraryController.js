const ItineraryPlace = require("../models/itineraryPlace");

module.exports.index = async (req, res) => {
  const itinerary = await ItineraryPlace.find({ user: req.user._id })
    .populate("place")
    .sort({ createdAt: 1 });

  res.render("itinerary/index", { itinerary });
};

module.exports.add = async (req, res) => {
  try {
    await ItineraryPlace.create({ user: req.user._id, place: req.params.placeId });
  } catch (err) {
    // A duplicate means the place is already in this user's itinerary.
    if (err.code !== 11000) throw err;
  }

  res.redirect(`/places/${req.params.placeId}`);
};

module.exports.remove = async (req, res) => {
  await ItineraryPlace.deleteOne({ user: req.user._id, place: req.params.placeId });
  res.redirect("/itinerary");
};
