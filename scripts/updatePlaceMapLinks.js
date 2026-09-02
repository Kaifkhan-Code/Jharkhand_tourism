if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const Place = require("../models/place");
const places = require("../seed/seedPlaces");

async function updateMapLinks() {
  const mongoUri = process.env.MONGO_URI || process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/jharkhand-tourism";
  await mongoose.connect(mongoUri);

  const updates = places
    .filter((place) => place.googleMapsUrl)
    .map((place) => {
      const { name, googleMapsUrl, ...placeData } = place;
      return {
        updateOne: {
          filter: { name },
          update: {
            $set: { googleMapsUrl: place.googleMapsUrl },
            $setOnInsert: placeData,
          },
          upsert: true,
        },
      };
    });

  const result = await Place.bulkWrite(updates);
  console.log(`Updated map links for ${result.modifiedCount} places and added ${result.upsertedCount} places.`);
  await mongoose.disconnect();
}

updateMapLinks().catch((err) => {
  console.error("Map-link migration failed:", err);
  process.exitCode = 1;
});
