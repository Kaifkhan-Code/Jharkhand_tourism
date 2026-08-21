const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
  },
  category: {
    // Keep this a small, controlled set so filtering/tagging stays predictable
    type: String,
    enum: ["waterfall", "hill-station", "wildlife", "temple", "tribal-heritage", "dam-lake"],
    required: true,
  },
  tags: [String], // e.g. ["nature", "trekking", "family-friendly", "offbeat"]
  bestSeason: {
    type: String,
    enum: ["winter", "monsoon", "summer", "all-year"],
    default: "all-year",
  },
  description: {
    type: String,
    required: true,
  },
  howToReach: String,
  image: {
    url: String,
    filename: String,
  },
  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("Place", placeSchema);
