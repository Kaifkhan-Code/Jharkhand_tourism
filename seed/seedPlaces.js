if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const Place = require("../models/place");

const places = [
  {
    name: "Hundru Falls",
    district: "Ranchi",
    category: "waterfall",
    tags: ["nature", "trekking", "photography", "popular"],
    bestSeason: "monsoon",
    description:
      "The Subarnarekha river drops about 98 metres here, making it one of the tallest and most dramatic waterfalls near Ranchi. Best seen in full flow just after the monsoon.",
    howToReach: "About 45 km from Ranchi city, reachable by car or bus toward Bundu.",
    image: {
      url: "/images/places/hundru.jpg",
      filename: "hundru.jpg",
    },
    location: { lat: 23.4526, lng: 85.6086 },
  },
  {
    name: "Dassam Falls",
    district: "Ranchi",
    category: "waterfall",
    tags: ["nature", "family-friendly", "picnic"],
    bestSeason: "monsoon",
    description:
      "A wide, tiered waterfall on the Kanchi river, popular for its accessible viewpoints and picnic spots along the rocks.",
    howToReach: "Around 40 km from Ranchi on the Ranchi–Jamshedpur road.",
    image: {
      url: "/images/places/dassam.jpg",
      filename: "dassam.jpg",
    },
    location: { lat: 23.1603, lng: 85.5261 },
  },
  {
    name: "Jonha Falls",
    district: "Ranchi",
    category: "waterfall",
    tags: ["nature", "trekking", "offbeat"],
    bestSeason: "monsoon",
    description:
      "Also called Gautamdhara, this falls has a small temple nearby and a steep flight of steps down to the base — quieter than Hundru or Dassam.",
    howToReach: "About 40 km from Ranchi, near Taimara village.",
    image: {
      url: "/images/places/jonha.jpg",
      filename: "jonha.jpg",
    },
    location: { lat: 23.2442, lng: 85.5996 },
  },
  {
    name: "Netarhat",
    district: "Latehar",
    category: "hill-station",
    tags: ["nature", "sunrise", "trekking", "offbeat"],
    bestSeason: "winter",
    description:
      "Known as the 'Queen of Chotanagpur', a plateau hill station famous for its sunrise and sunset points, pine forests, and cool climate year-round.",
    howToReach: "About 156 km from Ranchi; best reached by car, roughly a 4-5 hour drive.",
    image: {
      url: "/images/places/netarhat.jpg",
      filename: "netarhat.jpg",
    },
    location: { lat: 23.4749, lng: 84.2673 },
  },
  {
    name: "Betla National Park",
    district: "Latehar",
    category: "wildlife",
    tags: ["wildlife", "nature", "safari"],
    bestSeason: "winter",
    description:
      "One of India's earliest Project Tiger reserves, home to tigers, elephants, bison, and dense sal forest. Jeep safaris run through the core zone.",
    howToReach: "About 25 km from Daltonganj, roughly 170 km from Ranchi.",
    image: {
      url: "/images/places/betla.jpg",
      filename: "betla.jpg",
    },
    location: { lat: 23.8879, lng: 84.1902 },
  },
  {
    name: "Parasnath Hill",
    district: "Giridih",
    category: "temple",
    tags: ["pilgrimage", "trekking", "tribal-heritage"],
    bestSeason: "winter",
    description:
      "The highest peak in Jharkhand and a major Jain pilgrimage site, with temples dotting the ridgeline. The climb is long but the views over the plateau are worth it.",
    howToReach: "Nearest railway station is Parasnath, about 165 km from Ranchi.",
    image: {
      url: "/images/places/parasnath.jpg",
      filename: "parasnath.jpg",
    },
    location: { lat: 23.9628, lng: 86.1469 },
  },
  {
    name: "Patratu Valley",
    district: "Ramgarh",
    category: "dam-lake",
    tags: ["nature", "scenic-drive", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A winding valley road looping around the Patratu dam reservoir, popular for its hairpin bends and viewpoints overlooking the water.",
    howToReach: "About 40 km from Ranchi, easily done as a half-day drive.",
    image: {
      url: "/images/places/patratu.jpg",
      filename: "patratu.jpg",
    },
    location: { lat: 23.6508, lng: 85.3062 },
  },
  {
    name: "Bada Talab",
    district: "Ranchi",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A peaceful urban lake in Ranchi, offering open water views and a relaxed setting for an evening walk or quiet break.",
    howToReach: "Located in Ranchi city; follow local roads toward the Bada Talab waterfront.",
    image: {
      url: "/images/places/badatalab.jpg",
      filename: "badatalab.jpg",
    },
    location: { lat: 23.3567, lng: 85.3339 },
  },
  {
    name: "Dhurwa Dam",
    district: "Ranchi",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "photography"],
    bestSeason: "all-year",
    description:
      "A broad reservoir in the Dhurwa area, with calm water, green surroundings, and expansive views close to Ranchi.",
    howToReach: "Located in Dhurwa, Ranchi; local roads provide access to the dam viewpoints.",
    image: {
      url: "/images/places/dhurwadam.jpg",
      filename: "dhurwadam.jpg",
    },
    location: { lat: 23.3067, lng: 85.2858 },
  },
  {
    name: "Rock Garden",
    district: "Ranchi",
    category: "tribal-heritage",
    tags: ["nature", "scenic", "family-friendly", "photography"],
    bestSeason: "all-year",
    description:
      "A landscaped garden built around natural rock formations, with pathways, viewpoints, and views across Ranchi's waterways.",
    howToReach: "On Kanke Road in Ranchi, near Kanke Dam; accessible by local transport and car.",
    image: {
      url: "/images/places/rockgarden.jpg",
      filename: "rockgarden.jpg",
    },
    location: { lat: 23.4145, lng: 85.3247 },
  },
  {
    name: "Tagore Hill",
    district: "Ranchi",
    category: "hill-station",
    tags: ["nature", "sunrise", "scenic", "photography"],
    bestSeason: "all-year",
    description:
      "A well-known hilltop viewpoint in Ranchi, offering city views, open skies, and a short climb through a historic landscape.",
    howToReach: "Located in Morabadi, Ranchi; the hill is reached by road followed by a climb up the steps.",
    image: {
      url: "/images/places/tagorehill.jpg",
      filename: "tagorehill.jpg",
    },
    location: { lat: 23.4055, lng: 85.3272 },
  },
  {
    name: "Deori Mandir",
    district: "Ranchi",
    category: "temple",
    tags: ["tribal-heritage", "pilgrimage", "offbeat"],
    bestSeason: "all-year",
    description:
      "A Durga temple with roots in local tribal worship traditions, blending regional folk practice with mainstream Hindu ritual — a good window into Jharkhand's syncretic culture.",
    howToReach: "About 25 km from Ranchi, near Tati Silwai.",
    image: {
      url: "/images/places/deori.jpg",
      filename: "deori.jpg",
    },
    location: { lat: 23.3087, lng: 85.3896 },
  },
  {
    name: "Rajrappa Temple",
    district: "Ramgarh",
    category: "temple",
    tags: ["pilgrimage", "scenic"],
    bestSeason: "winter",
    description:
      "A Chhinnamasta Devi temple set at the confluence of the Damodar and Bhairavi rivers, one of the more striking temple settings in the state.",
    howToReach: "About 80 km from Ranchi via Ramgarh.",
    image: {
      url: "/images/places/rajrappa.jpg",
      filename: "rajrappa.jpg",
    },
    location: { lat: 23.6294, lng: 85.6736 },
  },
  {
    name: "Panchghagh Falls",
    district: "Khunti",
    category: "waterfall",
    tags: ["nature", "offbeat", "tribal-heritage"],
    bestSeason: "monsoon",
    description:
      "A lesser-known five-stream waterfall near Khunti, surrounded by tribal villages — one of the quieter, more local spots outside the usual tourist circuit.",
    howToReach: "About 45 km from Ranchi, near Khunti town.",
    image: {
      url: "/images/places/panchghag.jpg",
      filename: "panchghag.jpg",
    },
    location: { lat: 23.0652, lng: 85.2807 },
  },
  {
    name: "Sita Falls",
    district: "Ranchi",
    category: "waterfall",
    tags: ["nature", "trekking", "offbeat", "photography"],
    bestSeason: "monsoon",
    description:
      "A peaceful waterfall tucked into the forested landscape near Jonha, Sita Falls is a quieter stop for travellers who want a scenic walk away from the busier viewpoints.",
    howToReach: "Around 45 km from Ranchi, reached by road toward Jonha Falls followed by a short local walk.",
    image: {
      url: "/images/places/sita.jpg",
      filename: "sita.jpg",
    },
    location: { lat: 23.2512, lng: 85.6131 },
  },
  {
    name: "Bariatu Hills",
    district: "Ranchi",
    category: "hill-station",
    tags: ["nature", "scenic", "photography", "offbeat"],
    bestSeason: "winter",
    description:
      "A rocky green hillscape near Ranchi, with open views, forest edges, and a quiet route for an easy morning escape from the city.",
    howToReach: "Located near Ranchi; local access details should be checked before setting out.",
    image: {
      url: "/images/places/bariatuhills.jpg",
      filename: "bariatuhills.jpg",
    },
  },
  {
    name: "Heaven Hill",
    district: "Ranchi",
    category: "hill-station",
    tags: ["nature", "scenic", "sunrise", "photography"],
    bestSeason: "winter",
    description:
      "A misty hill viewpoint around Ranchi, best suited to slow walks, open landscapes, and clear early-morning views after the rains.",
    howToReach: "Located around Ranchi; confirm the local route and access conditions before visiting.",
    image: {
      url: "/images/places/heavenhills.jpg",
      filename: "heavenhills.jpg",
    },
  },
  {
    name: "Marsalli Pahar",
    district: "Ranchi",
    category: "hill-station",
    tags: ["nature", "sunset", "scenic", "offbeat"],
    bestSeason: "winter",
    description:
      "An open hill landscape with wide horizons and quiet sunset views, offering a more rugged side of the plateau beyond the usual viewpoints.",
    howToReach: "Local access details should be checked before setting out, especially during wet weather.",
    image: {
      url: "/images/places/marsallipahar.jpg",
      filename: "marsallipahar.jpg",
    },
  },
  {
    name: "Nakta Pahar",
    district: "Ranchi",
    category: "hill-station",
    tags: ["nature", "trekking", "scenic", "photography"],
    bestSeason: "winter",
    description:
      "A distinctive rocky hill rising above the surrounding green landscape, rewarding visitors with a memorable profile and broad plateau views.",
    howToReach: "Local access details should be checked before setting out; conditions can change during the monsoon.",
    image: {
      url: "/images/places/naktapahar.jpg",
      filename: "naktapahar.jpg",
    },
  },
  {
    name: "Dalma Wildlife Sanctuary",
    district: "East Singhbhum",
    category: "wildlife",
    tags: ["wildlife", "nature", "trekking", "scenic"],
    bestSeason: "winter",
    description:
      "A forested sanctuary spread across the Dalma hills, known for elephant habitat, wooded trails, and broad views across the plains.",
    howToReach: "Approaches are available from the Jamshedpur side; check sanctuary access and safari timings before visiting.",
    image: {
      url: "/images/places/dalmawildlifesanctuary.jpg",
      filename: "dalmawildlifesanctuary.jpg",
    },
  },
  {
    name: "Hazaribagh Wildlife Sanctuary",
    district: "Hazaribagh",
    category: "wildlife",
    tags: ["wildlife", "nature", "forest", "offbeat"],
    bestSeason: "winter",
    description:
      "A quiet forest landscape around Hazaribagh, offering a chance to experience sal woodland, local wildlife, and open countryside away from the city.",
    howToReach: "Located near Hazaribagh; confirm entry rules and local transport before setting out.",
    image: {
      url: "/images/places/hazaribaghwildlifesanctuary.jpg",
      filename: "hazaribaghwildlifesanctuary.jpg",
    },
  },
  {
    name: "Kanke Dam",
    district: "Ranchi",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A broad reservoir on the edge of Ranchi, with open water views and a relaxed setting for a short city escape or evening walk.",
    howToReach: "Located near Ranchi city; local roads provide access to viewpoints around the reservoir.",
    image: {
      url: "/images/places/kankedam.jpg",
      filename: "kankedam.jpg",
    },
  },
  {
    name: "Ormanjhi Birsa Biological Park",
    district: "Ranchi",
    category: "wildlife",
    tags: ["wildlife", "family-friendly", "nature", "photography"],
    bestSeason: "all-year",
    description:
      "A family-friendly biological park near Ormanjhi where visitors can spend a day around native wildlife, gardens, and shaded paths.",
    howToReach: "Around Ormanjhi on the Ranchi–Ramgarh route; check opening hours before visiting.",
    image: {
      url: "/images/places/ormanjhizoo.jpg",
      filename: "ormanjhizoo.jpg",
    },
  },
  {
    name: "Rarha Waterfalls",
    district: "Ranchi",
    category: "waterfall",
    tags: ["nature", "trekking", "offbeat", "photography"],
    bestSeason: "monsoon",
    description:
      "A compact forest waterfall flowing over dark rock, suited to travellers looking for a quieter water stop and a close-to-nature afternoon.",
    howToReach: "Local access details should be checked before setting out, especially during the monsoon.",
    image: {
      url: "/images/places/rarhawaterfalls.jpg",
      filename: "rarhawaterfalls.jpg",
    },
  },
  {
    name: "Rose Island",
    district: "Ranchi",
    category: "dam-lake",
    tags: ["nature", "scenic", "picnic", "photography"],
    bestSeason: "winter",
    description:
      "A waterside picnic landscape with a small tree-covered island, open skies, and a slower afternoon atmosphere around the lake.",
    howToReach: "Check the local route and any seasonal access restrictions before visiting.",
    image: {
      url: "/images/places/roseisland.jpg",
      filename: "roseisland.jpg",
    },
  },
  {
    name: "Rukka Dam",
    district: "Ranchi",
    category: "dam-lake",
    tags: ["nature", "scenic", "photography", "family-friendly"],
    bestSeason: "winter",
    description:
      "A wide reservoir framed by green banks and open sky, offering a peaceful landscape for views, photography, and an unhurried drive.",
    howToReach: "Located around Ranchi; check local access conditions before setting out.",
    image: {
      url: "/images/places/rukkadam.jpg",
      filename: "rukkadam.jpg",
    },
  },
  {
    name: "Sikidri Ghati",
    district: "Ranchi",
    category: "hill-station",
    tags: ["nature", "scenic-drive", "photography", "monsoon"],
    bestSeason: "monsoon",
    description:
      "A green hill road curling through the plateau landscape, with sweeping views, sharp bends, and a memorable drive after the rains.",
    howToReach: "Drive carefully on the hill route and check weather conditions before visiting during the monsoon.",
    image: {
      url: "/images/places/sikidrighati.jpg",
      filename: "sikidrighati.jpg",
    },
  },
  {
    name: "Sikidri Waterfall",
    district: "Ranchi",
    category: "waterfall",
    tags: ["nature", "trekking", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A forest waterfall tucked among rocks and thick green cover, rewarding a short nature outing when the seasonal flow is strong.",
    howToReach: "Local access details should be checked before setting out; rocks can be slippery during the rains.",
    image: {
      url: "/images/places/sikidriwaterfall.jpg",
      filename: "sikidriwaterfall.jpg",
    },
  },
  {
    name: "Tiru Falls",
    district: "Ranchi",
    category: "waterfall",
    tags: ["nature", "trekking", "offbeat", "photography"],
    bestSeason: "monsoon",
    description:
      "A tall, narrow waterfall dropping through a forested rocky gorge, best experienced with care and plenty of time around the water.",
    howToReach: "Confirm the local route and water conditions before visiting, particularly during the monsoon.",
    image: {
      url: "/images/places/tirufall.jpg",
      filename: "tirufall.jpg",
    },
  },
];

async function seed() {
  const mongoUri = process.env.MONGO_URI || process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/jharkhand-tourism";
  await mongoose.connect(mongoUri);
  console.log(`Connected to MongoDB at ${mongoUri}, seeding places...`);

  await Place.deleteMany({});
  await Place.insertMany(places);

  console.log(`Seeded ${places.length} places.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
