const mongoose = require("mongoose");

// A join collection between User and Place, rather than a flag on Place itself —
// this keeps "visited" personal to each user instead of global.
const visitedPlaceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  visitedOn: {
    type: Date,
    default: Date.now,
  },
});

// Prevent the same user from marking the same place visited twice
visitedPlaceSchema.index({ user: 1, place: 1 }, { unique: true });

module.exports = mongoose.model("VisitedPlace", visitedPlaceSchema);
