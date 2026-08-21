const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
    immutable: true,
  },
  likedCategories: {
    type: [
      {
        type: String,
        enum: ["waterfall", "hill-station", "wildlife", "temple", "tribal-heritage", "dam-lake"],
      },
    ],
    default: [],
  },
});

// This plugin adds username, hash, salt fields automatically,
// plus register(), authenticate(), and serialize/deserialize helpers.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
