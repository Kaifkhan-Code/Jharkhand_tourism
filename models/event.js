const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  place: {
    // Optional link back to a Place, e.g. Netarhat Utsav → Netarhat
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
  district: {
    type: String,
    required: true,
  },
  month: {
    // Kept as a simple string rather than a Date, since these are recurring
    // annual festivals rather than one-off dated events — e.g. "January".
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
