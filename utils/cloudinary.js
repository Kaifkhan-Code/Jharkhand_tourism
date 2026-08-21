const { v2: cloudinary } = require("cloudinary");

function configureCloudinary() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) {
    throw new Error("CLOUDINARY_URL is not configured");
  }

  const parsed = new URL(cloudinaryUrl);
  cloudinary.config({
    cloud_name: parsed.hostname,
    api_key: decodeURIComponent(parsed.username),
    api_secret: decodeURIComponent(parsed.password),
    secure: true,
  });

  return cloudinary;
}

function cloudinaryImageUrl(filename) {
  const cloudName = process.env.CLOUDINARY_URL
    ? new URL(process.env.CLOUDINARY_URL).hostname
    : null;

  if (!cloudName) return `/images/places/${filename}`;

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/places/${filename}`;
}

module.exports = { configureCloudinary, cloudinaryImageUrl };
