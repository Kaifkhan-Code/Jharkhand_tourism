if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const User = require("../models/user");

const identifier = process.argv[2];

if (!identifier) {
  console.error("Usage: npm run make-admin -- <username-or-email>");
  process.exit(1);
}

async function makeAdmin() {
  const mongoUri = process.env.MONGO_URI || process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/jharkhand-tourism";
  await mongoose.connect(mongoUri);

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select("_id username email");

  if (!user) {
    throw new Error(`No account found for ${identifier}`);
  }

  await User.collection.updateOne({ _id: user._id }, { $set: { role: "admin" } });
  console.log(`Admin access granted to ${user.username || user.email}.`);
  await mongoose.disconnect();
}

makeAdmin().catch(async (err) => {
  console.error("Could not grant admin access:", err.message);
  await mongoose.disconnect();
  process.exit(1);
});