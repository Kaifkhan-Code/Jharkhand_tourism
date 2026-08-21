if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const Event = require("../models/event");
const Place = require("../models/place");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB, seeding events...");

  // Look up real places so events can link to them — run seedPlaces.js first.
  const netarhat = await Place.findOne({ name: "Netarhat" });

  const events = [
    {
      name: "Netarhat Utsav",
      place: netarhat ? netarhat._id : undefined,
      district: "Latehar",
      month: "March",
      description:
        "A hill-station festival at Netarhat celebrating local music, handicrafts, and cuisine — often compared to Gujarat's Rann Utsav for how it turns a scenic destination into a cultural showcase.",
    },
    {
      name: "Palash Patang Mahotsav",
      district: "Ranchi",
      month: "January",
      description:
        "A kite festival held by the waters of Kanke Dam in Ranchi, with free entry, kite-making workshops for children, and demonstrations by expert kite-flyers.",
    },
    {
      name: "Sarhul",
      district: "Ranchi",
      month: "March-April",
      description:
        "One of Jharkhand's most significant tribal festivals, marking the start of spring and worship of the sal tree — celebrated across tribal communities with traditional dance and music.",
    },
  ];

  await Event.deleteMany({});
  await Event.insertMany(events);

  console.log(`Seeded ${events.length} events.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
