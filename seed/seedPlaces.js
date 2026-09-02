if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const Place = require("../models/place");
const { applyCloudinaryImageUrls } = require("../utils/cloudinary");

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
    location: { lat: 23.4497246, lng: 85.6666868 },
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
    googleMapsUrl: "https://maps.app.goo.gl/JASgXCo1SrTcLueQ6",
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
    googleMapsUrl: "https://maps.app.goo.gl/omDjcBmnaksowswt5",
  },
  {
    name: "Upper Ghaghri Waterfall",
    district: "Latehar",
    category: "waterfall",
    tags: ["nature", "waterfall", "trekking", "monsoon"],
    bestSeason: "monsoon",
    description:
      "A beautiful forest waterfall near Netarhat, where water tumbles over rocky terrain surrounded by the green hills of Latehar.",
    howToReach: "Located near Netarhat; check the local route and water conditions before visiting, particularly during the monsoon.",
    image: {
      url: "/images/places/upperghagriwaterfall.jpg",
      filename: "upperghagriwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SFrbUvZL24ALYk5BA",
  },
  {
    name: "Koel View Point",
    district: "Latehar",
    category: "hill-station",
    tags: ["nature", "scenic", "sunrise", "photography"],
    bestSeason: "winter",
    description:
      "A scenic viewpoint near Netarhat overlooking the Koel valley, with wide horizons and striking views across the forested plateau.",
    howToReach: "Located around Netarhat; follow local roads and check weather conditions before setting out.",
    image: {
      url: "/images/places/netarhatkoelviewpoint.jpg",
      filename: "netarhatkoelviewpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/K14u6i4yE411XHBZ8",
  },
  {
    name: "Netarhat Dam",
    district: "Latehar",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "photography"],
    bestSeason: "all-year",
    description:
      "A peaceful reservoir set among Netarhat's forested hills, offering open water views and a quiet stop during a hill-station trip.",
    howToReach: "Located around Netarhat; check the local route and seasonal access conditions before visiting.",
    image: {
      url: "/images/places/netarhatdam.jpg",
      filename: "netarhatdam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/pdALBd2zY1EYAF2d9",
  },
  {
    name: "Netarhat Sunrise Point",
    district: "Latehar",
    category: "hill-station",
    tags: ["nature", "sunrise", "scenic", "photography"],
    bestSeason: "winter",
    description:
      "A memorable sunrise viewpoint in Netarhat, known for open skies, layered hills, and soft morning light across the plateau.",
    howToReach: "Located in Netarhat; arrive early and check local weather conditions for the clearest views.",
    image: {
      url: "/images/places/netarhatsunrisepoint.jpg",
      filename: "netarhatsunrisepoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/7KgTUMFXKCTx1FiW6",
  },
  {
    name: "Lawapani Waterfall",
    district: "Latehar",
    category: "waterfall",
    tags: ["nature", "waterfall", "trekking", "monsoon"],
    bestSeason: "monsoon",
    description:
      "A seasonal waterfall in Latehar surrounded by forest and rocky terrain, offering a refreshing monsoon escape for nature lovers.",
    howToReach: "Check the local route and water conditions before visiting, particularly during the monsoon.",
    image: {
      url: "/images/places/lawapaniwaterfall.jpg",
      filename: "lawapaniwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/BBkA1RNDUUJ5a2EL6",
  },
  {
    name: "Lamatia Dam",
    district: "Latehar",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "photography"],
    bestSeason: "all-year",
    description:
      "A peaceful reservoir landscape in Latehar, suited to open views, quiet drives, and relaxed photography by the water.",
    howToReach: "Check local road conditions and access details before setting out.",
    image: {
      url: "/images/places/lalmatiadam.jpg",
      filename: "lalmatiadam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/k9Sx9RWeEeLZJY3C9",
  },
  {
    name: "Taapa Pahar",
    district: "Latehar",
    category: "hill-station",
    tags: ["nature", "scenic", "trekking", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill landscape in Latehar with open plateau views and a quiet setting for walks and photography.",
    howToReach: "Check the local route and weather conditions before visiting, especially during the monsoon.",
    image: {
      url: "/images/places/taapapahad.jpg",
      filename: "taapapahad.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/DBqGT9SPxvT8hthL6",
  },
  {
    name: "Sunset Point",
    district: "Latehar",
    category: "hill-station",
    tags: ["nature", "sunset", "scenic", "photography"],
    bestSeason: "winter",
    description:
      "An open viewpoint in Latehar known for broad evening horizons, layered hills, and memorable sunset views.",
    howToReach: "Arrive before sunset and check local access and weather conditions before visiting.",
    image: {
      url: "/images/places/sunsetpoint.jpg",
      filename: "sunsetpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/MUb3SWt2Chh2N6AV7",
  },
  {
    name: "Nawagarh Fort",
    district: "Latehar",
    category: "tribal-heritage",
    tags: ["history", "tribal-heritage", "offbeat", "photography"],
    bestSeason: "winter",
    description:
      "A historic fort site in Latehar offering a glimpse into the region's heritage and a distinctive setting for exploration.",
    howToReach: "Check local road conditions and access details before visiting.",
    image: {
      url: "/images/places/nawagarhfort.jpg",
      filename: "nawagarhfort.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/omThTe6TQcawDrqK7",
  },
  {
    name: "Sarju Valley Viewpoint",
    district: "Latehar",
    category: "hill-station",
    tags: ["nature", "scenic", "sunset", "photography"],
    bestSeason: "winter",
    description:
      "A wide valley viewpoint in Latehar with forested hills, open skies, and sweeping scenic views across the plateau.",
    howToReach: "Check local road conditions and weather before setting out, especially during the monsoon.",
    image: {
      url: "/images/places/sarjuvalleyviewpoint.jpg",
      filename: "sarjuvalleyviewpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/MYAEApyjucoJpcht8",
  },
  {
    name: "Mirchaiya Waterfall",
    district: "Latehar",
    category: "waterfall",
    tags: ["nature", "waterfall", "trekking", "monsoon"],
    bestSeason: "monsoon",
    description:
      "A forest waterfall in Latehar where seasonal cascades and rocky surroundings create a rewarding monsoon outing.",
    howToReach: "Check the local route and water conditions before visiting, particularly during the monsoon.",
    image: {
      url: "/images/places/mirchaiyawaterfall.jpg",
      filename: "mirchaiyawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Xo3ahTDvb9CkfzDC6",
  },
  {
    name: "Neermoti Waterfall",
    district: "Latehar",
    category: "waterfall",
    tags: ["nature", "waterfall", "trekking", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A lesser-known waterfall in Latehar surrounded by greenery and rocky terrain, best experienced after the monsoon rains.",
    howToReach: "Check the local route and water conditions before setting out, particularly during the monsoon.",
    image: {
      url: "/images/places/neermotiwaterfall.jpg",
      filename: "neermotiwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/G5g8Yk24iCjdatiD7",
  },
  {
    name: "Hadhadwa Waterfall",
    district: "Palamu",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in the Palamu region, known for forested surroundings and a satisfying monsoon cascade in the heart of the plateau.",
    howToReach: "Reach via local roads in Palamu and check the route and water conditions before visiting, especially during heavy monsoon rainfall.",
    image: {
      url: "/images/places/hadhadwawaterfall.jpg",
      filename: "hadhadwawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Uzequqd4pZmCxnt7A",
  },
  {
    name: "Lodh Waterfall",
    district: "Palamu",
    category: "waterfall",
    tags: ["nature", "waterfall", "trekking", "monsoon"],
    bestSeason: "monsoon",
    description:
      "One of the more memorable waterfall spots in Palamu, with a strong monsoon flow and a striking setting framed by the surrounding forested hills.",
    howToReach: "Reach by local road from Palamu; verify access and road conditions before visiting, particularly after rainfall.",
    image: {
      url: "/images/places/lodhwaterfall.jpg",
      filename: "lodhwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/gFURpuPDaExadFES6",
  },
  {
    name: "Kechki Sangam",
    district: "Palamu",
    category: "nature",
    tags: ["nature", "river", "scenic", "photography"],
    bestSeason: "monsoon",
    description:
      "A scenic confluence point in Palamu where river views and the surrounding landscape create a peaceful, panoramic stop for travellers.",
    howToReach: "Check the local route and seasonal access details before visiting; roads in the region can be tricky after rain.",
    image: {
      url: "/images/places/kechkisangam.jpg",
      filename: "kechkisangam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/7xz6KdTrf7BQCTss6",
  },
  {
    name: "Sugga Bandh Waterfall",
    district: "Palamu",
    category: "waterfall",
    tags: ["nature", "waterfall", "offbeat", "monsoon"],
    bestSeason: "monsoon",
    description:
      "A waterfall destination in Palamu that suits travellers looking for a quieter, forested natural stop with a strong monsoon feel.",
    howToReach: "Use local access roads in Palamu and check current conditions before heading out, especially in the wet season.",
    image: {
      url: "/images/places/suggabandhwaterfall.jpg",
      filename: "suggabandhwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/VWGqVqJYLfTtawnF9",
  },
  {
    name: "Kamaldah Lake",
    district: "Latehar",
    category: "nature",
    tags: ["lake", "nature", "family-friendly", "scenic"],
    bestSeason: "all-year",
    description:
      "A peaceful lake in the Betla belt with soft water views, a calm ambience and a perfect stop for slow travel and relaxed family outings.",
    howToReach: "Reach via the local road network around Betla in Latehar and follow the map route to the lake area.",
    image: {
      url: "/images/places/kamaldahlake.jpg",
      filename: "kamaldahlake.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/5TnXDiUR7HP1kScv8",
  },
  {
    name: "Mirchaiya Waterfall",
    district: "Latehar",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A forest waterfall in the Betla stretch with quiet surroundings, rocky texture and a rewarding monsoon feel for nature lovers.",
    howToReach: "Use the local route around Betla in Latehar and check the final approach before visiting, especially during the rains.",
    image: {
      url: "/images/places/mirchaiyawaterfall.jpg",
      filename: "mirchaiyawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/5TnXDiUR7HP1kScv8",
  },
  {
    name: "Upper Ghaghri Waterfall",
    district: "Latehar",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall near Betla with rich greenery, a cool forest setting and a memorable stop for slow nature travel.",
    howToReach: "Follow the route around Betla in Latehar and verify access conditions before heading toward the waterfall.",
    image: {
      url: "/images/places/upperghagriwaterfall.jpg",
      filename: "upperghagriwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/5TnXDiUR7HP1kScv8",
  },
  {
    name: "Lodh Waterfall",
    district: "Latehar",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "photography"],
    bestSeason: "monsoon",
    description:
      "A dramatic waterfall stop in the Betla circuit with dense green surroundings, a strong seasonal flow and a great photo break.",
    howToReach: "Reach by the local Betla route in Latehar and confirm the final approach before visiting, especially after heavy rain.",
    image: {
      url: "/images/places/lodhwaterfall.jpg",
      filename: "lodhwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/5TnXDiUR7HP1kScv8",
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
    googleMapsUrl: "https://maps.app.goo.gl/y8XnnCLFE2H17u5b6",
  },
  {
    name: "Palamu Fort Gate",
    district: "Latehar",
    category: "heritage",
    tags: ["heritage", "history", "scenic", "fort"],
    bestSeason: "all-year",
    description:
      "A historic fort approach in the Betla belt that adds a sense of heritage, open landscape and a quiet stop along the plateau roads.",
    howToReach: "Reach the nearby Betla route in Latehar and use the local road approach for the fort gate area before visiting.",
    image: {
      url: "/images/places/palamufortgate.png",
      filename: "palamufortgate.png",
    },
    googleMapsUrl: "https://maps.app.goo.gl/mEShizm2js4ZJxHZ7",
  },
  {
    name: "Palamu Tiger Reserve",
    district: "Latehar",
    category: "wildlife",
    tags: ["wildlife", "nature", "safari", "forest"],
    bestSeason: "winter",
    description:
      "A protected forest landscape with rich biodiversity, open forest tracks and excellent potential for safari-style wildlife viewing.",
    howToReach: "Follow the local road network toward Betla in Latehar and use the map route before visiting the reserve area.",
    image: {
      url: "/images/places/palamutigerreserve.jpg",
      filename: "palamutigerreserve.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/xhG8Wm5129gx5DSM8",
  },
  {
    name: "Auranga Koyal Sangam",
    district: "Latehar",
    category: "nature",
    tags: ["river", "nature", "scenic", "photography"],
    bestSeason: "all-year",
    description:
      "A scenic river confluence in the Betla region with open water, forested surroundings and a memorable stop for nature travellers.",
    howToReach: "Reach via the Betla route in Latehar and follow the final approach road to the river confluence before visiting.",
    image: {
      url: "/images/places/aurangakoyalsangam.jpg",
      filename: "aurangakoyalsangam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/6qZPsP1kmvui6ee2A",
  },
  {
    name: "Koyal River Point",
    district: "Daltonganj",
    category: "nature",
    tags: ["nature", "river", "scenic", "photography"],
    bestSeason: "winter",
    description:
      "A riverside viewpoint near Daltonganj with wide, calm horizons and a gentle landscape ideal for slow travel, photography and a relaxed stopover.",
    howToReach: "Near Daltonganj; use the map link for the exact route and local access details.",
    image: {
      url: "/images/places/koyalriverpoint.jpeg",
      filename: "koyalriverpoint.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/WoCCiprZsHiotsae7",
  },
  {
    name: "Chian Kirocky Cliff",
    district: "Daltonganj",
    category: "hill-station",
    tags: ["nature", "viewpoint", "photography", "scenic"],
    bestSeason: "winter",
    description:
      "A dramatic cliffside viewpoint in and around Daltonganj, where the terrain opens up into a striking plateau landscape and sweeping views.",
    howToReach: "Use the route from Daltonganj and confirm the access road before visiting, especially in monsoon conditions.",
    image: {
      url: "/images/places/chiankirockycliff.jpeg",
      filename: "chiankirockycliff.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/wpfp14U4GFAQ1xMq8",
  },
  {
    name: "Daltonganj Hill Forest",
    district: "Daltonganj",
    category: "nature",
    tags: ["nature", "forest", "offbeat", "trekking"],
    bestSeason: "winter",
    description:
      "A forested hill setting around Daltonganj that suits easy drives, scenic walks and slower, greener stops away from the usual tourist circuit.",
    howToReach: "Reach by local roads from Daltonganj and check current route conditions before heading out.",
    image: {
      url: "/images/places/daltonganjhillforest.jpeg",
      filename: "daltonganjhillforest.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/qm6oHKbuNW8iqXzH9",
  },
  {
    name: "Ranital Dam",
    district: "Daltonganj",
    category: "dam-lake",
    tags: ["dam-lake", "nature", "family-friendly", "photography"],
    bestSeason: "all-year",
    description:
      "A quiet dam and water landscape near Daltonganj that offers a relaxed day-out with open water views and gentle countryside surroundings.",
    howToReach: "Near Daltonganj; check local access details and road conditions before visiting.",
    image: {
      url: "/images/places/ranitaldam.png",
      filename: "ranitaldam.png",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SSvBPVHDzo6WjewR7",
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
    googleMapsUrl: "https://maps.app.goo.gl/VdtsVeVdNzhRzVk39",
  },
  {
    name: "Debiya Dobni",
    district: "Giridih",
    category: "waterfall",
    tags: ["nature", "waterfall", "trekking", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall near Giridih, surrounded by rocky terrain and greenery, making it a rewarding monsoon nature outing.",
    howToReach: "Located near Giridih; confirm the local route and water conditions before visiting.",
    image: {
      url: "/images/places/debiyadobni.jpg",
      filename: "debiyadobni.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/GKLYnaNHhaR4g5My9",
  },
  {
    name: "Bankhanjo",
    district: "Giridih",
    category: "hill-station",
    tags: ["nature", "scenic", "offbeat", "photography"],
    bestSeason: "winter",
    description:
      "A quiet scenic destination near Giridih, offering forested surroundings, open views, and an offbeat escape from the town.",
    howToReach: "Located near Giridih; check local road conditions and access details before setting out.",
    image: {
      url: "/images/places/bankhanjo.jpg",
      filename: "bankhanjo.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/d2MJvTuHB4D5nZAPA",
  },
  {
    name: "Giridih Tourism",
    district: "Giridih",
    category: "tribal-heritage",
    tags: ["nature", "scenic", "tribal-heritage", "photography"],
    bestSeason: "all-year",
    description:
      "A broad introduction to Giridih's landscapes and cultural attractions, from forested hills to local heritage sites.",
    howToReach: "Located in Giridih; use the map link for the exact location and check local access details before visiting.",
    image: {
      url: "/images/places/giridihtourism.jpg",
      filename: "giridihtourism.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/kqgACv3bqdm3v6sy7",
  },
  {
    name: "Khandoli Dam",
    district: "Giridih",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A scenic reservoir near Giridih, known for open water views, green surroundings, and a relaxed day outdoors.",
    howToReach: "Located near Giridih; follow local roads and check access conditions before visiting.",
    image: {
      url: "/images/places/khandolidam.jpg",
      filename: "khandolidam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/RGXJ5CTzCWx19wwo6",
  },
  {
    name: "Usri Dam",
    district: "Giridih",
    category: "dam-lake",
    tags: ["nature", "scenic", "photography", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A peaceful water landscape near Giridih, offering a quiet stop for open views and photography.",
    howToReach: "Located near Giridih; check local road conditions and access details before setting out.",
    image: {
      url: "/images/places/usrifalls.jpg",
      filename: "usrifalls.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Ss7vuQdPPnRp79VRA",
  },
  {
    name: "Jamshedpur",
    district: "East Singhbhum",
    category: "nature",
    tags: ["nature", "lake", "urban", "scenic"],
    bestSeason: "all-year",
    description:
      "Lakes, gardens, dams and green pockets give this city a relaxed day-out feel with nearby hill escapes and forest viewpoints.",
    howToReach: "About 140 km from Ranchi; easily reached by car, roughly a 3-4 hour drive.",
    image: {
      url: "/images/places/jamshedpurcover.jpg",
      filename: "jamshedpurcover.jpg",
    },
    location: { lat: 22.8045, lng: 86.1854 },
    googleMapsUrl: "https://maps.app.goo.gl/jPdJvkQqQU2PQ1g56",
  },
  {
    name: "Satanpur Hill",
    district: "Bokaro",
    category: "hill-station",
    tags: ["nature", "scenic", "viewpoint", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hilltop destination in Bokaro with broad vistas, quiet greenery and a relaxed setting for easy nature outings.",
    howToReach: "Located in Bokaro district; reach by local road and plan a short drive to the hill viewpoint.",
    image: {
      url: "/images/places/satanpurhillbokaro.jpeg",
      filename: "satanpurhillbokaro.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/5TNxC9tjfUjwnKGZ7?g_st=aw",
  },
  {
    name: "Garga Dam Plantation",
    district: "Bokaro",
    category: "dam-lake",
    tags: ["nature", "forest", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A calm plantation and dam-side stretch in Bokaro, known for green surroundings, open views and a peaceful natural setting.",
    howToReach: "Located in Bokaro district; access by local road and easy short-distance travel from the main town routes.",
    image: {
      url: "/images/places/gargadamplantation.jpeg",
      filename: "gargadamplantation.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/XRSefhL1tp2wyhiK7?g_st=aw",
  },
  {
    name: "Khanjo Waterfall",
    district: "Bokaro",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "picnic"],
    bestSeason: "monsoon",
    description:
      "A forest waterfall in Bokaro that offers a cool, green escape with a quieter, more natural feel for visitors.",
    howToReach: "Reach through local roads in Bokaro district; best visited during the monsoon when the falls are at their fullest.",
    image: {
      url: "/images/places/khanjowaterfall.jpeg",
      filename: "khanjowaterfall.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/mPHhWz1U2eDPw6ae7?g_st=aw",
  },
  {
    name: "Barwa Ghat",
    district: "Bokaro",
    category: "nature",
    tags: ["river", "scenic", "nature", "relaxing"],
    bestSeason: "all-year",
    description:
      "A riverside stretch in Bokaro offering scenic water views, quiet surroundings and a gentle place to unwind in nature.",
    howToReach: "Located in Bokaro district; access by local roads and nearby travel routes within the area.",
    image: {
      url: "/images/places/barwaghat.jpeg",
      filename: "barwaghat.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/jTQVYH2qJefHw2vW9?g_st=aw",
  },
  {
    name: "Sita Fall",
    district: "Bokaro",
    category: "waterfall",
    tags: ["waterfall", "nature", "offbeat", "photography"],
    bestSeason: "monsoon",
    description:
      "A quiet waterfall destination in Bokaro with a natural setting, forested surroundings and a peaceful atmosphere for day trips.",
    howToReach: "Reachable through local Bokaro roads; best visited during the monsoon season for the strongest waterfall flow.",
    image: {
      url: "/images/places/sitafallbokaro.jpeg",
      filename: "sitafallbokaro.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/JmurXAGwxMMvhNrT9?g_st=aw",
  },
  {
    name: "Palani Fall",
    district: "Ramgarh",
    category: "waterfall",
    tags: ["nature", "trekking", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A seasonal waterfall near Patratu, surrounded by forest and rocky terrain, offering a quieter nature escape after the monsoon rains.",
    howToReach: "Located around Patratu; check the local route and water conditions before visiting, particularly during the monsoon.",
    image: {
      url: "/images/places/palaniwaterfall.jpg",
      filename: "palaniwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/mRLs2KDBaXpDGoKr6",
  },
  {
    name: "Bagda Valley",
    district: "Ramgarh",
    category: "hill-station",
    tags: ["nature", "scenic", "scenic-drive", "photography"],
    bestSeason: "monsoon",
    description:
      "A green valley landscape around Patratu with winding roads, forested slopes, and broad scenic views that come alive during the rains.",
    howToReach: "Located around Patratu; check local road conditions and access details before setting out.",
    image: {
      url: "/images/places/bagdavalley.jpg",
      filename: "bagdavalley.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/px6GjMfBjFPWa5Kk8",
  },
  {
    name: "Patratu Dam",
    district: "Ramgarh",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A wide reservoir framed by the hills of Patratu, known for open water views, peaceful viewpoints, and memorable sunsets.",
    howToReach: "About 40 km from Ranchi via Patratu; follow local roads to the dam viewpoints and check conditions before visiting.",
    image: {
      url: "/images/places/patratudam.jpg",
      filename: "patratudam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/LZkWzbEuuGTWZdzQ8",
  },
  {
    name: "Patratu Valley",
    district: "Ramgarh",
    category: "dam-lake",
    tags: ["nature", "scenic-drive", "family-friendly", "valley"],
    bestSeason: "all-year",
    description:
      "A winding valley road looping around the Patratu dam reservoir, popular for its hairpin bends and viewpoints overlooking the water.",
    howToReach: "About 40 km from Ranchi, easily done as a half-day drive.",
    image: {
      url: "/images/places/patratuvalley.jpg",
      filename: "patratuvalley.jpg",
    },
    location: { lat: 23.6508, lng: 85.3062 },
    googleMapsUrl: "https://maps.app.goo.gl/4sFYo471Ht9wAS6Q8",
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
      url: "/images/places/badatalab.webp",
      filename: "badatalab.webp",
    },
    location: { lat: 23.3567, lng: 85.3339 },
    googleMapsUrl: "https://maps.app.goo.gl/x2ymPKF4QskwuSWi7",
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
      url: "/images/places/dhurwadam.webp",
      filename: "dhurwadam.webp",
    },
    location: { lat: 23.3067, lng: 85.2858 },
    googleMapsUrl: "https://maps.app.goo.gl/bJ811G7QukeUsANF7",
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
      url: "/images/places/rockgarden.webp",
      filename: "rockgarden.webp",
    },
    location: { lat: 23.4145, lng: 85.3247 },
    googleMapsUrl: "https://maps.app.goo.gl/ZPYLz4gFB2eeqkDc8",
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
      url: "/images/places/tagorehill.webp",
      filename: "tagorehill.webp",
    },
    location: { lat: 23.4015497, lng: 85.3380737 },
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
    googleMapsUrl: "https://maps.app.goo.gl/BRr9PaUH4MtB8XZJ6",
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
    googleMapsUrl: "https://maps.app.goo.gl/ts34mbjibwZt3MKKA",
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
    googleMapsUrl: "https://maps.app.goo.gl/anYAzmGeX9N8W4sU6",
  },
  {
    name: "Bhagwan Birsa Mrigvihar",
    district: "Khunti",
    category: "wildlife",
    tags: ["wildlife", "nature", "family-friendly", "scenic"],
    bestSeason: "winter",
    description:
      "A wildlife sanctuary near Khunti offering visitors the chance to observe deer, birds, and other wildlife in a natural forested habitat with walking trails.",
    howToReach: "Reachable by local roads from Khunti town; check access and entry timings before visiting.",
    image: {
      url: "/images/places/birsamrigvihar.jpg",
      filename: "birsamrigvihar.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/WFcX4MMzWv6mCKFT8",
  },
  {
    name: "Sanitation Park",
    district: "Khunti",
    category: "park",
    tags: ["nature", "park", "family-friendly", "relaxing"],
    bestSeason: "all-year",
    description:
      "A scenic park in Khunti town with green surroundings, walking paths, and a peaceful setting ideal for families and casual outings.",
    howToReach: "Located within Khunti town, easily accessible by local transport.",
    image: {
      url: "/images/places/sanitationpark.jpg",
      filename: "sanitationpark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/T1aQsbDZguCbSYdZ8",
  },
  {
    name: "Khunti Park",
    district: "Khunti",
    category: "park",
    tags: ["nature", "park", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A scenic recreational park in Khunti offering green spaces, natural surroundings, and a calm setting for relaxed family time and outdoor activities.",
    howToReach: "Located in Khunti town; easily reachable by local transport or short drive.",
    image: {
      url: "/images/places/khuntipark.jpg",
      filename: "khuntipark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/F4bWCQAEiLzHkK4b6",
  },
  {
    name: "SDA School Dam",
    district: "Khunti",
    category: "dam-lake",
    tags: ["nature", "dam", "scenic", "relaxing"],
    bestSeason: "all-year",
    description:
      "A scenic dam site near Khunti with calm water views, green surroundings, and a peaceful setting perfect for quiet nature walks and photography.",
    howToReach: "Reachable via local roads in Khunti; confirm the access route locally before visiting.",
    image: {
      url: "/images/places/sdaschooldam.jpg",
      filename: "sdaschooldam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Uqqa8rrW2uu35tJL7",
  },
  {
    name: "Birhu Dam",
    district: "Khunti",
    category: "dam-lake",
    tags: ["nature", "dam", "scenic", "sunset"],
    bestSeason: "all-year",
    description:
      "A scenic reservoir in Khunti surrounded by green hills, offering beautiful water views and an ideal setting for picnics and sunset photography.",
    howToReach: "Reachable by local roads from Khunti town; check road conditions before visiting.",
    image: {
      url: "/images/places/birhudam.jpg",
      filename: "birhudam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/u5VP9ecTYwaCC9S48",
  },
  {
    name: "Rani Fall",
    district: "Khunti",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in Khunti that flows strong during the monsoon, surrounded by lush greenery and forested terrain offering a refreshing natural escape.",
    howToReach: "Reach via local Khunti roads and check water levels and route conditions before visiting, especially after heavy rainfall.",
    image: {
      url: "/images/places/ranifall.jpg",
      filename: "ranifall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/rV3NJfEjVLk3wYW3A",
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
    googleMapsUrl: "https://maps.app.goo.gl/sGBJAGng5n5HLSbd6",
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
    googleMapsUrl: "https://maps.app.goo.gl/yWMR5P2bUYTjvx1a9",
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
    googleMapsUrl: "https://maps.app.goo.gl/GMj87bs1G1ZR4Kua7",
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
    googleMapsUrl: "https://maps.app.goo.gl/av6MKkRfsBcY5qA56",
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
    googleMapsUrl: "https://maps.app.goo.gl/PUUSx4LBg7rYeMiZ9",
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
    googleMapsUrl: "https://maps.app.goo.gl/T7pa8TQgBvcyk6vD8",
  },
  {
    name: "Domuhani River Point",
    district: "East Singhbhum",
    category: "hill-station",
    tags: ["nature", "scenic", "photography", "river"],
    bestSeason: "winter",
    description:
      "A scenic riverside viewpoint in Jamshedpur, famous for open views, cool breezes, and a peaceful outing near the flowing water.",
    howToReach: "Reachable by local road from Jamshedpur; check the exact route before visiting for the smoothest drive.",
    image: {
      url: "/images/places/domuhanirivermeetpoint.jpg",
      filename: "domuhanirivermeetpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/fgn8SdQgqGgRzyzC7",
  },
  {
    name: "Jubilee Park",
    district: "East Singhbhum",
    category: "dam-lake",
    tags: ["family-friendly", "nature", "photography", "city-escape"],
    bestSeason: "all-year",
    description:
      "A popular urban green space in Jamshedpur, known for landscaped lawns, tree-lined paths, and a relaxed setting for family walks.",
    howToReach: "Located in the heart of Jamshedpur; easy to reach by local transport or car.",
    image: {
      url: "/images/places/jubileepark.jpg",
      filename: "jubileepark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/dbhEgsqYC7yCJ5EFA",
  },
  {
    name: "Khankripa Hill View",
    district: "East Singhbhum",
    category: "hill-station",
    tags: ["nature", "scenic", "sunrise", "photography"],
    bestSeason: "winter",
    description:
      "A quiet hill viewpoint around Jamshedpur offering wide valley views, clean air, and an easy scenic escape beyond the city.",
    howToReach: "Follow local roads toward the viewpoint and check access conditions before setting out.",
    image: {
      url: "/images/places/khankriparahillpoint.jpg",
      filename: "khankriparahillpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/pcuXTTGFN93uwqrY7",
  },
  {
    name: "Sitarampur Dam",
    district: "East Singhbhum",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A peaceful reservoir near Jamshedpur with open water views, green surroundings, and a calm outing for family picnics or sunset drives.",
    howToReach: "Reachable by road from Jamshedpur; check the local route and dam access before visiting.",
    image: {
      url: "/images/places/sitarampurdam.jpg",
      filename: "sitarampurdam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/qRnjsbTR7yuyRQia8",
  },
  {
    name: "Chota Banki Dam",
    district: "East Singhbhum",
    category: "dam-lake",
    tags: ["nature", "scenic", "photography", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A smaller reservoir setting around Jamshedpur that pairs quiet water views with a relaxed outdoor atmosphere for short getaways.",
    howToReach: "Use local roads to reach the dam area and confirm access conditions before visiting.",
    image: {
      url: "/images/places/chotabankidam.jpg",
      filename: "chotabankidam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/2Y6huTM7LaY9KCxX6",
  },
  {
    name: "Dimna Lake",
    district: "East Singhbhum",
    category: "dam-lake",
    tags: ["nature", "scenic", "boat", "photography"],
    bestSeason: "all-year",
    description:
      "A pretty lake and recreation spot near Jamshedpur, surrounded by hills and known for calm water, boating, and scenic drives.",
    howToReach: "Reachable by road from Jamshedpur; local travel and weather conditions should be checked before visiting.",
    image: {
      url: "/images/places/dimnalake.jpg",
      filename: "dimnalake.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/r6VDMXhj1whuBAWx9",
  },
  {
    name: "Dobo Dam",
    district: "East Singhbhum",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "photography"],
    bestSeason: "all-year",
    description:
      "A scenic dam site around Jamshedpur with open waterviews, quiet surroundings, and easy access for a short nature outing.",
    howToReach: "Follow local roads toward the dam area and check access conditions before setting out.",
    image: {
      url: "/images/places/dobodam.jpg",
      filename: "dobodam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/yXPvKUQqhGj6kzWu8",
  },
  {
    name: "Birhu Dam",
    district: "East Singhbhum",
    category: "dam-lake",
    tags: ["dam", "nature", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A scenic reservoir in the Ulihatu belt, offering calm water views, easy drives and a refreshing stop for relaxed nature outings.",
    howToReach: "Reach via the local route to Ulihatu in East Singhbhum and follow the final approach road to the dam area.",
    image: {
      url: "/images/places/birhudam.jpg",
      filename: "birhudam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Sanatorium Lake",
    district: "East Singhbhum",
    category: "nature",
    tags: ["lake", "nature", "scenic", "relaxing"],
    bestSeason: "all-year",
    description:
      "A calm lake setting in the Ulihatu stretch with open water, green surroundings and a quiet break for slow travellers.",
    howToReach: "Use the local roads in the Ulihatu area and check the final access point before visiting.",
    image: {
      url: "/images/places/ulihatu.jpg",
      filename: "ulihatu.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Hirni Waterfalls",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A forested waterfall stop near Ulihatu with a fresh monsoon feel, greenery and a calm rhythm for short nature breaks.",
    howToReach: "Follow the approach roads toward Ulihatu in East Singhbhum and confirm the final route before visiting.",
    image: {
      url: "/images/places/hirniwaterfalls.jpg",
      filename: "hirniwaterfalls.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Rani Fall",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in the Ulihatu circuit, known for lush surroundings, quick access and a rewarding monsoon stop.",
    howToReach: "Use the local roads around Ulihatu and check current access before heading to the waterfall point.",
    image: {
      url: "/images/places/ranifall.jpg",
      filename: "ranifall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Urlutoli Dam",
    district: "East Singhbhum",
    category: "dam-lake",
    tags: ["dam", "lake", "scenic", "nature"],
    bestSeason: "all-year",
    description:
      "A calm dam and waterbody near Ulihatu that suits relaxed photo stops, easy drives and short scenic outings.",
    howToReach: "Reach by the Ulihatu approach in East Singhbhum and follow the local access road to the dam area.",
    image: {
      url: "/images/places/urlutolidam.jpg",
      filename: "urlutolidam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Ullung Picnic Spot",
    district: "East Singhbhum",
    category: "park",
    tags: ["picnic", "nature", "family-friendly", "relaxing"],
    bestSeason: "all-year",
    description:
      "A relaxed picnic spot in the Ulihatu stretch with open air, greenery and a gentle setting for family outings and short breaks.",
    howToReach: "Use the nearby local roads in the Ulihatu area and check the final approach before visiting.",
    image: {
      url: "/images/places/ullungpicnicspot.jpg",
      filename: "ullungpicnicspot.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/8ehdfVpZ69hD6SPH9",
  },
  {
    name: "Khaladi Hilltop View",
    district: "East Singhbhum",
    category: "hill-station",
    tags: ["viewpoint", "scenic", "photography", "sunrise"],
    bestSeason: "winter",
    description:
      "A scenic hilltop viewpoint in the Ulihatu circuit with wide landscapes, cool breezes and a strong slow-travel feel.",
    howToReach: "Follow the local roads toward Ulihatu and take the final hill approach for the viewpoint stop.",
    image: {
      url: "/images/places/khaladihilltopviewpoint.jpg",
      filename: "khaladihilltopviewpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/M3T45MvPJ7HQy8qS9",
  },
  {
    name: "Pandupuding",
    district: "East Singhbhum",
    category: "nature",
    tags: ["nature", "forest", "offbeat", "photography"],
    bestSeason: "winter",
    description:
      "A forested natural stop in the Ulihatu region that offers quiet surroundings and a memorable break away from busier tourist paths.",
    howToReach: "Use the local access route around Ulihatu in East Singhbhum and confirm the final approach before visiting.",
    image: {
      url: "/images/places/pandupudinng.jpg",
      filename: "pandupudinng.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/s46LeyqUXCiPTFKE9",
  },
  {
    name: "Remta Lake",
    district: "East Singhbhum",
    category: "nature",
    tags: ["lake", "nature", "family-friendly", "scenic"],
    bestSeason: "all-year",
    description:
      "A calm lake in the Ulihatu circuit that adds an easy water stop with gentle scenery, quiet surroundings and short family-friendly outings.",
    howToReach: "Reach through the Ulihatu local road network and confirm the final route to the lake before setting out.",
    image: {
      url: "/images/places/remtalake.jpg",
      filename: "remtalake.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/ihzp9uTaykNjkMSeA",
  },
  {
    name: "Hora P Jungle",
    district: "East Singhbhum",
    category: "nature",
    tags: ["jungle", "nature", "wildlife", "offbeat"],
    bestSeason: "winter",
    description:
      "A jungle stretch in the Ulihatu area that adds a raw, green mood and a rewarding wildlife-and-nature stop for slow travellers.",
    howToReach: "Follow the local road approach toward Ulihatu and check route conditions before heading into the jungle stretch.",
    image: {
      url: "/images/places/horapjungleviewpoint.jpg",
      filename: "horapjungleviewpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/8dCgNt7YTN5xRGYy5",
  },
  {
    name: "Anidih Picnic Spot",
    district: "East Singhbhum",
    category: "park",
    tags: ["picnic", "nature", "family-friendly", "relaxing"],
    bestSeason: "all-year",
    description:
      "A scenic picnic stop in the Ulihatu belt with green surroundings, clear air and an easy setting for family outings.",
    howToReach: "Use the local routes around Ulihatu and confirm the road to the picnic point before visiting.",
    image: {
      url: "/images/places/anidihpicnicspot.jpg",
      filename: "anidihpicnicspot.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/aXsjmuGWt9qBRrGe9",
  },
  {
    name: "Baheya Waterfall",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A waterfall stop in the Ulihatu forest corridor that feels refreshing, quiet and perfect for a short monsoon nature break.",
    howToReach: "Reach via the local road approach to Ulihatu and follow the route to the waterfall area with consideration for seasonal access.",
    image: {
      url: "/images/places/baheyawaterfall.jpg",
      filename: "baheyawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/oXNX9o7atZaYfb8Q7",
  },
  {
    name: "Sita Fall",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "offbeat", "photography"],
    bestSeason: "monsoon",
    description:
      "A quiet waterfall in the Ulihatu route that feels hidden, greener and ideal for a peaceful local nature stop.",
    howToReach: "Use the Ulihatu approach road and confirm the final route before setting out for this waterfall stop.",
    image: {
      url: "/images/places/sita.jpg",
      filename: "sita.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Chiraundi Hill",
    district: "East Singhbhum",
    category: "hill-station",
    tags: ["hill", "viewpoint", "scenic", "nature"],
    bestSeason: "winter",
    description:
      "A hilltop spot in the Ulihatu zone with broad views, cool air and a rewarding natural atmosphere for quick scenic breaks.",
    howToReach: "Reach the Ulihatu approach road and take the final hill route to the viewpoint area before visiting.",
    image: {
      url: "/images/places/chiraundihill.jpg",
      filename: "chiraundihill.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/smsu6iCjXRFki8ZBA",
  },
  {
    name: "Hesakocha Waterfall",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A waterfall stop around Ulihatu with strong monsoon flow, forest cover and a classic easy nature detour feel.",
    howToReach: "Use the local approach roads in the Ulihatu belt and check current conditions before arriving at the waterfall.",
    image: {
      url: "/images/places/hoseakochawaterfall.jpg",
      filename: "hoseakochawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Kulguru Hill",
    district: "East Singhbhum",
    category: "hill-station",
    tags: ["hill", "viewpoint", "nature", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill view in the Ulihatu route offering open landscapes, cool air and a memorable stop for photography lovers.",
    howToReach: "Follow the local hill route to Ulihatu and check the final approach before visiting this viewpoint.",
    image: {
      url: "/images/places/kulguruhill.jpg",
      filename: "kulguruhill.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/UM5zE8CsWKPLszi98",
  },
  {
    name: "Panchghagh Falls",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A waterfall stop in the Ulihatu zone with layered stream flow, forested surroundings and a quieter local charm.",
    howToReach: "Access the Ulihatu route in East Singhbhum and follow the local road to the waterfall area before visiting.",
    image: {
      url: "/images/places/panchghag.jpg",
      filename: "panchghag.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Big Blue Pond",
    district: "East Singhbhum",
    category: "nature",
    tags: ["lake", "nature", "relaxing", "scenic"],
    bestSeason: "all-year",
    description:
      "A calm blue-water pond in the Ulihatu circuit that suits slow mornings, easy walks and quiet family breaks.",
    howToReach: "Reach through Ulihatu local roads and confirm the final approach before visiting this quiet pond stop.",
    image: {
      url: "/images/places/bigbluepond.jpg",
      filename: "bigbluepond.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/14Q6q46DrdPyeCsm6",
  },
  {
    name: "Perwaghagh Waterfall",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A quiet waterfall around Ulihatu with enough natural drama to feel rewarding while still staying peaceful and a little hidden.",
    howToReach: "Use local roads in the Ulihatu area and confirm the access route before heading out.",
    image: {
      url: "/images/places/perwaghaghwaterfall.jpg",
      filename: "perwaghaghwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Chandil Dam",
    district: "East Singhbhum",
    category: "dam-lake",
    tags: ["dam", "nature", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A wide dam and lake setting near the Ulihatu belt, good for relaxed drives, watching the water and short day-outs in nature.",
    howToReach: "Follow the local route toward Ulihatu and the surrounding dam network before visiting this scenic water body.",
    image: {
      url: "/images/places/chandildam.jpg",
      filename: "chandildam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Bandi Dam",
    district: "East Singhbhum",
    category: "dam-lake",
    tags: ["dam", "nature", "scenic", "relaxing"],
    bestSeason: "all-year",
    description:
      "A quiet dam site in and around the Ulihatu route that gives travellers easy, scenic water views and a restful break.",
    howToReach: "Use the nearby Ulihatu roads and the map link to reach the dam area with minimal detour.",
    image: {
      url: "/images/places/bandidam.jpg",
      filename: "bandidam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Triu Fall",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in the Ulihatu stretch offering a fresh, forested nature stop and an easy detour for waterfall lovers.",
    howToReach: "Follow the local access route to Ulihatu and check the final waterfall road before visiting.",
    image: {
      url: "/images/places/tirufall.jpg",
      filename: "tirufall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Dalma Hill Top",
    district: "East Singhbhum",
    category: "hill-station",
    tags: ["hill", "viewpoint", "nature", "photography"],
    bestSeason: "winter",
    description:
      "A prominent hilltop around the Ulihatu belt that offers broad views and an easy nature escape with panoramic surroundings.",
    howToReach: "Follow the hill route around Ulihatu and confirm the final approach to the top before travelling.",
    image: {
      url: "/images/places/dalmahilltop.jpg",
      filename: "dalmahilltop.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Lota Hill View",
    district: "East Singhbhum",
    category: "hill-station",
    tags: ["viewpoint", "nature", "scenic", "sunrise"],
    bestSeason: "winter",
    description:
      "A panoramic hill viewpoint in the Ulihatu circuit that gives travellers a calm, elevated base for sunrise or sunset stops.",
    howToReach: "Use the local hill roads around Ulihatu and check the final access route before driving up.",
    image: {
      url: "/images/places/lotahillview.jpg",
      filename: "lotahillview.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/AEnZSM6KpqZho4Um8",
  },
  {
    name: "Chunri Waterfall",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A quieter waterfall in the Ulihatu circle that adds a peaceful nature detour and a fresh green stop after the rains.",
    howToReach: "Follow the road to the Ulihatu area and check the final waterfall approach before visiting.",
    image: {
      url: "/images/places/churnifall.jpg",
      filename: "churnifall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/SEmTvBW5uH2q6y9JA",
  },
  {
    name: "Manjhi Lake",
    district: "East Singhbhum",
    category: "nature",
    tags: ["lake", "nature", "family-friendly", "relaxing"],
    bestSeason: "all-year",
    description:
      "A calm lake stop in the Ulihatu area with peaceful water views and an easy setting for slow local outings.",
    howToReach: "Reach the Ulihatu route in East Singhbhum and follow the local approach road to the lake area.",
    image: {
      url: "/images/places/remtalake.jpg",
      filename: "remtalake.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/zHG4smessUJ78U8C9",
  },
  {
    name: "Sunrise Point Kiriburu Hill Top",
    district: "West Singhbhum",
    category: "hill-station",
    tags: ["sunrise", "viewpoint", "hill", "scenic"],
    bestSeason: "winter",
    description:
      "A dramatic hilltop sunrise point near Kiriburu with a commanding view, cool morning air and a memorable landscape for slow travellers.",
    howToReach: "Use the local road approach to Kiriburu in West Singhbhum and follow the route to the sunrise viewpoint area.",
    image: {
      url: "/images/places/sunrisepointkiriburu.jpg",
      filename: "sunrisepointkiriburu.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/3M4vwYuq5n3Bnc6r6",
  },
  {
    name: "Ghaghirathi Waterfall",
    district: "West Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A forested waterfall near Kiriburu that offers a refreshing stop with lush greenery, cool air and a strong natural rhythm.",
    howToReach: "Reach the Kiriburu route in West Singhbhum and follow the local approach to the waterfall point before visiting.",
    image: {
      url: "/images/places/ghaghirathiwaterfall.jpg",
      filename: "ghaghirathiwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Hm5SjNC3F1Gfijok9",
  },
  {
    name: "Jhinkara Waterfall",
    district: "West Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A quieter waterfall near Kiriburu, known for a refreshing flow and a calmer, greener experience away from busier routes.",
    howToReach: "Use the local roads around Kiriburu in West Singhbhum and confirm the final waterfall route before heading out.",
    image: {
      url: "/images/places/jhinkrawaterfall.jpg",
      filename: "jhinkrawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/GJff837i3nB4QLma9",
  },
  {
    name: "Pacheri Waterfall",
    district: "West Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall stop around Kiriburu with forest surroundings, a fresh flow and a rewarding nature break for travellers.",
    howToReach: "Follow the local approach roads around Kiriburu in West Singhbhum and use the map route to the waterfall point.",
    image: {
      url: "/images/places/pacheriwaterfall.jpg",
      filename: "pacheriwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/MQ5eufnuPnLdRP427",
  },
  {
    name: "Kiriburu Meghahatuburu Tour",
    district: "West Singhbhum",
    category: "nature",
    tags: ["tour", "scenic", "forest", "viewpoint"],
    bestSeason: "winter",
    description:
      "A broad nature tour around Kiriburu and Meghahatuburu, combining hilltop views, lush forests and a memorable scenic circuit for slow travel.",
    howToReach: "Reach Kiriburu and the nearby Meghahatuburu route in West Singhbhum by following the local road network and map directions.",
    image: {
      url: "/images/places/kiriburumeghahatuburu.jpg",
      filename: "kiriburumeghahatuburu.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/ZWxh8VGY6pbGXbpP9",
  },
  {
    name: "Golden Fall",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "photography"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in Ghatshila that feels refreshing, forested and quietly dramatic, especially during the rainy season when the flow is at its best.",
    howToReach: "Head toward Ghatshila in East Singhbhum and use the map route for the exact approach to this waterfall point.",
    image: {
      url: "/images/places/goldenfall.jpg",
      filename: "goldenfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/vLSWgzLpKc1syhPK8",
  },
  {
    name: "Toroda Waterfalls",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["nature", "waterfall", "scenic", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A beautiful waterfall stop around Ghatshila, known for greener surroundings, quieter trails and a strong monsoon appeal for travellers.",
    howToReach: "Use the local route toward Ghatshila and confirm the final approach before visiting, especially after rain.",
    image: {
      url: "/images/places/torodawaterfalls.jpg",
      filename: "torodawaterfalls.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/L5tXpjTQZC8cDGFP7",
  },
  {
    name: "Britishera Bridge",
    district: "East Singhbhum",
    category: "heritage",
    tags: ["heritage", "history", "city", "scenic"],
    bestSeason: "all-year",
    description:
      "A historic bridge in Ghatshila that brings together colonial-era character, river views and a memorable stop for history lovers and slow travellers.",
    howToReach: "Located in the Ghatshila area of East Singhbhum; use the local roads and map link for the exact route.",
    image: {
      url: "/images/places/britisherabridge.jpg",
      filename: "britisherabridge.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/3dPKbJwtcGvYoEci8",
  },
  {
    name: "Ghatshila Tourism",
    district: "East Singhbhum",
    category: "nature",
    tags: ["scenic", "nature", "tourism", "relaxing"],
    bestSeason: "all-year",
    description:
      "A scenic tourist point in Ghatshila that captures the region's easy hill-country charm, green valleys and slow-travel atmosphere.",
    howToReach: "Reach Ghatshila via local roads in East Singhbhum and use the map to navigate the exact tourist area for your visit.",
    image: {
      url: "/images/places/ghatshilatourism.jpg",
      filename: "ghatshilatourism.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/eR6om3fjJYEEH4wA9",
  },
  {
    name: "Burudi Dam",
    district: "East Singhbhum",
    category: "dam-lake",
    tags: ["nature", "dam", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A calm dam site near Ghatshila offering wide water views, open surroundings and a relaxing stop for travellers exploring the region.",
    howToReach: "Use the local route toward Ghatshila and confirm the final access point before heading to the dam area.",
    image: {
      url: "/images/places/burudidam.jpg",
      filename: "burudidam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/jFj3L39RorxSmVmXA",
  },
  {
    name: "Dharagiri Fall",
    district: "East Singhbhum",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A striking waterfall near Ghatshila with a lush feel and seasonal flow that makes it a rewarding stop for nature lovers and short excursions.",
    howToReach: "Follow the route to Ghatshila in East Singhbhum and check the final approach before visiting this waterfall spot.",
    image: {
      url: "/images/places/dharagirifall.jpg",
      filename: "dharagirifall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/AetF9eaJS3HSavPM7",
  },
  {
    name: "Raat Mohono",
    district: "East Singhbhum",
    category: "nature",
    tags: ["nature", "scenic", "photography", "offbeat"],
    bestSeason: "all-year",
    description:
      "A quiet natural stop around Ghatshila that brings together open views, greenery and a peaceful feel for travellers who want slower scenic moments.",
    howToReach: "Use the Ghatshila route in East Singhbhum and confirm local access details before setting out for this quiet spot.",
    image: {
      url: "/images/places/raatmohona.jpg",
      filename: "raatmohona.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/r27WaEEpQDuYx4FQ8",
  },
  {
    name: "Subarnarekha Riverside",
    district: "East Singhbhum",
    category: "river",
    tags: ["river", "nature", "scenic", "relaxing"],
    bestSeason: "all-year",
    description:
      "A gentle riverside stretch in Ghatshila that offers calm water views, breezy walks and the kind of easy outdoor atmosphere that suits slow travel.",
    howToReach: "Reach the Ghatshila area in East Singhbhum and follow the map link to the precise riverside point before visiting.",
    image: {
      url: "/images/places/subarnarekhariverside.jpg",
      filename: "subarnarekhariverside.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/6x9ipLTpZ7gVrJ6EA",
  },
  {
    name: "Fuldungri Riverside",
    district: "East Singhbhum",
    category: "river",
    tags: ["river", "nature", "scenic", "relaxing"],
    bestSeason: "all-year",
    description:
      "A calm riverside experience around Ghatshila with easy open views and a peaceful setting that balances nature with a slow local travel mood.",
    howToReach: "Use the local approach to Ghatshila and confirm the riverside access route before visiting this quiet scenic stretch.",
    image: {
      url: "/images/places/fuldungrihillspot.jpg",
      filename: "fuldungrihillspot.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/STWd5R1JZP6h4Nq57",
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
    googleMapsUrl: "https://maps.app.goo.gl/WqKgWTVhFwLwXcAA7",
  },
  {
    name: "Canary Hill",
    district: "Hazaribagh",
    category: "hill-station",
    tags: ["nature", "scenic", "sunrise", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill and viewpoint in Hazaribagh, known for forested surroundings, open views, and a peaceful escape near the town.",
    howToReach: "Located in Hazaribagh; follow local roads and check access conditions before visiting.",
    image: {
      url: "/images/places/canaryhill.jpg.jpg",
      filename: "canaryhill.jpg.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/9hLbNtuBs82sghZR9",
  },
  {
    name: "Salparni Waterfall",
    district: "Hazaribagh",
    category: "waterfall",
    tags: ["nature", "waterfall", "trekking", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A seasonal waterfall near Hazaribagh, offering a refreshing nature outing among rocks and greenery during the monsoon.",
    howToReach: "Located near Hazaribagh; confirm the local route and water conditions before setting out.",
    image: {
      url: "/images/places/Salparni waterfall.jpg",
      filename: "Salparni waterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/xo6xzBvnERYLet6a6",
  },
  {
    name: "Hazaribagh Jheel",
    district: "Hazaribagh",
    category: "nature",
    tags: ["nature", "scenic", "photography", "relaxing"],
    bestSeason: "all-year",
    description:
      "A calm water body in Hazaribagh that offers a scenic and peaceful stop for nature lovers, slow walks and quiet photography.",
    howToReach: "Reach via local routes around Hazaribagh and confirm the latest access details before setting out.",
    image: {
      url: "/images/places/hazaribaghjheel.jpg",
      filename: "hazaribaghjheel.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/hScMY5aoaejP51Bs5",
  },
  {
    name: "Chota Jheel",
    district: "Hazaribagh",
    category: "nature",
    tags: ["nature", "water", "family-friendly", "photography"],
    bestSeason: "all-year",
    description:
      "A small scenic water spot in Hazaribagh ideal for a quiet outing, relaxed sightseeing, and a simple nature break.",
    howToReach: "Check local access and road conditions before visiting, especially if travelling from nearby towns.",
    image: {
      url: "/images/places/chotajheel.jpg",
      filename: "chotajheel.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/1uSzoA4jrtx1Wcs77",
  },
  {
    name: "Galwaan Valley",
    district: "Hazaribagh",
    category: "nature",
    tags: ["nature", "valley", "scenic", "trekking"],
    bestSeason: "winter",
    description:
      "A scenic valley near Hazaribagh offering beautiful green views, open landscapes, and a rewarding outing for nature lovers.",
    howToReach: "Plan your route carefully and check local conditions before visiting, as valley access can vary by season.",
    image: {
      url: "/images/places/galwaanvalley.jpeg",
      filename: "galwaanvalley.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/1aNQekhRZB4ZnZBH7",
  },
  {
    name: "Dhardhariya Waterfall",
    district: "Lohardaga",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "photography"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in Lohardaga surrounded by forested terrain and a quiet natural setting, best enjoyed during the monsoon when the flow is strongest.",
    howToReach: "Reach via local routes around Lohardaga and confirm the latest access conditions before visiting.",
    image: {
      url: "/images/places/dhardhariyawaterfalls.jpg",
      filename: "dhardhariyawaterfalls.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/DKd8G98AYiqqWvMN9",
  },
  {
    name: "Local Dam",
    district: "Lohardaga",
    category: "dam-lake",
    tags: ["nature", "scenic", "family-friendly", "relaxing"],
    bestSeason: "all-year",
    description:
      "A peaceful dam and lake setting in Lohardaga suitable for relaxed drives, open views, and a simple outing close to nature.",
    howToReach: "Check local road access and directions before visiting as the best approach may vary by season.",
    image: {
      url: "/images/places/localdam.jpg",
      filename: "localdam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/B8Qb9F6Zz1nG9dHB8",
  },
  {
    name: "Korbamble Hill",
    district: "Lohardaga",
    category: "hill-station",
    tags: ["nature", "scenic", "sunrise", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill in Lohardaga that adds an easy natural viewpoint option for morning drives, relaxed walks, and photography.",
    howToReach: "Follow local routes around Lohardaga and check weather conditions before setting out.",
    image: {
      url: "/images/places/korambehills.jpg",
      filename: "korambehills.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Com6jVnRwHd6X52h9",
  },
  {
    name: "Kekrang Waterfall",
    district: "Lohardaga",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A lesser-known waterfall in Lohardaga surrounded by green terrain and a quiet setting, ideal for nature lovers seeking a peaceful outing.",
    howToReach: "Local routes may change with the season, so confirm access and road conditions before visiting.",
    image: {
      url: "/images/places/kekrangwaterfalls.jpg",
      filename: "kekrangwaterfalls.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/B5M4PDxXQfM7o4QV9",
  },
  {
    name: "Upper Hisri Hills",
    district: "Lohardaga",
    category: "hill-station",
    tags: ["nature", "scenic", "trekking", "photography"],
    bestSeason: "winter",
    description:
      "Rolling elevated terrain in Lohardaga offering a peaceful hill experience, forested vistas, and a rewarding escape into nature.",
    howToReach: "Check local access routes and weather conditions before heading out to the higher points.",
    image: {
      url: "/images/places/uperhisrihills.jpg",
      filename: "uperhisrihills.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/ZGWBqSGDA58SjkKB6",
  },
  {
    name: "Black Hills",
    district: "Lohardaga",
    category: "hill-station",
    tags: ["nature", "scenic", "sunrise", "photography"],
    bestSeason: "winter",
    description:
      "A rugged hill landscape in Lohardaga known for dramatic terrain, broad views, and a striking natural backdrop for travellers.",
    howToReach: "Reach by local roads around Lohardaga and plan for a short hike or drive depending on the route chosen.",
    image: {
      url: "/images/places/blackhills.jpg",
      filename: "blackhills.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/sUc41kVJdHRqwLrj7",
  },
  {
    name: "South Koyel River",
    district: "Lohardaga",
    category: "nature",
    tags: ["nature", "river", "scenic", "photography"],
    bestSeason: "all-year",
    description:
      "A scenic river stretch in Lohardaga that adds a relaxing natural stop for riverside views, photography, and quiet outings.",
    howToReach: "Check current local access points and the best road approach before visiting the river stretch.",
    image: {
      url: "/images/places/southkoyelriver.jpg",
      filename: "southkoyelriver.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/4RWWjYkfJSE28P3n9",
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
    googleMapsUrl: "https://maps.app.goo.gl/9gsmpLEYEHZYcqGo7",
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
    googleMapsUrl: "https://maps.app.goo.gl/eve5xTY5eH7xj85u9",
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
    googleMapsUrl: "https://maps.app.goo.gl/fJT27bqwHEknefDq6",
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
    googleMapsUrl: "https://maps.app.goo.gl/RtNCSnR6Bajvapwa7",
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
    googleMapsUrl: "https://maps.app.goo.gl/hTRNbywyaZeuUfKy9",
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
    googleMapsUrl: "https://maps.app.goo.gl/4fzUtwpt4mCZnMZg9",
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
    googleMapsUrl: "https://maps.app.goo.gl/776PYstQVyHGH5kg8",
  },
  {
    name: "Churni Falls",
    district: "Ranchi",
    category: "waterfall",
    tags: ["nature", "trekking", "offbeat", "photography"],
    bestSeason: "monsoon",
    description:
      "A quiet forest waterfall surrounded by rocky slopes and dense green cover, suited to travellers looking for a peaceful monsoon outing.",
    howToReach: "Check the local route and water conditions before visiting, particularly during the monsoon.",
    image: {
      url: "/images/places/churnifall.jpg",
      filename: "churnifall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/PvwMN3qPvA4uVKEZ8",
  },
  {
    name: "Sanam Falls",
    district: "Ranchi",
    category: "waterfall",
    tags: ["nature", "trekking", "offbeat", "photography"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall tucked into a forested landscape, offering a refreshing nature escape and a rewarding setting for photography.",
    howToReach: "Check the local route and water conditions before visiting, particularly during the monsoon.",
    image: {
      url: "/images/places/sanamfall.jpg",
      filename: "sanamfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/FmuQQEnCELi8ouEt7",
  },
  {
    name: "Sursu Valley",
    district: "Ranchi",
    category: "hill-station",
    tags: ["nature", "scenic", "scenic-drive", "photography"],
    bestSeason: "monsoon",
    description:
      "A green valley landscape surrounded by rolling hills, open views, and forested stretches, especially vivid after the monsoon rains.",
    howToReach: "Check the local route and weather conditions before visiting, particularly during the monsoon.",
    image: {
      url: "/images/places/sursuvalley.jpg",
      filename: "sursuvalley.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/iBDYFUECPSB2PeLX7",
  },
  {
    name: "Navratangarh Fort",
    district: "Gumla",
    category: "tribal-heritage",
    tags: ["history", "tribal-heritage", "offbeat", "photography"],
    bestSeason: "winter",
    description:
      "A historic fort and archaeological site near Gumla, offering a glimpse into the region's cultural heritage and royal past.",
    howToReach: "Located near Gumla; check local road conditions and access details before visiting.",
    image: {
      url: "/images/places/navratnagarhfort.jpg",
      filename: "navratnagarhfort.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/PFVTyMzQDTM6fRXP8",
  },
  {
    name: "Nagefeni Waterfall",
    district: "Gumla",
    category: "waterfall",
    tags: ["nature", "waterfall", "trekking", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A seasonal waterfall near Gumla surrounded by green countryside and rocky terrain, best visited when the monsoon flow is strong.",
    howToReach: "Located near Gumla; confirm the local route and water conditions before setting out.",
    image: {
      url: "/images/places/nagfeni.jpg",
      filename: "nagfeni.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/zkQNopw8jCurHh2o9",
  },
  {
    name: "Lodu Waterfall",
    district: "Gumla",
    category: "waterfall",
    tags: ["nature", "waterfall", "trekking", "photography"],
    bestSeason: "monsoon",
    description:
      "A quiet forest waterfall near Gumla, offering a refreshing nature escape and scenic views during the rainy season.",
    howToReach: "Located near Gumla; check local access and water conditions before visiting, particularly during the monsoon.",
    image: {
      url: "/images/places/loduwaterfall.jpg",
      filename: "loduwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/enQCQH1cFfsj3uxM9",
  },
  {
    name: "Sono Waterfall",
    district: "Gumla",
    category: "waterfall",
    tags: ["nature", "waterfall", "offbeat", "photography"],
    bestSeason: "monsoon",
    description:
      "A scenic seasonal waterfall near Gumla, surrounded by the plateau's green landscape and rocky streams.",
    howToReach: "Located near Gumla; confirm the local route and seasonal access conditions before visiting.",
    image: {
      url: "/images/places/sonowaterfall.jpg",
      filename: "sonowaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/PHhu1h6MePhEYSnD6",
  },
  {
    name: "Luna Waterfall",
    district: "Gumla",
    category: "waterfall",
    tags: ["nature", "waterfall", "offbeat", "photography"],
    bestSeason: "monsoon",
    description:
      "A lesser-known waterfall near Gumla, suited to travellers looking for a peaceful monsoon outing in nature.",
    howToReach: "Located near Gumla; check local road and water conditions before setting out.",
    image: {
      url: "/images/places/lunawaterfall.png",
      filename: "lunawaterfall.png",
    },
    googleMapsUrl: "https://maps.app.goo.gl/LZDQGo6vVMGDhDkSA",
  },
  {
    name: "Unchdih Waterfall",
    district: "Gumla",
    category: "waterfall",
    tags: ["nature", "waterfall", "trekking", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A seasonal waterfall near Gumla with a quiet, rugged setting that comes alive after the monsoon rains.",
    howToReach: "Located near Gumla; confirm the local route and water conditions before visiting.",
    image: {
      url: "/images/places/unchdihwaterfall.jpg",
      filename: "unchdihwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/ev5jqF1Gt9tE4nFa9",
  },
  {
    name: "Saru Lake",
    district: "Gumla",
    category: "dam-lake",
    tags: ["nature", "scenic", "photography", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A peaceful lake near Gumla with open water views and a relaxed setting for a quiet nature stop.",
    howToReach: "Located near Gumla; check local access details before setting out.",
    image: {
      url: "/images/places/sarulake.jpg",
      filename: "sarulake.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/tusvwF3wGw125rCs9",
  },
  {
    name: "Bamhni Dam",
    district: "Gumla",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "photography"],
    bestSeason: "all-year",
    description:
      "A scenic reservoir near Gumla, offering open views, quiet surroundings, and a restful stop outside town.",
    howToReach: "Located near Gumla; check local road conditions and access details before visiting.",
    image: {
      url: "/images/places/bamhnidam.jpg",
      filename: "bamhnidam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/u5aHociLjXCrLkbF9",
  },
  {
    name: "Sahana Pahari",
    district: "Dhanbad",
    category: "hill-station",
    tags: ["nature", "scenic", "trekking", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill destination in Dhanbad, offering open views and a peaceful setting for a short nature escape.",
    howToReach: "Check the local route and weather conditions before visiting, especially during the monsoon.",
    image: {
      url: "/images/places/sahanapahari.jpg",
      filename: "sahanapahari.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/pNR5a8MfF2jt8pyi8",
  },
  {
    name: "Topchanchi Dam",
    district: "Dhanbad",
    category: "dam-lake",
    tags: ["dam", "lake", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A scenic dam and reservoir area in Topchanchi with broad water views, easy access and a calm outing feel for travellers around Dhanbad.",
    howToReach: "Reach via local roads around Dhanbad and follow the route to the Topchanchi dam area before visiting.",
    image: {
      url: "/images/places/topchanchidam.jpeg",
      filename: "topchanchidam.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/QmYp8Bpaa4mqrhmx7",
  },
  {
    name: "Topchanchi Lake View Point",
    district: "Dhanbad",
    category: "nature",
    tags: ["lake", "viewpoint", "scenic", "nature"],
    bestSeason: "all-year",
    description:
      "A panoramic lake viewpoint in Topchanchi with broad water views, gentle greenery and a relaxing setting for a slow nature stop.",
    howToReach: "Use the local route to Topchanchi in Dhanbad and follow the map direction to the lake-view access point.",
    image: {
      url: "/images/places/topchanchilakeviewpoint.jpeg",
      filename: "topchanchilakeviewpoint.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/LJoQNnDNJgUnPdnu7",
  },
  {
    name: "Topchanchi Lake",
    district: "Dhanbad",
    category: "nature",
    tags: ["lake", "nature", "family-friendly", "scenic"],
    bestSeason: "all-year",
    description:
      "A calm lake setting in Topchanchi that offers water views, easy drives and a quiet destination feel for short family outings and slow travel days.",
    howToReach: "Reach through the local roads around Topchanchi in Dhanbad and use the map route to the lake area before visiting.",
    image: {
      url: "/images/places/topchanchilake.jpeg",
      filename: "topchanchilake.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/f4xvRwTF9F4qoHAk7",
  },
  {
    name: "Bamangora Waterfall",
    district: "Dhanbad",
    category: "waterfall",
    tags: ["nature", "waterfall", "photography", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A refreshing waterfall near Topchanchi in Dhanbad, surrounded by greenery and ideal for a short nature outing after the rains.",
    howToReach: "Reach via local roads around Topchanchi in Dhanbad; check local road access and weather conditions before visiting, especially during the monsoon season.",
    image: {
      url: "/images/places/bamangorawaterfall.jpg.jpeg",
      filename: "bamangorawaterfall.jpg.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/bVWD3y1rP7aUPwWM8",
  },
  {
    name: "Bhatinda Waterfall",
    district: "Dhanbad",
    category: "waterfall",
    tags: ["nature", "waterfall", "photography", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall near Topchanchi in Dhanbad, tucked into a green landscape and best enjoyed during the monsoon when the flow is strongest.",
    howToReach: "Reachable via local roads around Topchanchi in Dhanbad; check the current route and weather conditions before heading out.",
    image: {
      url: "/images/places/bhatindawaterfall.jpg.jpeg",
      filename: "bhatindawaterfall.jpg.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/FFFjv1TPDaWS9FyA8",
  },
  {
    name: "Topchanchi Waterfall",
    district: "Dhanbad",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in the Topchanchi area with good flow during monsoon season, surrounded by lush greenery and ideal for nature lovers and photographers.",
    howToReach: "Reach via local roads around Topchanchi in Dhanbad; best visited during the monsoon season when water flow is strong.",
    image: {
      url: "/images/places/topchanchiwaterfall.jpg",
      filename: "topchanchiwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/d5e6jvRzt4Pi1xon7",
  },
  {
    name: "Petrified Wood",
    district: "Dhanbad",
    category: "nature",
    tags: ["nature", "history", "photography", "geology"],
    bestSeason: "all-year",
    description:
      "A distinctive natural site in Dhanbad where ancient fossilized wood and geological formations offer an unusual and memorable outing.",
    howToReach: "Reach via local roads around Dhanbad; confirm access and route details before visiting.",
    image: {
      url: "/images/places/jharkhand.jpg",
      filename: "jharkhand.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/PVDPxSK6jpgfynjA7",
  },
  {
    name: "Rajendra Sarovar Park",
    district: "Dhanbad",
    category: "park",
    tags: ["nature", "family-friendly", "relaxing", "photography"],
    bestSeason: "all-year",
    description:
      "A calm urban park in Dhanbad with open spaces, a lake setting, and a relaxed environment for family outings and evening walks.",
    howToReach: "Easy to reach by local roads within Dhanbad; check the latest access conditions before visiting.",
    image: {
      url: "/images/places/jharkhand.jpg",
      filename: "jharkhand.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/AAYM1hCVQoxPUsdn8",
  },
  {
    name: "Maithon Waterfall",
    district: "Dhanbad",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A refreshing waterfall near Maithon with a strong monsoon flow, forested surroundings and an easy nature stop for slow travellers.",
    howToReach: "Reach Maithon via the local roads around Dhanbad and confirm the final approach before visiting.",
    image: {
      url: "/images/places/maithonwaterfall.jpg",
      filename: "maithonwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/YWGgwuBFCqoho5q16",
  },
  {
    name: "Maithon Dam",
    district: "Dhanbad",
    category: "dam-lake",
    tags: ["dam", "nature", "scenic", "photography"],
    bestSeason: "all-year",
    description:
      "A broad reservoir and dam landscape at Maithon that delivers calm water views, open roads and an easy scenic break within the Damodar region.",
    howToReach: "Follow the local route toward Maithon in Dhanbad and use the map link for the final access point to the dam area.",
    image: {
      url: "/images/places/maithondam.jpg",
      filename: "maithondam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/erDnJMh2aqnG49Mk9",
  },
  {
    name: "Maithon View Point",
    district: "Dhanbad",
    category: "nature",
    tags: ["viewpoint", "scenic", "nature", "photography"],
    bestSeason: "winter",
    description:
      "A scenic viewpoint near Maithon with open valley views, quiet roads and a rewarding stop for landscape photography and slow drives.",
    howToReach: "Use the local approach roads around Maithon in Dhanbad and check the route before setting out for the final viewpoint stretch.",
    image: {
      url: "/images/places/maithonviewpoint.jpg",
      filename: "maithonviewpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/tFWKyGKVUtYPKCUm7",
  },
  {
    name: "Maithon Sunset Point",
    district: "Dhanbad",
    category: "nature",
    tags: ["sunset", "viewpoint", "scenic", "nature"],
    bestSeason: "winter",
    description:
      "A calm sunset point in Maithon offering wide skies, reservoir views and a peaceful end-of-day stop amid the hills and forest edges.",
    howToReach: "Reach via the roads leading into Maithon in Dhanbad and follow the map route to the sunset-facing access point.",
    image: {
      url: "/images/places/maithonsunsetpoint.jpg",
      filename: "maithonsunsetpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/GQB1F3N8ssZcANTYA",
  },
  {
    name: "Maithon Forest",
    district: "Dhanbad",
    category: "nature",
    tags: ["forest", "nature", "offbeat", "scenic"],
    bestSeason: "winter",
    description:
      "A green forested stretch near Maithon that adds a quiet natural feel to the area and suits slow drives, birdwatching and relaxed breaks.",
    howToReach: "Follow the local forest approach roads around Maithon in Dhanbad and check access conditions before heading in.",
    image: {
      url: "/images/places/maithonforest.jpg",
      filename: "maithonforest.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Kop5UT29GXbg16dM9",
  },
  {
    name: "Maithon Jungle",
    district: "Dhanbad",
    category: "nature",
    tags: ["jungle", "nature", "wildlife", "offbeat"],
    bestSeason: "winter",
    description:
      "A wooded jungle stretch around Maithon that brings a raw, quiet natural atmosphere and a rewarding stop for slower travel and nature lovers.",
    howToReach: "Use the local roads around Maithon in Dhanbad and confirm the route for the jungle approach before visiting.",
    image: {
      url: "/images/places/maithonjungle.jpg",
      filename: "maithonjungle.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/25haiyFoWa4ow1RV7",
  },
  {
    name: "Sidhabai Tourist Spot",
    district: "Dhanbad",
    category: "nature",
    tags: ["scenic", "nature", "family-friendly", "relaxing"],
    bestSeason: "all-year",
    description:
      "A scenic tourist stop near Maithon that offers easy access, natural surroundings and a comfortable place for short family outings and quick scenic breaks.",
    howToReach: "Reach by the local routes around Maithon in Dhanbad and use the map link for the exact approach.",
    image: {
      url: "/images/places/sidhabaritouristspot.jpg",
      filename: "sidhabaritouristspot.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/8WxFrnheDQvwXmoz6",
  },
  {
    name: "Millennium Park",
    district: "Dhanbad",
    category: "park",
    tags: ["park", "family-friendly", "relaxing", "nature"],
    bestSeason: "all-year",
    description:
      "A calm park in the Maithon area that makes for easy family outings, short walks and a relaxed break in green surroundings.",
    howToReach: "Follow the local roads around Maithon in Dhanbad and use the map link to reach the park entrance easily.",
    image: {
      url: "/images/places/milleniumpark.jpg",
      filename: "milleniumpark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Tryv25y15s9oAueW8",
  },
  {
    name: "Panchet Dam Waterfall",
    district: "Dhanbad",
    category: "waterfall",
    tags: ["waterfall", "nature", "scenic", "monsoon"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall near the Maithon-Panchet corridor, known for fresh flow, lush greenery and a beautiful setting for short nature trips.",
    howToReach: "Reach by the local route through the Maithon and Panchet stretch in Dhanbad and check the eventual access point before visiting.",
    image: {
      url: "/images/places/panchetdamwaterfall.jpg",
      filename: "panchetdamwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/3KYqNWrJQgz7JDRF9",
  },
  {
    name: "Chalna Waterfall",
    district: "Dhanbad",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A quiet waterfall stop near Maithon that adds a refreshing natural break with greenery, a calm feel and a strong monsoon charm.",
    howToReach: "Use the local roads around Maithon in Dhanbad and follow the map route to the final waterfall access point.",
    image: {
      url: "/images/places/chalnawaterfall.jpg",
      filename: "chalnawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/VfPjpbLH99ozgGtf9",
  },
  {
    name: "Gangabihar Park",
    district: "Sahibganj",
    category: "park",
    tags: ["nature", "family-friendly", "relaxing", "scenic"],
    bestSeason: "all-year",
    description:
      "A peaceful riverside park in Sahebganj that works well for relaxed walks, family outings, and scenic views along the Ganga corridor.",
    howToReach: "Reachable by local roads in Sahebganj; check the exact short route before visiting for the smoothest trip.",
    image: {
      url: "/images/places/gangabiharpark.jpg",
      filename: "gangabiharpark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/uAeAoSk358ZCv3mYA",
  },
  {
    name: "Jhilmil Waterfall",
    district: "Sahibganj",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "photography"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in Sahebganj, surrounded by greenery and best experienced after the rains when the flow is strongest and the landscape is lush.",
    howToReach: "Use local roads around Sahebganj and confirm access conditions before visiting, especially after heavy rainfall.",
    image: {
      url: "/images/places/jhilmilwaterfall.jpg",
      filename: "jhilmilwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/a72KqfsNND574eei6",
  },
  {
    name: "Sahibganj Pahari Waterfall",
    district: "Sahibganj",
    category: "waterfall",
    tags: ["nature", "waterfall", "offbeat", "trekking"],
    bestSeason: "monsoon",
    description:
      "A picturesque hill waterfall in Sahebganj that gives travellers a refreshing natural stop with forested surroundings and a quiet local feel.",
    howToReach: "Follow local routes in Sahebganj and check weather conditions before setting out, as hillside access can vary in the monsoon.",
    image: {
      url: "/images/places/sahibganjpahariwaterfall.jpg",
      filename: "sahibganjpahariwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/DjBJQMm3VSZtkXpK8",
  },
  {
    name: "Mainatalab",
    district: "Sahibganj",
    category: "nature",
    tags: ["lake", "nature", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A calm lake and green-space stop in Rajmahal that adds a refreshing water edge, family-friendly ambience and a simple place for relaxed sightseeing.",
    howToReach: "Use the local roads around Rajmahal in Sahibganj and follow the route to the lake area before visiting.",
    image: {
      url: "/images/places/mainatalab.jpg",
      filename: "mainatalab.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Sq4ihNUMG2J2B9oq6",
  },
  {
    name: "Baradari",
    district: "Sahibganj",
    category: "heritage",
    tags: ["heritage", "history", "culture", "scenic"],
    bestSeason: "all-year",
    description:
      "A historic architectural landmark in Rajmahal that reflects the region's cultural depth and adds a quiet heritage stop to the area.",
    howToReach: "Reach via the local roads around Rajmahal in Sahibganj and follow the route to the heritage site before visiting.",
    image: {
      url: "/images/places/baradari.jpg",
      filename: "baradari.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/KsLWurmYVVdQDqUd8",
  },
  {
    name: "Tinpahar View Point",
    district: "Sahibganj",
    category: "hill-station",
    tags: ["viewpoint", "nature", "scenic", "sunset"],
    bestSeason: "winter",
    description:
      "A scenic hill viewpoint in Rajmahal that offers open views, a cool atmosphere and a wonderful place to pause for landscapes and sunsets.",
    howToReach: "Reach via local roads around Rajmahal in Sahibganj and follow the route to the hill viewpoint area before visiting.",
    image: {
      url: "/images/places/tinpaharviewpoint.jpg",
      filename: "tinpaharviewpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/HmFw5ftnHtYHJzUA6",
  },
  {
    name: "Akbari Masjid",
    district: "Sahibganj",
    category: "heritage",
    tags: ["heritage", "history", "culture", "architecture"],
    bestSeason: "all-year",
    description:
      "A heritage mosque in Rajmahal that adds spiritual and historic character to the area and makes a meaningful stop on a cultural visit.",
    howToReach: "Follow the local route around Rajmahal in Sahibganj and use the map directions to reach the mosque area before visiting.",
    image: {
      url: "/images/places/akbarimasjid.jpg",
      filename: "akbarimasjid.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/BgLwFUnBgAc48o1E7",
  },
  {
    name: "Motijharna Waterfall",
    district: "Sahibganj",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A quiet waterfall stream in Sahebganj that provides a smooth natural retreat with greenery, strong seasonal flow, and a relaxed countryside mood.",
    howToReach: "Reach via local Sahebganj roads and check current route conditions before visiting, especially during the wet season.",
    image: {
      url: "/images/places/motijharnawaterfall.jpg",
      filename: "motijharnawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/qPatfpLxtvMgoiMV7",
  },
  {
    name: "Radha Krishna Ojha Ganga View Point",
    district: "Sahibganj",
    category: "nature",
    tags: ["scenic", "river", "sunset", "photography"],
    bestSeason: "all-year",
    description:
      "A scenic river-view point in Sahebganj that brings together open Ganga views, peaceful surroundings, and a relaxing stop for travellers and photographers.",
    howToReach: "Look for local access roads in Sahebganj before visiting, and plan your trip to catch the best morning or evening river views.",
    image: {
      url: "/images/places/radhakrishnaojhagangaviewpoint.jpg",
      filename: "radhakrishnaojhagangaviewpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/WqWZVjXK4PT5nibJ9",
  },
  {
    name: "Local Jharna",
    district: "Sahibganj",
    category: "waterfall",
    tags: ["nature", "waterfall", "offbeat", "local"],
    bestSeason: "monsoon",
    description:
      "A small local waterfall in Sahebganj that captures the charm of the region's natural terrain and offers a simple, accessible outing for travellers.",
    howToReach: "Reach through local roads in Sahebganj and confirm the route and water conditions before visiting, especially after rain.",
    image: {
      url: "/images/places/localjharna.jpg",
      filename: "localjharna.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/KDiba2dgioJLP8tS9",
  },
  {
    name: "King Palace",
    district: "Sahibganj",
    category: "park",
    tags: ["heritage", "scenic", "history", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A historic palace landmark in Sahibganj that adds cultural depth to the region and gives visitors a notable heritage stop with a local character.",
    howToReach: "Reach through local roads in Sahibganj and confirm the most direct route before visiting, especially if travelling from nearby towns.",
    image: {
      url: "/images/places/Saraikelapalace.jpg",
      filename: "Saraikelapalace.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/TZFSa594nNQyTqow7",
  },
  {
    name: "Bandi Dam",
    district: "Sahibganj",
    category: "dam-lake",
    tags: ["nature", "scenic", "sunset", "relaxing"],
    bestSeason: "all-year",
    description:
      "A peaceful dam site in Sahibganj that gives visitors wide-open water views and a relaxed place for an easy outing or scenic stop.",
    howToReach: "Follow the local roads around Sahibganj and check access conditions before visiting, especially after rainfall.",
    image: {
      url: "/images/places/bandidam.jpg",
      filename: "bandidam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/pxRZWWv4pV6GgdyaA",
  },
  {
    name: "Dalma Hill Top",
    district: "Sahibganj",
    category: "hill-station",
    tags: ["scenic", "viewpoint", "photography", "nature"],
    bestSeason: "winter",
    description:
      "A scenic hilltop stop in Sahibganj that offers open views, cool air, and a relaxed setting for photography and short nature breaks.",
    howToReach: "Use local access roads in Sahibganj and check weather conditions before the trip, especially during monsoon periods.",
    image: {
      url: "/images/places/dalmahilltop.jpg",
      filename: "dalmahilltop.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/QLv56sdC5Jb6Negv9",
  },
  {
    name: "Ganjia Barrage",
    district: "Sahibganj",
    category: "dam-lake",
    tags: ["nature", "river", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A broad river barrage in Sahibganj that adds a calm, open-water experience and works well for a scenic family outing or quick stopover.",
    howToReach: "Reach via local Sahibganj roads and plan ahead for the last stretch, especially if you are visiting during the rainy season.",
    image: {
      url: "/images/places/ganjiabarriage.jpg",
      filename: "ganjiabarriage.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/ad2e2SyC1dMUQQjS7",
  },
  {
    name: "River View Park",
    district: "Sahibganj",
    category: "park",
    tags: ["nature", "river", "relaxing", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A riverside park in Sahibganj that offers calm views, easy walking space, and a relaxed setting for family time and local outings.",
    howToReach: "Follow local access roads in Sahibganj and confirm the nearest entry point before visiting for a smoother trip.",
    image: {
      url: "/images/places/riverviewpark.jpg",
      filename: "riverviewpark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/5ygGKZJ6F1gXLp369",
  },
  {
    name: "Hesakocha Waterfall",
    district: "Sahibganj",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "photography"],
    bestSeason: "monsoon",
    description:
      "A refreshing waterfall in Sahibganj set amid greenery, best enjoyed after the rains when the flow is stronger and the surroundings feel most alive.",
    howToReach: "Use local routes around Sahibganj and check road and weather conditions before setting out, especially after heavy rainfall.",
    image: {
      url: "/images/places/hoseakochawaterfall.jpg",
      filename: "hoseakochawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/uUHmCZKmUUQ12jUPA",
  },
  {
    name: "Saraikela Rajmahal",
    district: "Sahibganj",
    category: "nature",
    tags: ["heritage", "history", "culture", "scenic"],
    bestSeason: "all-year",
    description:
      "A heritage-rich landmark in Sahibganj that adds cultural depth and historical interest to the district for curious travellers and heritage lovers.",
    howToReach: "Reach via local roads in Sahibganj and confirm the exact route before heading out to avoid delays.",
    image: {
      url: "/images/places/saraikelarajmahal.jpg",
      filename: "saraikelarajmahal.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/fCw3FbiH4kL2uBt28",
  },
  {
    name: "Chandil Dam",
    district: "Sahibganj",
    category: "dam-lake",
    tags: ["nature", "water", "scenic", "relaxing"],
    bestSeason: "all-year",
    description:
      "A calm dam landscape in Sahibganj that offers broad water views, a peaceful setting, and a simple break for travellers looking to slow down.",
    howToReach: "Use local roads around Sahibganj and plan for the last stretch in advance, especially if visiting during the monsoon.",
    image: {
      url: "/images/places/chandildam.jpg",
      filename: "chandildam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/8tymeLEngCYUUE396",
  },
  {
    name: "Saraikela Palace",
    district: "Sahibganj",
    category: "nature",
    tags: ["heritage", "history", "culture", "photography"],
    bestSeason: "all-year",
    description:
      "A historic palace site in Sahibganj with an elegant local story and a calm, cultural setting that enriches the district's travel appeal.",
    howToReach: "Reach through the local road network in Sahibganj and check the nearest access point before planning your visit.",
    image: {
      url: "/images/places/Saraikelapalace.jpg",
      filename: "Saraikelapalace.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/yWusJz3zxsMbHxhPA",
  },
  {
    name: "Kelaghat Dam",
    district: "Simdega",
    category: "dam-lake",
    tags: ["nature", "dam", "scenic", "relaxing"],
    bestSeason: "all-year",
    description:
      "A scenic dam in Simdega with a calm water body and a quiet setting that suits a relaxed day trip and easy landscape photography.",
    howToReach: "Use the local roads around Simdega and check route conditions before visiting, especially during the rainy season.",
    image: {
      url: "/images/places/kelaghatdam.jpg",
      filename: "kelaghatdam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/5t4gorpchCXkoJDx5",
  },
  {
    name: "Kobang Dam",
    district: "Simdega",
    category: "dam-lake",
    tags: ["nature", "dam", "water", "scenic"],
    bestSeason: "all-year",
    description:
      "A peaceful dam landscape in Simdega where open water views and quiet surroundings create a restful stop for travellers.",
    howToReach: "Reach via local routes in Simdega and confirm the fastest access road before setting out.",
    image: {
      url: "/images/places/kobangdam.jpg",
      filename: "kobangdam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/FNaBfcdGt9LUdBJA9",
  },
  {
    name: "Rajadera Picnic Spot",
    district: "Simdega",
    category: "park",
    tags: ["family-friendly", "picnic", "nature", "relaxing"],
    bestSeason: "all-year",
    description:
      "A laid-back picnic point in Simdega with open surroundings and easy access for family outings, short breaks, and scenic refreshment stops.",
    howToReach: "Follow the local road network in Simdega and check the nearest access approach before planning your outing.",
    image: {
      url: "/images/places/rajaderapicnicspot.jpg",
      filename: "rajaderapicnicspot.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/EfskzXXAULW9SmiM9",
  },
  {
    name: "Eraap Dam",
    district: "Simdega",
    category: "dam-lake",
    tags: ["nature", "dam", "scenic", "sunset"],
    bestSeason: "all-year",
    description:
      "A scenic dam in Simdega that adds a calm water viewpoint and a good stop for travellers looking for slow, quiet discoveries.",
    howToReach: "Use local roads around Simdega and check access conditions before visiting, especially during the monsoon.",
    image: {
      url: "/images/places/eraapdam.jpg",
      filename: "eraapdam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/hKXtBd4Fs4R9NM5bA",
  },
  {
    name: "Heaven Hills Simdega",
    district: "Simdega",
    category: "hill-station",
    tags: ["scenic", "hill", "viewpoint", "photography"],
    bestSeason: "winter",
    description:
      "A panoramic hill setting in Simdega with open views, cool air, and an easy landscape stop for travellers seeking a quiet highland feel.",
    howToReach: "Travel by the local road network in Simdega and confirm the best route before setting out to the hilltop area.",
    image: {
      url: "/images/places/heavenhillsimdega.jpg",
      filename: "heavenhillsimdega.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/kimKNi7mhf9QdRgN9",
  },
  {
    name: "Kairbera Dam",
    district: "Simdega",
    category: "dam-lake",
    tags: ["nature", "dam", "water", "relaxing"],
    bestSeason: "all-year",
    description:
      "A calm dam-setting in Simdega that gives visitors open water views and a slower, more peaceful break from the road.",
    howToReach: "Check the local route in Simdega and allow extra time for the final stretch if conditions are wet.",
    image: {
      url: "/images/places/kairberadam.jpg",
      filename: "kairberadam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/W53fWvotWRiDg6U48",
  },
  {
    name: "Dangadi Waterfall",
    district: "Simdega",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A flowing waterfall in Simdega set among green terrain, ideal for travellers wanting a natural, quieter monsoon experience.",
    howToReach: "Follow the local routes around Simdega and confirm seasonal access before visiting for the safest trip.",
    image: {
      url: "/images/places/dangadiwaterfall.jpg",
      filename: "dangadiwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/RHQAsnxUMSTWZD2w6",
  },
  {
    name: "Simdega Basantpur",
    district: "Simdega",
    category: "nature",
    tags: ["scenic", "nature", "local", "photography"],
    bestSeason: "all-year",
    description:
      "A scenic local stop in Simdega that combines open landscape views with a slower, more grounded travel experience.",
    howToReach: "Use the local roads around Simdega and check the final access route before visiting, especially during wet months.",
    image: {
      url: "/images/places/simdegabasantpur.jpg",
      filename: "simdegabasantpur.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/2mPE9B8ne9CBJEYcA",
  },
  {
    name: "Gurunda Ghagh Kolebira Simdega",
    district: "Simdega",
    category: "nature",
    tags: ["nature", "scenic", "heritage", "local"],
    bestSeason: "all-year",
    description:
      "A natural and scenic stop in Simdega that captures the region's quieter landscape, open surroundings, and local charm.",
    howToReach: "Use the local road network around Simdega and plan your route carefully for the last stretch before arrival.",
    image: {
      url: "/images/places/Gurunda%20Ghagh%20kolebira%20.jpg",
      filename: "Gurunda Ghagh kolebira .jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/v1ec2rvdB1N8s3KQ7",
  },
  {
    name: "Rani Waterfall",
    district: "Simdega",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A picturesque waterfall in Simdega that adds a rewarding natural stop and a refreshing monsoon escape for travellers.",
    howToReach: "Plan your route via local roads in Simdega and check weather conditions before visiting, especially after heavy rain.",
    image: {
      url: "/images/places/raniwaterfall.jpg",
      filename: "raniwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/8jKsJpcZE9mGagNL6",
  },
  {
    name: "Kelaghat Dam Center",
    district: "Simdega",
    category: "dam-lake",
    tags: ["nature", "dam", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A scenic central dam stop in Simdega that brings together open water, quiet roads, and an easy break for travellers and families.",
    howToReach: "Reach by the local road network in Simdega and confirm the best approach before heading out, especially during the monsoon season.",
    image: {
      url: "/images/places/kelaghaghdamcenter.jpg",
      filename: "kelaghaghdamcenter.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/DnpxcDzK32adS8xf7",
  },
  {
    name: "Kachahari Talab",
    district: "West Singhbhum",
    category: "dam-lake",
    tags: ["nature", "lake", "family-friendly", "scenic"],
    bestSeason: "all-year",
    description:
      "A calm water body in Chaibasa that gives travellers a relaxed local lake stop for slow evenings, family outings and short scenic breaks.",
    howToReach: "In and around Chaibasa, West Singhbhum; use the map link for the exact route and nearby access points.",
    image: {
      url: "/images/places/kachaharitalabpark.jpg",
      filename: "kachaharitalabpark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/TJU16HHZxhzDGU2v5",
  },
  {
    name: "Lupungutu Jharna",
    district: "West Singhbhum",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall near Chaibasa, set in a greener landscape and ideal for a quieter natural stop with a refreshing monsoon feel.",
    howToReach: "Use the local roads around Chaibasa in West Singhbhum and confirm the final approach before visiting.",
    image: {
      url: "/images/places/lupungtujharna.jpg",
      filename: "lupungtujharna.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/ww6XPbDcywQmrPVZ6",
  },
  {
    name: "Chaibasa Clock Tower",
    district: "West Singhbhum",
    category: "tribal-heritage",
    tags: ["heritage", "history", "city", "culture"],
    bestSeason: "all-year",
    description:
      "A recognizable local landmark in Chaibasa that adds heritage character to the town and gives travellers a simple, iconic stop for a short walk.",
    howToReach: "Located in the heart of Chaibasa, West Singhbhum; use the nearby local roads and the map link for precise directions.",
    image: {
      url: "/images/places/chaibasaclocktower.jpg",
      filename: "chaibasaclocktower.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/fnZywseYHr7QZHZc9",
  },
  {
    name: "Jubilee Lake Park",
    district: "West Singhbhum",
    category: "park",
    tags: ["park", "family-friendly", "relaxing", "nature"],
    bestSeason: "all-year",
    description:
      "A calm park and lakeside escape in Chaibasa, perfect for an easy family stop, a short walk and a quiet scenic break in town.",
    howToReach: "In Chaibasa, West Singhbhum; use the local route and the map link for the nearest access point.",
    image: {
      url: "/images/places/jubileelakepark.jpg",
      filename: "jubileelakepark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/6QuDUECmUm6zVWEG8",
  },
  {
    name: "Badipahadi",
    district: "West Singhbhum",
    category: "nature",
    tags: ["saranda", "forest", "scenic", "viewpoint"],
    bestSeason: "winter",
    description:
      "Badipahadi is a quiet scenic stop in the Saranda hills, giving travellers a forested view and a peaceful break in the region's natural landscape.",
    howToReach: "Use the local roads around the Saranda belt in West Singhbhum and follow the nearest map route to Badipahadi.",
    image: {
      url: "/images/places/badipahadi.jpg",
      filename: "badipahadi.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/EyQi5CS7R4u4heBF6",
  },
  {
    name: "Meghahatuburu Sunset View Point",
    district: "West Singhbhum",
    category: "nature",
    tags: ["saranda", "sunset", "viewpoint", "scenic"],
    bestSeason: "winter",
    description:
      "A scenic sunset point in the Saranda region, known for wide valley views, forest edges, and a calm evening atmosphere.",
    howToReach: "Reach via the local roads around Saranda in West Singhbhum and use the route map for the final approach to the sunset point.",
    image: {
      url: "/images/places/meghahatuburusunsetviewpoint.jpg",
      filename: "meghahatuburusunsetviewpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/1khFQAD654S9gtY29",
  },
  {
    name: "Thoriya",
    district: "West Singhbhum",
    category: "nature",
    tags: ["saranda", "forest", "nature", "travel"],
    bestSeason: "all-year",
    description:
      "Thoriya adds a quieter, greener stop in the Saranda stretch with forest roads, open surroundings and an easy slow-travel feel.",
    howToReach: "Follow the local route through the Saranda area in West Singhbhum and confirm the nearest approach before visiting.",
    image: {
      url: "/images/places/thoriya.jpg",
      filename: "thoriya.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/tNb73hbXpGpaMruN9",
  },
  {
    name: "Chandramarni Forest Suriya",
    district: "West Singhbhum",
    category: "nature",
    tags: ["saranda", "forest", "nature", "photography"],
    bestSeason: "winter",
    description:
      "A forested scenic stretch in the Saranda region that suits slow drives, nature walks and quiet, photogenic stops under the trees.",
    howToReach: "Use the local roads through the Saranda forest region in West Singhbhum and take the final route shown on the map link.",
    image: {
      url: "/images/places/chandramarniforestsuriya.jpg",
      filename: "chandramarniforestsuriya.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/kLUhDj6wnUjouYei6",
  },
  {
    name: "Saranda Forest",
    district: "West Singhbhum",
    category: "nature",
    tags: ["saranda", "forest", "nature", "offbeat"],
    bestSeason: "winter",
    description:
      "Saranda Forest brings the region's dense greenery, quiet roads and big natural charm together in one of the most distinctive landscapes in the plateau.",
    howToReach: "Reach the Saranda forest region in West Singhbhum via the local route network and use the map link for the nearest access point.",
    image: {
      url: "/images/places/sarandaforest.jpg",
      filename: "sarandaforest.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Be96uZNFatGtfxsU9",
  },
  {
    name: "Jonha Falls",
    district: "West Singhbhum",
    category: "waterfall",
    tags: ["saranda", "waterfall", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in the Saranda stretch that adds a fresh monsoon stop with rich greenery, easy viewpoints and a quiet forest feel.",
    howToReach: "Use the local roads around the Saranda area in West Singhbhum and follow the route map for the last stretch to Jonha Falls.",
    image: {
      url: "/images/places/jonha.jpg",
      filename: "jonha.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/WHeYq6D4rD5Qy7p59",
  },
  {
    name: "Dassam Falls",
    district: "West Singhbhum",
    category: "waterfall",
    tags: ["saranda", "waterfall", "monsoon", "nature"],
    bestSeason: "monsoon",
    description:
      "Dassam Falls adds a dramatic waterfall stop in the Saranda route, with striking water flow, open viewpoints and a memorable nature break.",
    howToReach: "Approach by the local roads in the Saranda belt of West Singhbhum and use the map route to reach the waterfall point.",
    image: {
      url: "/images/places/dassam.jpg",
      filename: "dassam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/JASgXCo1SrTcLueQ6",
  },
  {
    name: "Lilatari Waterfall",
    district: "Pakur",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in Pakur that brings a refreshing natural stop and a calm monsoon escape amid the district's forested landscape.",
    howToReach: "Use the local roads in Pakur and check the final access route before visiting, especially during the rainy season.",
    image: {
      url: "/images/places/lilatariwaterfall.jpg",
      filename: "lilatariwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/mC2xNX4TgVkzEB3p7",
  },
  {
    name: "Kanchangar Ghufa",
    district: "Pakur",
    category: "nature",
    tags: ["cave", "nature", "heritage", "offbeat"],
    bestSeason: "all-year",
    description:
      "A distinctive cave-and-hill stop in Pakur that adds a sense of discovery and local geological interest to a peaceful countryside outing.",
    howToReach: "Follow the local roads in Pakur and confirm the nearby approach route before heading to the cave area.",
    image: {
      url: "/images/places/kanchangarghufa.png",
      filename: "kanchangarghufa.png",
    },
    googleMapsUrl: "https://maps.app.goo.gl/nVSVAfwnu5F7aa8KA",
  },
  {
    name: "Mountain Hills Ramnathpur",
    district: "Pakur",
    category: "hill-station",
    tags: ["scenic", "viewpoint", "nature", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill area in Pakur with open landscape views, cool air, and a rewarding setting for short nature outings and photography.",
    howToReach: "Use the local roads in Pakur and check the final approach before visiting this hillspot for the smoothest trip.",
    image: {
      url: "/images/places/mountainhillsramnathpur.jpg",
      filename: "mountainhillsramnathpur.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/bKzKYLiTFw6TaK11A",
  },
  {
    name: "Nagarnabi Sunset Point",
    district: "Pakur",
    category: "hill-station",
    tags: ["sunset", "scenic", "photography", "nature"],
    bestSeason: "winter",
    description:
      "A quiet sunset viewpoint in Pakur that brings broad evening skies and a relaxed, scenic stop to travellers exploring the district.",
    howToReach: "Reach by local routes in Pakur and plan the timing to catch the best evening view before sunset.",
    image: {
      url: "/images/places/nagarnabisunsetpoint.jpg",
      filename: "nagarnabisunsetpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/YN5VjoUuRXSU7LLy6",
  },
  {
    name: "Bangaikalam Waterfall",
    district: "Koderma",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "photography"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in Koderma that offers refreshing natural views and a peaceful escape surrounded by lush greenery during the rainy season.",
    howToReach: "Reachable via local roads in Koderma; check water levels and route conditions before visiting, especially after heavy rainfall.",
    image: {
      url: "/images/places/bangaikalanwaterfall.jpg",
      filename: "bangaikalanwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/1YXwZKATczcq7wv46",
  },
  {
    name: "Koderma Wildlife Sanctuary",
    district: "Koderma",
    category: "wildlife",
    tags: ["wildlife", "nature", "trekking", "scenic"],
    bestSeason: "winter",
    description:
      "A protected sanctuary in Koderma with diverse flora, fauna, and woodland trails that offer a rewarding nature exploration experience.",
    howToReach: "Follow local routes toward the sanctuary and check access timings and any permit requirements before visiting.",
    image: {
      url: "/images/places/kodermawildlifesanctuary.jpg",
      filename: "kodermawildlifesanctuary.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/BLdvPiReN53jrcfG6",
  },
  {
    name: "DVC Dam",
    district: "Koderma",
    category: "dam-lake",
    tags: ["nature", "dam", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A broad reservoir in Koderma offering open water views, peaceful surroundings, and a calm setting for family outings and scenic stops.",
    howToReach: "Reachable by road from Koderma town; check local access routes and current conditions before planning your visit.",
    image: {
      url: "/images/places/DVCdam.jpg",
      filename: "DVCdam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/96vnRbLcccdy1LX29",
  },
  {
    name: "Tilaiya Dam",
    district: "Koderma",
    category: "dam-lake",
    tags: ["nature", "dam", "scenic", "sunset"],
    bestSeason: "all-year",
    description:
      "A scenic dam site in Koderma with wide water views, green surroundings, and an ideal setting for relaxed day trips and sunset viewpoints.",
    howToReach: "Use local roads around Koderma and plan for the final approach; check seasonal water levels and access conditions before visiting.",
    image: {
      url: "/images/places/tilaiyadam.jpg",
      filename: "tilaiyadam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/9wFcFVVgu6kfq82A9",
  },
  {
    name: "Jhumri Tilaiya Dam",
    district: "Koderma",
    category: "dam-lake",
    tags: ["nature", "dam", "scenic", "photography"],
    bestSeason: "all-year",
    description:
      "A picturesque dam landscape in Koderma with calm water views, lush surroundings, and a quiet setting perfect for photography and peaceful breaks.",
    howToReach: "Reach via local Koderma roads and confirm the access route for the smoothest trip, especially during monsoon periods.",
    image: {
      url: "/images/places/jhumritilaiyadam.jpg",
      filename: "jhumritilaiyadam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/9gAxiHd53N6khb5t7",
  },
  {
    name: "Rajatalab",
    district: "Koderma",
    category: "nature",
    tags: ["scenic", "nature", "relaxing", "photography"],
    bestSeason: "all-year",
    description:
      "A scenic spot in Koderma known for its natural beauty, calm surroundings, and a relaxed setting ideal for quiet nature appreciations and photography.",
    howToReach: "Follow local access roads in Koderma and check directions locally before heading to this site for the best navigation.",
    image: {
      url: "/images/places/rajatalab.jpg",
      filename: "rajatalab.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/M78pU5ZTuWQD6kGx6",
  },
  {
    name: "Shitalkund",
    district: "Koderma",
    category: "nature",
    tags: ["nature", "scenic", "family-friendly", "relaxing"],
    bestSeason: "all-year",
    description:
      "A scenic natural site in Koderma offering peaceful surroundings, calm views, and an ideal spot for family outings and gentle nature walks.",
    howToReach: "Reachable via local Koderma roads; confirm the nearest access point and current conditions before planning your visit.",
    image: {
      url: "/images/places/shitalkund.jpg",
      filename: "shitalkund.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/XWiSDDEQiPPNFhXZ6",
  },
  {
    name: "Brindaha Waterfall",
    district: "Koderma",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A refreshing waterfall in Koderma set amid greenery, best enjoyed during the monsoon when the flow is strong and the surroundings feel lush.",
    howToReach: "Use local routes in Koderma and check weather and water conditions before setting out, especially after heavy rainfall.",
    image: {
      url: "/images/places/brindahawaterfall.jpg",
      filename: "brindahawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/1DwEK3Rzb1ZU2qcN7",
  },
  {
    name: "Maharshi Kardam Park",
    district: "Koderma",
    category: "park",
    tags: ["nature", "park", "family-friendly", "relaxing"],
    bestSeason: "all-year",
    description:
      "A scenic park in Koderma with natural surroundings, walking paths, and a calm setting ideal for family time and peaceful outdoor experiences.",
    howToReach: "Located within Koderma town; easily accessible by local transport or short drive from the city center.",
    image: {
      url: "/images/places/Maharshi Kardam Park Koderma.jpg",
      filename: "Maharshi Kardam Park Koderma.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/fY4GdNfbk2sKNRkPA",
  },
  {
    name: "Barakar River",
    district: "Jamtara",
    category: "nature",
    tags: ["river", "scenic", "photography", "nature"],
    bestSeason: "all-year",
    description:
      "A scenic riverside spot in Jamtara offering calm water views, lush surroundings, and a peaceful setting ideal for relaxation and nature photography.",
    howToReach: "Reachable via local roads from Jamtara town; confirm the access route locally before visiting.",
    image: {
      url: "/images/places/barakarriver.jpg",
      filename: "barakarriver.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/PUtn4FG63kidHZYc9",
  },
  {
    name: "Parvat Vihar",
    district: "Jamtara",
    category: "hill-station",
    tags: ["scenic", "viewpoint", "nature", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hilltop location in Jamtara offering broad landscape views, cool air, and an ideal setting for nature lovers and photography enthusiasts.",
    howToReach: "Reach via local roads in Jamtara and check the final approach before visiting for the smoothest trip.",
    image: {
      url: "/images/places/parvatvihar.jpg",
      filename: "parvatvihar.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/FvQoodUKAfXG388x9",
  },
  {
    name: "Ladhna Hilltop Viewpoint",
    district: "Jamtara",
    category: "hill-station",
    tags: ["viewpoint", "scenic", "photography", "sunrise"],
    bestSeason: "winter",
    description:
      "A scenic viewpoint in Jamtara with panoramic views of the surrounding hills and valleys, perfect for sunrise and sunset photography.",
    howToReach: "Follow local access roads in Jamtara and check the final route before heading up for the best experience.",
    image: {
      url: "/images/places/ladhnahilltopviewpoint.jpg",
      filename: "ladhnahilltopviewpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/3GMryCYo8womFQLy8",
  },
  {
    name: "Kashidanga Picnic Spot",
    district: "Jamtara",
    category: "park",
    tags: ["nature", "picnic", "family-friendly", "relaxing"],
    bestSeason: "all-year",
    description:
      "A scenic picnic spot in Jamtara surrounded by green spaces and natural surroundings, ideal for family day trips and casual relaxation.",
    howToReach: "Easily reachable from Jamtara town by local roads; check access conditions before planning your visit.",
    image: {
      url: "/images/places/kashidangapicnicspot.jpg",
      filename: "kashidangapicnicspot.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/dEk5dgrDU7Wxym6PA",
  },
  {
    name: "Kelahi Picnic Point",
    district: "Jamtara",
    category: "park",
    tags: ["nature", "picnic", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A peaceful picnic area in Jamtara with natural surroundings and calm settings perfect for family outings and relaxed nature appreciation.",
    howToReach: "Reachable via local roads from Jamtara; confirm access points and current conditions before visiting.",
    image: {
      url: "/images/places/kelahipicnicspot.jpg",
      filename: "kelahipicnicspot.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/kdfpWKegT1haN5ox6",
  },
  {
    name: "Kelahi Hill",
    district: "Jamtara",
    category: "hill-station",
    tags: ["scenic", "viewpoint", "nature", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill in Jamtara offering elevated views, cool air, and a rewarding natural setting for photography and peaceful escapes.",
    howToReach: "Follow local access roads toward the hilltop and confirm the final approach before heading up for the best experience.",
    image: {
      url: "/images/places/kelahihill.jpg",
      filename: "kelahihill.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/tETfP1486LtyXDYW7",
  },
  {
    name: "Sahardal Overbridge Viewpoint",
    district: "Jamtara",
    category: "nature",
    tags: ["scenic", "viewpoint", "photography", "nature"],
    bestSeason: "all-year",
    description:
      "A scenic viewpoint at the Sahardal overbridge in Jamtara offering unique views and a calm setting for photography and short stops.",
    howToReach: "Located along the highway in Jamtara; easily accessible for quick stops and photography.",
    image: {
      url: "/images/places/sahardaloverbridgeviewpoint.jpg",
      filename: "sahardaloverbridgeviewpoint.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/mEKjFgwMoNU8QxAy9",
  },
  {
    name: "Ladhna Picnic Spot",
    district: "Jamtara",
    category: "park",
    tags: ["picnic", "nature", "family-friendly", "scenic"],
    bestSeason: "all-year",
    description:
      "A scenic picnic area in Jamtara with natural surroundings, calm atmosphere, and ideal settings for family outings and relaxation.",
    howToReach: "Reachable via local Jamtara roads; confirm the access route locally before planning your visit.",
    image: {
      url: "/images/places/ladhnapicnicspot.jpg",
      filename: "ladhnapicnicspot.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/JoWTwYUHiwzLHm4R7",
  },
  {
    name: "Mr Waterfall",
    district: "Deoghar",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in Deoghar surrounded by greenery and calm natural terrain, offering a refreshing stop for nature lovers and families.",
    howToReach: "Reachable via local roads in Deoghar; best visited during the monsoon when water flow is full.",
    image: {
      url: "/images/places/mrwaterfall.jpg",
      filename: "mrwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Y9TnFYLKvx17GFBy5",
  },
  {
    name: "Punasimini Waterfall",
    district: "Deoghar",
    category: "waterfall",
    tags: ["nature", "waterfall", "offbeat", "monsoon"],
    bestSeason: "monsoon",
    description:
      "A beautiful forest waterfall in Deoghar offering a quiet environment, natural greenery, and a calming riverside-like feel for a short escape.",
    howToReach: "Follow local Deoghar roads and check the route before visiting for the smoothest travel experience.",
    image: {
      url: "/images/places/punsaiminiwaterfall.jpg",
      filename: "punsaiminiwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/exTH9n55a7HCGXGYA",
  },
  {
    name: "Bit Pahar",
    district: "Deoghar",
    category: "hill-station",
    tags: ["nature", "hill", "viewpoint", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill spot in Deoghar giving visitors elevated views, fresh air, and a peaceful setting for quick nature outings and photography.",
    howToReach: "Reach via local roads in Deoghar and confirm the approach before setting out.",
    image: {
      url: "/images/places/bitpahar.jpg",
      filename: "bitpahar.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/MaKtc5R6gp5kv3FS7",
  },
  {
    name: "Nandan Pahar",
    district: "Deoghar",
    category: "park",
    tags: ["park", "nature", "family-friendly", "scenic"],
    bestSeason: "all-year",
    description:
      "A pleasant park area in Deoghar that offers calm surroundings, open walking space, and a relaxing setting for family visits.",
    howToReach: "Easily accessible through local Deoghar roads and ideal for a short scenic outing.",
    image: {
      url: "/images/places/nandanpaharpark.jpg",
      filename: "nandanpaharpark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/hr2asWY5SyMQ34b16",
  },
  {
    name: "Shark Lake",
    district: "Deoghar",
    category: "nature",
    tags: ["lake", "nature", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A peaceful lake setting in Deoghar offering calm water, natural surroundings, and a quiet place for relaxed family outings and photography.",
    howToReach: "Reachable by local roads in Deoghar; a convenient area for an easy scenic drive and short stop.",
    image: {
      url: "/images/places/sharklake.jpg",
      filename: "sharklake.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/YwyDhaVbXAepZAC39",
  },
  {
    name: "Purandaha Talab",
    district: "Deoghar",
    category: "nature",
    tags: ["lake", "nature", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A quiet waterbody in Deoghar with scenic surroundings, suitable for relaxed visits and a calm lakeside experience.",
    howToReach: "Accessible through local roads in Deoghar; confirm the route before heading out.",
    image: {
      url: "/images/places/purandahatalab.jpg",
      filename: "purandahatalab.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/7SchVmnPbGiJh8CU7",
  },
  {
    name: "Gautam Pahar",
    district: "Deoghar",
    category: "hill-station",
    tags: ["nature", "hill", "viewpoint", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill point in Deoghar offering a serene atmosphere, open views, and a pleasant place for slow nature outings.",
    howToReach: "Follow local access roads in Deoghar and check the approach before visiting.",
    image: {
      url: "/images/places/gautampahar.jpg",
      filename: "gautampahar.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/QsHx1nNHzhZF6sxA9",
  },
  {
    name: "Punsai Dam",
    district: "Deoghar",
    category: "dam-lake",
    tags: ["dam", "scenic", "nature", "photography"],
    bestSeason: "all-year",
    description:
      "A calm dam setting in Deoghar with open waters and scenic natural surroundings ideal for quiet outings and photography.",
    howToReach: "Reachable via local roads around Deoghar; confirm the route before visiting.",
    image: {
      url: "/images/places/punasidam.jpg",
      filename: "punasidam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/CpTJnZX5xDYLGGgp8",
  },
  {
    name: "Tapovan Hill",
    district: "Deoghar",
    category: "hill-station",
    tags: ["nature", "hill", "scenic", "photography"],
    bestSeason: "winter",
    description:
      "A quiet hill viewpoint in Deoghar with fresh air, open scenery, and a calming atmosphere suited to small family outings and short treks.",
    howToReach: "Accessible by local Deoghar roads; use the drive route carefully before setting out.",
    image: {
      url: "/images/places/tapovanhill.jpg",
      filename: "tapovanhill.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/EsoFjEq4oMy9vJ598",
  },
  {
    name: "Naulakha Temple",
    district: "Deoghar",
    category: "temple",
    tags: ["temple", "heritage", "spiritual", "culture"],
    bestSeason: "all-year",
    description:
      "A revered temple site in Deoghar with cultural and spiritual importance, attracting visitors seeking peaceful darshan and heritage moments.",
    howToReach: "Easily accessible in and around Deoghar, with local transport available for a short visit.",
    image: {
      url: "/images/places/naulakhatemple.jpg",
      filename: "naulakhatemple.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/5LDaerJHWDRt6pMLA",
  },
  {
    name: "Jalsar",
    district: "Deoghar",
    category: "nature",
    tags: ["lake", "nature", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A scenic and calm natural stop in Deoghar known for tranquil water and surroundings ideal for easy outings and relaxed photography.",
    howToReach: "Reach by local roads in Deoghar and plan a calm visit with a short drive from the city center.",
    image: {
      url: "/images/places/jalsarbeauty.jpg",
      filename: "jalsarbeauty.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/2JSCyGU8VdAoNGU98",
  },
  {
    name: "King Digvijaysingh Fort",
    district: "Dumka",
    category: "tribal-heritage",
    tags: ["history", "heritage", "fort", "photography"],
    bestSeason: "winter",
    description:
      "A historic fort in Dumka associated with the region’s royal past, offering a cultural landmark and a scenic setting for heritage walks.",
    howToReach: "Reachable via local roads in Dumka; check local access before planning a heritage visit.",
    image: {
      url: "/images/places/kingdigvijaysinghfort.jpg",
      filename: "kingdigvijaysinghfort.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Kn7wdkbEb8v3vumb9",
  },
  {
    name: "Maharocheck Dam",
    district: "Dumka",
    category: "dam-lake",
    tags: ["dam", "scenic", "nature", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A scenic dam in Dumka with open water views, lush surroundings, and a calm atmosphere ideal for relaxed outings and photography.",
    howToReach: "Accessible by local roads in and around Dumka; confirm the route before visiting.",
    image: {
      url: "/images/places/maharocheckdam.jpg",
      filename: "maharocheckdam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/nwCF81NaoaKuSHsy7",
  },
  {
    name: "Sristi Park Kurwa",
    district: "Dumka",
    category: "park",
    tags: ["park", "family-friendly", "nature", "picnic"],
    bestSeason: "all-year",
    description:
      "A green park in Dumka that offers a relaxed environment for family outings, walks, and quiet leisure time in nature.",
    howToReach: "Easily reachable by local transport within Dumka; plan a short trip for a calm park visit.",
    image: {
      url: "/images/places/sristiparkkurwa.jpg",
      filename: "sristiparkkurwa.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/meX1VgYNe9kB8Bfb9",
  },
  {
    name: "Banki Bera Dam",
    district: "Dumka",
    category: "dam-lake",
    tags: ["dam", "scenic", "nature", "photography"],
    bestSeason: "all-year",
    description:
      "A quiet dam landscape in Dumka with calm vistas and open surroundings that make it pleasant for a relaxed travel stop.",
    howToReach: "Reachable via local Dumka roads; check route conditions before setting out.",
    image: {
      url: "/images/places/bankiberadam.jpg",
      filename: "bankiberadam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/fcXFSYvTzAc9W2V86",
  },
  {
    name: "Dumka Park",
    district: "Dumka",
    category: "park",
    tags: ["park", "nature", "family-friendly", "scenic"],
    bestSeason: "all-year",
    description:
      "A pleasant park in Dumka offering open walking space, greenery, and a calm setting for easy family outings and short city breaks.",
    howToReach: "Located within Dumka and easy to reach by local transport or a short drive.",
    image: {
      url: "/images/places/dumkapark.jpg",
      filename: "dumkapark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/izRtj7HEp1Wu2ijG6",
  },
  {
    name: "Kaira Bani Dam",
    district: "Dumka",
    category: "dam-lake",
    tags: ["dam", "scenic", "nature", "photography"],
    bestSeason: "all-year",
    description:
      "A scenic dam site in Dumka with tranquil water views, open surroundings, and a peaceful environment suitable for short outings.",
    howToReach: "Follow local road access in Dumka and confirm the route before visiting.",
    image: {
      url: "/images/places/kairabanidam.jpg",
      filename: "kairabanidam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/Y85a7Hh5sg5hRiPW6",
  },
  {
    name: "Nakti Hill",
    district: "Dumka",
    category: "hill-station",
    tags: ["nature", "hill", "viewpoint", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill location in Dumka with elevated views, gentle landscapes, and a calm setting for photography and easy nature outings.",
    howToReach: "Reachable by local roads around Dumka; plan a drive and check the route before heading up.",
    image: {
      url: "/images/places/naktihill.jpg",
      filename: "naktihill.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/efHfenurguvxsB9t6",
  },
  {
    name: "Khunta Bandh",
    district: "Dumka",
    category: "nature",
    tags: ["nature", "waterbody", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A quiet natural waterbody in Dumka with peaceful surroundings, making it a suitable stop for slow scenic drives and laid-back family outings.",
    howToReach: "Reach via local roads around Dumka and check access conditions before visiting.",
    image: {
      url: "/images/places/khuntabandh.jpg",
      filename: "khuntabandh.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/N4rpMfZCNEca47Sq6",
  },
  {
    name: "Shiv Pahar",
    district: "Dumka",
    category: "hill-station",
    tags: ["nature", "hill", "scenic", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hill point in Dumka offering open views, cool air, and a peaceful place for short nature walks and quieter outings.",
    howToReach: "Reachable through local Dumka roads; check the final approach before visiting.",
    image: {
      url: "/images/places/shivpahar.jpg",
      filename: "shivpahar.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/tFcFhwx4DLmZ1hgG8",
  },
  {
    name: "Italy",
    district: "Garhwa",
    category: "nature",
    tags: ["nature", "scenic", "viewpoint", "photography"],
    bestSeason: "winter",
    description:
      "A scenic natural spot in Garhwa with open views, gentle landscape texture, and a calm setting for a relaxed outing and photography stop.",
    howToReach: "Reach by local Garhwa roads and plan a short scenic drive to the location before visiting.",
    image: {
      url: "/images/places/italy.jpg",
      filename: "italy.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/6otYFwnizS1KMWX28?g_st=aw",
  },
  {
    name: "Sukhaldari Waterfall",
    district: "Garhwa",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "photography"],
    bestSeason: "monsoon",
    description:
      "A refreshing waterfall in Garhwa, best enjoyed in the monsoon when the flow is strong and the surrounding greenery feels most alive.",
    howToReach: "Accessible through local Garhwa roads; check the weather and route conditions before making the trip.",
    image: {
      url: "/images/places/sukhaldhariwaterfall.jpg",
      filename: "sukhaldhariwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/JMZ7yECxfKe5mTTj7?g_st=aw",
  },
  {
    name: "Gurusindhu Waterfall",
    district: "Garhwa",
    category: "waterfall",
    tags: ["waterfall", "nature", "trekking", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A secluded waterfall in Garhwa known for its natural charm, quiet surroundings, and rewarding monsoon-time views.",
    howToReach: "Reach by local roads in Garhwa and confirm the final access route before visiting, especially during wet weather.",
    image: {
      url: "/images/places/gurusindhuwaterfall.png",
      filename: "gurusindhuwaterfall.png",
    },
    googleMapsUrl: "https://maps.app.goo.gl/oNPWHup6ooWnDSRi7?g_st=aw",
  },
  {
    name: "Aanraj Dam",
    district: "Garhwa",
    category: "dam-lake",
    tags: ["dam", "nature", "scenic", "family-friendly"],
    bestSeason: "all-year",
    description:
      "A calm dam setting in Garhwa offering open water views, peaceful surroundings, and a relaxing stop for a short getaway.",
    howToReach: "Accessible through local roads around Garhwa; check the access route before heading out for the smoothest trip.",
    image: {
      url: "/images/places/aanrajdamreservoir.jpg",
      filename: "aanrajdamreservoir.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/6K44Nw3gA8K1d8cN6?g_st=aw",
  },
  {
    name: "Banda Pahar",
    district: "Garhwa",
    category: "hill-station",
    tags: ["hill", "viewpoint", "nature", "photography"],
    bestSeason: "winter",
    description:
      "A hill viewpoint in Garhwa with a calm atmosphere, panoramic surroundings, and a great setting for easy family outings and photography.",
    howToReach: "Reach via local Garhwa roads and confirm the final route to the viewpoint before setting out.",
    image: {
      url: "/images/places/bandapahar.jpg",
      filename: "bandapahar.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/afaK32jEpoDsWrbC7?g_st=aw",
  },
  {
    name: "Tamasin Waterfall",
    district: "Chatra",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "photography"],
    bestSeason: "monsoon",
    description:
      "A forest waterfall in Chatra where cool mountain air, lush greenery and a strong seasonal flow make it a rewarding stop for nature lovers.",
    howToReach: "Reach through the local roads of Chatra district and use the map route for the final approach, especially during the monsoon season.",
    image: {
      url: "/images/places/tamasinwaterfall.jpeg",
      filename: "tamasinwaterfall.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/7utxmq6wwo7QDoZh9?g_st=aw",
  },
  {
    name: "Goa Waterfall",
    district: "Chatra",
    category: "waterfall",
    tags: ["waterfall", "nature", "scenic", "family-friendly"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in Chatra surrounded by forested slopes and quiet hills, offering a fresh natural escape with easy day-trip appeal.",
    howToReach: "Accessible via local roads in Chatra; follow the map route and check current access before visiting.",
    image: {
      url: "/images/places/goawaterfall.jpg",
      filename: "goawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/ZjXwFSdwwYCWRDQ77?g_st=aw",
  },
  {
    name: "Sumer Dumer Waterfall",
    district: "Chatra",
    category: "waterfall",
    tags: ["waterfall", "nature", "scenic", "offbeat"],
    bestSeason: "monsoon",
    description:
      "A lesser-known waterfall in Chatra with a calm, natural setting and an offbeat feel that suits peaceful nature outings and scenic drives.",
    howToReach: "Head to the Chatra area by local road and use the map route to reach the waterfall spot before visiting.",
    image: {
      url: "/images/places/sumerdumerwwaterfall.jpeg",
      filename: "sumerdumerwwaterfall.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/b1Us7AMSmP3afhRy8?g_st=aw",
  },
  {
    name: "SON Waterfall",
    district: "Chatra",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "photography"],
    bestSeason: "monsoon",
    description:
      "A beautiful waterfall in Chatra known for its seasonal flow, forest backdrop and the quiet, refreshing atmosphere it brings to the region.",
    howToReach: "Reachable through local roads in Chatra and best explored during the monsoon when water levels are strongest.",
    image: {
      url: "/images/places/sonwaterfall.jpeg",
      filename: "sonwaterfall.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/STgskYPnJhVyWyeg6?g_st=aw",
  },
  {
    name: "Maludah Waterfall",
    district: "Chatra",
    category: "waterfall",
    tags: ["waterfall", "nature", "monsoon", "scenic"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall near Chatra with forest surroundings and a calm, natural ambience that makes it a good stop for short scenic trips.",
    howToReach: "Use the local access routes in Chatra and follow the map for the final approach to reach the waterfall conveniently.",
    image: {
      url: "/images/places/maludahwaterfall.jpeg",
      filename: "maludahwaterfall.jpeg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/DEU4uE4puB3upuwD8?g_st=aw",
  },
  {
    name: "Damaklol Waterfall",
    district: "Godda",
    category: "waterfall",
    tags: ["nature", "waterfall", "scenic", "monsoon"],
    bestSeason: "monsoon",
    description:
      "A beautiful waterfall in Godda offering cascading water, lush green surroundings, and a refreshing natural experience ideal for nature lovers.",
    howToReach: "Reachable via local roads in Godda; best visited during monsoon season when water flow is abundant.",
    image: {
      url: "/images/places/damakolwaterfall.jpg",
      filename: "damakolwaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/gAR4gEp5hF26KHCR8",
  },
  {
    name: "Kusumghati Dam",
    district: "Godda",
    category: "nature",
    tags: ["dam", "scenic", "photography", "nature"],
    bestSeason: "all-year",
    description:
      "A scenic dam in Godda offering calm water views, surrounding greenery, and peaceful settings ideal for relaxation and photography.",
    howToReach: "Located within Godda area; easily accessible by local roads from the main town.",
    image: {
      url: "/images/places/kusumghatidam.jpg",
      filename: "kusumghatidam.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/BNK8KdxRJdjkcBvT6",
  },
  {
    name: "Sundar Dam Lahathi",
    district: "Godda",
    category: "nature",
    tags: ["dam", "scenic", "family-friendly", "photography"],
    bestSeason: "all-year",
    description:
      "A scenic dam location in Godda with beautiful water views, lush surroundings, and a calm atmosphere perfect for family visits and nature photography.",
    howToReach: "Accessible via local Godda roads; check the route before visiting to ensure smooth access.",
    image: {
      url: "/images/places/sundardamlahathi.jpg",
      filename: "sundardamlahathi.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/iFADhLYsc8hpo1819",
  },
  {
    name: "Sugwa Pahad",
    district: "Godda",
    category: "hill-station",
    tags: ["scenic", "viewpoint", "nature", "photography"],
    bestSeason: "winter",
    description:
      "A scenic hilltop in Godda offering elevated views, cool air, and beautiful landscapes ideal for photography and peaceful nature escapes.",
    howToReach: "Follow local access roads in Godda toward the hilltop; confirm the final route before heading up for the best experience.",
    image: {
      url: "/images/places/sugwapahad.jpg",
      filename: "sugwapahad.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/DSfcSGdN4H43ezw88",
  },
  {
    name: "Biodiversity Park",
    district: "Godda",
    category: "park",
    tags: ["nature", "park", "family-friendly", "biodiversity"],
    bestSeason: "all-year",
    description:
      "A nature-focused park in Godda showcasing diverse flora and fauna, ideal for nature education, family outings, and peaceful natural experiences.",
    howToReach: "Located in Godda; easily reachable by local transport from the town center.",
    image: {
      url: "/images/places/biodiversitypark.jpg",
      filename: "biodiversitypark.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/prptmJDPCJ5g1R84A",
  },
  {
    name: "Jagritvihar",
    district: "Palamu",
    category: "nature",
    tags: ["scenic", "nature", "relaxing"],
    bestSeason: "all-year",
    description:
      "A scenic natural spot in McCluskieganj area offering peaceful surroundings and nature walks perfect for relaxation and outdoor activities.",
    howToReach: "Located in Palamu district near McCluskieganj; accessible via local roads.",
    image: {
      url: "/images/places/jagritivihar.jpg",
      filename: "jagritivihar.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/XcQ5RBC3ndgB8pSS9",
  },
  {
    name: "Jhunjhuniya Waterfall",
    district: "Palamu",
    category: "waterfall",
    tags: ["nature", "waterfall", "scenic", "monsoon"],
    bestSeason: "monsoon",
    description:
      "A beautiful waterfall in the McCluskieganj region offering refreshing cascades and forest surroundings ideal for nature lovers.",
    howToReach: "Located in Palamu district near McCluskieganj; check local routes before visiting, especially during monsoon season.",
    image: {
      url: "/images/places/jhunjhuniyawaterfall.jpg",
      filename: "jhunjhuniyawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/XcQ5RBC3ndgB8pSS9",
  },
  {
    name: "Watch Tower",
    district: "Palamu",
    category: "hill-station",
    tags: ["scenic", "viewpoint", "photography"],
    bestSeason: "winter",
    description:
      "A scenic viewpoint tower in McCluskieganj offering panoramic views of the surrounding landscape, perfect for photography and nature observation.",
    howToReach: "Reachable via local Palamu district roads near McCluskieganj; confirm access details before heading up.",
    image: {
      url: "/images/places/watchtower.jpg",
      filename: "watchtower.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/YdgEa9jx42mMjZTJ6",
  },
  {
    name: "McCluskieganj",
    district: "Palamu",
    category: "nature",
    tags: ["scenic", "nature", "city-escape"],
    bestSeason: "all-year",
    description:
      "A scenic destination in Palamu offering natural beauty, quiet surroundings and a relaxed atmosphere ideal for short nature getaways and local exploration.",
    howToReach: "Located in Palamu district; easily accessible via local roads and transportation options.",
    image: {
      url: "/images/places/mccluskieganj.jpg",
      filename: "mccluskieganj.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/TdKpVN1jpzVLA1s18",
  },
  {
    name: "Degadegi River",
    district: "Palamu",
    category: "river",
    tags: ["river", "nature", "scenic", "relaxing"],
    bestSeason: "all-year",
    description:
      "A calm riverside location near McCluskieganj offering peaceful water views, scenic surroundings and an easy escape for nature walks and relaxation.",
    howToReach: "Reachable via local Palamu district roads near McCluskieganj; check the riverside access points before visiting.",
    image: {
      url: "/images/places/degadegiriver.jpg",
      filename: "degadegiriver.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/P6w2d38LVDHCUesW9",
  },
  {
    name: "McCluskieganj Mountain",
    district: "Palamu",
    category: "hill-station",
    tags: ["scenic", "mountain", "nature", "photography"],
    bestSeason: "winter",
    description:
      "A scenic mountain area near McCluskieganj offering elevated views, cool air and a perfect spot for photography and peaceful nature escapes.",
    howToReach: "Located in Palamu district near McCluskieganj; use local roads and confirm access conditions before setting out.",
    image: {
      url: "/images/places/mccluskieganjmoutain.jpg",
      filename: "mccluskieganjmoutain.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/EEZ2Y3MrmFUM4agN8",
  },
  {
    name: "Rajrappa Riverside",
    district: "Ramgarh",
    category: "nature",
    tags: ["river", "nature", "scenic", "relaxing"],
    bestSeason: "all-year",
    description:
      "A calm riverside location in Rajrappa offering peaceful water views, scenic surroundings and an easy escape for nature walks and relaxation.",
    howToReach: "Reachable via local Ramgarh district roads near Rajrappa; check the riverside access points before visiting.",
    image: {
      url: "/images/places/rajrappariverside.jpg",
      filename: "rajrappariverside.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/FqJMUggf2AP5gLFL6",
  },
  {
    name: "Rajrappa Bridge",
    district: "Ramgarh",
    category: "nature",
    tags: ["heritage", "history", "scenic", "photography"],
    bestSeason: "all-year",
    description:
      "A historic bridge in Rajrappa that brings together engineering heritage, river views and a memorable stop for history lovers and photographers.",
    howToReach: "Located in the Rajrappa area of Ramgarh district; use the local roads and map link for the exact route.",
    image: {
      url: "/images/places/rajrappabridge.jpg",
      filename: "rajrappabridge.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/5zBnD1Gq1FDCJbmm6",
  },
  {
    name: "Rajrappa Waterfall",
    district: "Ramgarh",
    category: "waterfall",
    tags: ["nature", "waterfall", "monsoon", "photography"],
    bestSeason: "monsoon",
    description:
      "A scenic waterfall in Rajrappa that feels refreshing, forested and quietly dramatic, especially during the rainy season when the flow is at its best.",
    howToReach: "Head toward Rajrappa in Ramgarh district and use the map route for the exact approach to this waterfall point.",
    image: {
      url: "/images/places/rajrappawaterfall.jpg",
      filename: "rajrappawaterfall.jpg",
    },
    googleMapsUrl: "https://maps.app.goo.gl/k3HrwHAEu9K9YH6b6",
  },
];

const normalizedPlaces = applyCloudinaryImageUrls(places);

module.exports = normalizedPlaces;
module.exports.places = normalizedPlaces;

async function seed() {
  const mongoUri = process.env.MONGO_URI || process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/jharkhand-tourism";
  await mongoose.connect(mongoUri);
  console.log(`Connected to MongoDB at ${mongoUri}, seeding places...`);

  await Place.deleteMany({});
  await Place.insertMany(normalizedPlaces);

  console.log(`Seeded ${normalizedPlaces.length} places.`);
  await mongoose.disconnect();
}

if (require.main === module) {
  seed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
}
