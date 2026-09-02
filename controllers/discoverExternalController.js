const Place = require("../models/place");
const { searchNearby, getPlaceDetails } = require("../utils/geopifyClient");

const DISTRICT_CENTERS = {
  Ranchi: { lat: 23.3441, lng: 85.3096 },
  Latehar: { lat: 23.7439, lng: 84.2, radius: 60000 },
  Giridih: { lat: 24.1913, lng: 86.3, radius: 60000 },
  Khunti: { lat: 23.0714, lng: 85.2778 },
  Ramgarh: { lat: 23.6307, lng: 85.5133 },
  Dhanbad: { lat: 23.7957, lng: 86.4304 },
  Deoghar: { lat: 24.4823, lng: 86.6947 },
  Jamshedpur: { lat: 22.8046, lng: 86.2029 },
};

module.exports.search = async (req, res) => {
  const district = req.query.district || "Ranchi";
  const center = DISTRICT_CENTERS[district] || DISTRICT_CENTERS.Ranchi;

  let results = [];
  let error = null;

  try {
    const raw = await searchNearby({
      lat: center.lat,
      lng: center.lng,
      radiusMeters: center.radius || 35000,
      categories: "tourism", 
      limit: 25,
    });

    const existingNames = (await Place.find({}).select("name")).map((p) =>
      p.name.toLowerCase()
    );

    results = raw.filter(
      (r) => r.name && r.name.trim() && !existingNames.includes(r.name.trim().toLowerCase())
    );
  } catch (err) {
    error = err.message;
  }

  res.render("admin/discover", {
    district,
    districts: Object.keys(DISTRICT_CENTERS),
    results,
    error,
    imported: req.query.imported || null,
  });
};

module.exports.importPlace = async (req, res) => {
  const { xid, district, category, tourismType } = req.body;

  try {
    const details = await getPlaceDetails(xid);

    const description =
      (details.wikipedia_extracts && details.wikipedia_extracts.text) ||
      `${details.name} is a point of interest in ${district}, Jharkhand. Edit this description with more detail.`;

    await Place.create({
      name: details.name,
      district,
      category: category || "tribal-heritage",
      tourismType: tourismType || "heritage",
      tags: (details.kinds || "").split(",").slice(0, 4),
      bestSeason: "all-year",
      description: description.slice(0, 500),
      howToReach: `Imported from OpenTripMap — add specific directions here.`,
      location: { lat: details.point.lat, lng: details.point.lon },
    });

    res.redirect(`/discover-places?district=${district}&imported=${encodeURIComponent(details.name)}`);
  } catch (err) {
    res.redirect(`/discover-places?district=${district}`);
  }
};