const mongoose = require("mongoose");

const placeSubmissionSchema = new mongoose.Schema(
  {
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["waterfall", "hill-station", "wildlife", "temple", "tribal-heritage", "dam-lake"],
      required: true,
    },
    description: { type: String, required: true, trim: true },
    howToReach: { type: String, trim: true },
    locationUrl: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlaceSubmission", placeSubmissionSchema);