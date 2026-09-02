if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Place = require("../models/place");

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const limitArg = [...args].find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : null;

async function fetchFinalUrl(url) {
  if (!globalThis.fetch) {
    throw new Error("This Node environment does not support fetch() and cannot resolve short links automatically.");
  }

  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  return response.url;
}

function parseLatLngFromUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const q = parsed.searchParams.get("q") || parsed.searchParams.get("query");
    if (q) {
      const latLng = q.split(",").map((value) => value.trim()).filter(Boolean);
      if (latLng.length >= 2) {
        const lat = Number(latLng[0]);
        const lng = Number(latLng[1]);
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          return { lat, lng };
        }
      }
    }
  } catch (err) {
    // ignore malformed URLs and try the regex fallback below
  }

  const matchAt = url.match(/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/);
  if (matchAt) {
    const lat = Number(matchAt[1]);
    const lng = Number(matchAt[2]);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return { lat, lng };
    }
  }

  const matchGoogle = url.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (matchGoogle) {
    const lat = Number(matchGoogle[1]);
    const lng = Number(matchGoogle[2]);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return { lat, lng };
    }
  }

  return null;
}

async function resolveCoordinatesForPlace(place) {
  if (!place.googleMapsUrl) {
    return { status: "skipped-no-link", place: place.name };
  }

  const hasCoords = !!(place.location && Number.isFinite(place.location.lat) && Number.isFinite(place.location.lng));
  if (hasCoords) {
    return { status: "skipped-has-coords", place: place.name };
  }

  try {
    const finalUrl = await fetchFinalUrl(place.googleMapsUrl);
    const coords = parseLatLngFromUrl(finalUrl);

    if (!coords) {
      return { status: "unresolved", place: place.name, finalUrl };
    }

    if (dryRun) {
      return { status: "dry-run", place: place.name, coords, finalUrl };
    }

    await Place.updateOne(
      { _id: place._id },
      { $set: { location: coords } }
    );

    return { status: "updated", place: place.name, coords, finalUrl };
  } catch (error) {
    return { status: "error", place: place.name, error: error.message };
  }
}

async function main() {
  const mongoUri = process.env.MONGO_URI || process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/jharkhand-tourism";
  await mongoose.connect(mongoUri);

  const query = {
    googleMapsUrl: { $exists: true, $ne: null, $ne: "" },
    $or: [
      { location: { $exists: false } },
      { location: null },
      { "location.lat": { $exists: false } },
      { "location.lng": { $exists: false } },
    ],
  };

  let places = await Place.find(query).sort({ district: 1, name: 1 });

  if (limit !== null) {
    places = places.slice(0, limit);
  }

  const results = [];
  for (const place of places) {
    const result = await resolveCoordinatesForPlace(place);
    results.push(result);
  }

  const summary = {
    total: places.length,
    updated: results.filter((item) => item.status === "updated").length,
    dryRun: results.filter((item) => item.status === "dry-run").length,
    unresolved: results.filter((item) => item.status === "unresolved").length,
    skippedHasCoords: results.filter((item) => item.status === "skipped-has-coords").length,
    skippedNoLink: results.filter((item) => item.status === "skipped-no-link").length,
    errors: results.filter((item) => item.status === "error").length,
  };

  console.log(JSON.stringify({ summary, results }, null, 2));

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error("Coordinate resolution failed:", error);
  process.exitCode = 1;
});
