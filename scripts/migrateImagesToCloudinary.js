require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Place = require("../models/place");
const connectDB = require("../config/db");
const { configureCloudinary } = require("../utils/cloudinary");

const imagesDirectory = path.join(__dirname, "..", "public", "images", "places");

async function migrateImages() {
  const cloudinary = configureCloudinary();
  await connectDB();

  const filenames = fs
    .readdirSync(imagesDirectory)
    .filter((filename) => /\.(jpe?g|png|webp|avif)$/i.test(filename));

  let migrated = 0;
  let skipped = 0;

  for (const filename of filenames) {
    const filePath = path.join(imagesDirectory, filename);
    const publicId = path.basename(filename, path.extname(filename));
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "places",
      public_id: publicId,
      resource_type: "image",
      overwrite: true,
      invalidate: true,
    });

    const update = await Place.updateOne(
      { "image.filename": filename },
      {
        $set: {
          "image.url": result.secure_url,
          "image.filename": filename,
        },
      }
    );

    if (update.matchedCount === 0) {
      skipped += 1;
      console.warn(`Uploaded ${filename}, but no matching Place record was found.`);
    } else {
      migrated += 1;
      console.log(`Uploaded and linked ${filename}`);
    }
  }

  console.log(`Cloudinary migration complete: ${migrated} linked, ${skipped} unmatched.`);
  await mongoose.disconnect();
}

migrateImages().catch(async (error) => {
  console.error("Cloudinary migration failed:", error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
