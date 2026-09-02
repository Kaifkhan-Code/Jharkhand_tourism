const fs = require("node:fs");
const path = require("node:path");
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
  const source = filename || "";
  const normalized = String(source)
    .replace(/^\/+/, "")
    .replace(/^images\//, "")
    .replace(/^places\//, "")
    .replace(/^public\//, "")
    .trim();

  const localPath = path.join(__dirname, "..", "public", "images", "places", path.basename(normalized));
  const localUrl = `/images/places/${encodeURIComponent(path.basename(normalized)).replace(/%2F/g, "/")}`;

  if (fs.existsSync(localPath)) {
    return localUrl;
  }

  const safePath = encodeURIComponent(normalized).replace(/%2F/g, "/");
  const cloudName = process.env.CLOUDINARY_URL
    ? new URL(process.env.CLOUDINARY_URL).hostname
    : null;

  if (!cloudName) return `/images/places/${safePath}`;

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:best,w_1600,dpr_auto/places/${safePath}`;
}

function applyCloudinaryImageUrls(places) {
  if (!Array.isArray(places)) return places;

  return places.map((place) => {
    if (!place || !place.image) return place;

    const filename = place.image.filename || (typeof place.image.url === "string" ? place.image.url.split("/").pop() : "");
    if (!filename) return place;

    return {
      ...place,
      image: {
        ...place.image,
        url: cloudinaryImageUrl(filename),
      },
    };
  });
}

module.exports = { configureCloudinary, cloudinaryImageUrl, applyCloudinaryImageUrls };
