// Wrapper around the Geoapify Places API — free, no credit card required.
// Get a key at https://www.geoapify.com

const BASE_URL = "https://api.geoapify.com/v2/places";
const DETAILS_BASE_URL = "https://api.geoapify.com/v2/place-details";

function requireKey() {
  if (!process.env.GEOAPIFY_API_KEY) {
    throw new Error(
      "GEOAPIFY_API_KEY is not set. Get a free key at https://www.geoapify.com and add it to your .env file."
    );
  }
}

function getApiKey() {
  return process.env.GEOAPIFY_API_KEY;
}

// categories examples: "tourism.attraction", "natural.water.waterfall", "religion"
async function searchNearby({ lat, lng, radiusMeters = 30000, categories = "tourism", limit = 25 }) {
  requireKey();

  const params = new URLSearchParams({
    categories,
    filter: `circle:${lng},${lat},${radiusMeters}`,
    bias: `proximity:${lng},${lat}`,
    limit: String(limit),
    apiKey: getApiKey(),
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Geoapify search failed (${res.status})`);

  const data = await res.json();
  const features = data.features || [];

  return features.map((f) => {
    const props = f.properties || {};
    const coordinates = f.geometry && f.geometry.coordinates ? f.geometry.coordinates : [0, 0];

    return {
      xid: props.place_id || props.id || `geoapify-${Date.now()}-${Math.random()}`,
      id: props.place_id || props.id,
      name: props.name || props.address_line1 || "Unnamed place",
      kinds: Array.isArray(props.categories) ? props.categories.join(",") : (props.kinds || ""),
      categories: Array.isArray(props.categories) ? props.categories.join(", ") : (props.kinds || ""),
      lat: coordinates[1],
      lng: coordinates[0],
    };
  });
}

async function getPlaceDetails(placeId) {
  requireKey();

  const params = new URLSearchParams({
    placeid: placeId,
    apiKey: getApiKey(),
  });

  const res = await fetch(`${DETAILS_BASE_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Geoapify place details failed (${res.status})`);

  const data = await res.json();
  const feature = data.features && data.features[0] ? data.features[0] : null;
  if (!feature) {
    throw new Error("Geoapify returned no place details.");
  }

  const props = feature.properties || {};
  const coordinates = feature.geometry && feature.geometry.coordinates ? feature.geometry.coordinates : [0, 0];

  return {
    name: props.name || props.address_line1 || "Unnamed place",
    kinds: Array.isArray(props.categories) ? props.categories.join(",") : (props.kinds || ""),
    point: {
      lat: coordinates[1],
      lon: coordinates[0],
    },
    wikipedia_extracts: props.wikipedia_extracts || null,
  };
}

module.exports = { searchNearby, getPlaceDetails };