<<<<<<< HEAD
# Jharkhand_tourism
=======
# Jharkhand Trails

A trip-discovery site for Jharkhand — browse waterfalls, hill stations, wildlife parks and
tribal heritage sites, mark places you've visited, and get personalized recommendations for
places like the ones you enjoyed. Built server-rendered, MVC-style, with Express + EJS + MongoDB.

## Stack

- **Node.js + Express** — server and routing
- **MongoDB + Mongoose** — database
- **EJS + ejs-mate** — server-rendered views with layouts
- **Passport.js** (local strategy) — authentication
- **method-override** — lets forms send PUT/DELETE requests

routes/        → Express routers, wire URLs to controllers
views/         → EJS templates (the "V" — pages + reusable partials)
middleware/    → isLoggedIn guard
config/        → database connection
seed/          → script to populate the DB with real Jharkhand places
public/        → static CSS/JS/images
```

Controllers hold the logic. Routes just map a URL + HTTP verb to a controller function.
Views only render data they're handed — no DB queries inside templates.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create your `.env` file**
   ```bash
   cp .env.example .env
## Setup
   Fill in:
   - `MONGO_URI` — from a free MongoDB Atlas cluster (Atlas → Connect → Drivers)
   - `SESSION_SECRET` — any random string
   - `GROQ_API_KEY` — only needed once you build the AI trip planner (see "Next features" below)

3. **Seed the database with real places**
   ```bash
   npm run seed
   ```
   This wipes and reloads the `Place` collection with 10 real Jharkhand locations
   (Hundru Falls, Netarhat, Betla National Park, etc.) — edit `seed/seedPlaces.js`
   to add your own.

4. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

## What's already working

- Signup / login / logout (Passport local strategy)
- Explore page with category filters
- Place detail pages
- "Mark as visited" / "Unmark as visited" (per-user, via the `VisitedPlace` join collection)
- "For You" page — recommends unvisited places ranked by tag overlap with places you've
the Cloudinary API Keys page to `.env`, then migrate the local files once:

```bash
npm run migrate-images
```

The command uploads every supported image in `public/images/places/` to the `places` folder
and updates matching MongoDB records. Future `npm run seed` runs use Cloudinary delivery URLs
when `CLOUDINARY_URL` is configured. Keep `.env` private and never commit API secrets.

## Where to extend it next

- **AI trip planner** — add a `tripPlanner` controller + route that sends the user's free-text
  request plus the current place list to the Groq API, and returns a day-by-day plan. Keep the
  LLM call in a small `utils/groqClient.js` helper so it's reusable.
- **Image uploads** — swap the placeholder images for real Cloudinary uploads by adding
  `multer` + `multer-storage-cloudinary` and a `POST /places` create route with an admin-only
- **Reviews / ratings** — a new `Review` model referencing `Place` and `User`, shown on the
  detail page.
- **Better recommendation scoring** — factor in `bestSeason` and current weather (reuse your
  OpenWeather API experience) alongside the tag-overlap score.
## Design notes
`Karla` + `Space Mono`) were picked to match the actual subject rather than a generic template —
feel free to adjust `public/css/style.css` as the project evolves, but keep the tokens at the top
of the file in sync if you do.
>>>>>>> 6979923 (Prepare Jharkhand Trails for deployment)
