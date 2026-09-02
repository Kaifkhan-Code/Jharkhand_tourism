require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Place = require("../models/place");
const connectDB = require("../config/db");
const { configureCloudinary } = require("../utils/cloudinary");

const imagesDirectory = path.join(__dirname, "..", "public", "images", "places");

function sanitizePublicId(filename) {
  return path
    .basename(filename, path.extname(filename))
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function uploadWithRetry(cloudinary, filePath, filename, publicId) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await cloudinary.uploader.upload(filePath, {
        folder: "places",
        public_id: publicId,
        resource_type: "image",
        overwrite: true,
        invalidate: true,
      });
    } catch (error) {
      const isRetryable = /520|429|timeout|network|ECONNRESET|ENOTFOUND|fetch failed/i.test(error?.message || "");

      if (attempt >= maxAttempts || !isRetryable) {
        throw error;
      }

      const delay = attempt * 2000;
      console.warn(`Upload retry ${attempt}/${maxAttempts} for ${filename} after ${error.message}. Waiting ${delay}ms...`);
      await sleep(delay);
    }
  }
}

async function removeLocalImage(filePath, filename) {
  return new Promise((resolve) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.warn(`Uploaded ${filename}, but failed to remove the local copy: ${error.message}`);
        resolve(false);
        return;
      }

      console.log(`Removed local copy: ${filename}`);
      resolve(true);
    });
  });
}

async function migrateImages() {
  const cloudinary = configureCloudinary();
  await connectDB();

  const filenames = fs
    .readdirSync(imagesDirectory)
    .filter((filename) => /\.(jpe?g|png|webp|avif)$/i.test(filename));

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const filename of filenames) {
    const filePath = path.join(imagesDirectory, filename);
    const publicId = sanitizePublicId(filename);

    try {
      const result = await uploadWithRetry(cloudinary, filePath, filename, publicId);

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

      await removeLocalImage(filePath, filename);
    } catch (error) {
      failed += 1;
      console.error(`Failed to upload ${filename}: ${error.message}`);
    }
  }

  console.log(`Cloudinary migration complete: ${migrated} linked, ${skipped} unmatched, ${failed} failed.`);
  if (failed > 0) {
    process.exitCode = 1;
  }

  await mongoose.disconnect();
}

migrateImages().catch(async (error) => {
  console.error("Cloudinary migration failed:", error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
