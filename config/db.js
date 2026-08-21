const mongoose = require("mongoose");

async function connectDB({ retries = 5, delay = 2000 } = {}) {
  const candidateUris = [];

  if (process.env.MONGO_URI) {
    candidateUris.push({ label: "Atlas", uri: process.env.MONGO_URI });
  }

  candidateUris.push({
    label: "Local",
    uri: process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/jharkhand-tourism",
  });

  if (candidateUris.length === 0) {
    throw new Error("No MongoDB connection URI is configured");
  }

  const opts = {
    serverSelectionTimeoutMS: 5000,
  };

  let lastError;

  for (const { label, uri } of candidateUris) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await mongoose.connect(uri, opts);
        console.log(`MongoDB connected using ${label} at ${uri}`);
        return;
      } catch (err) {
        lastError = err;
        console.error(
          `MongoDB connection attempt ${attempt} for ${label} failed:`,
          err.message
        );

        if (attempt === retries) break;
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      }
    }
  }

  throw lastError || new Error("Unable to connect to MongoDB");
}

module.exports = connectDB;
