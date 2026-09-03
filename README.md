🌿 Jharkhand Trails
Discover the Hidden Beauty of Jharkhand

Jharkhand Trails is a modern tourism discovery platform designed to help travelers explore the natural beauty, cultural heritage, waterfalls, wildlife, hill stations, lakes, dams, and destinations of Jharkhand.

Explore destinations, discover places worth visiting, keep track of places you've visited, and get personalized recommendations based on your interests.

<p align="center"> <img src="https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js" alt="Node.js"/> <img src="https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express" alt="Express.js"/> <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb" alt="MongoDB"/> <img src="https://img.shields.io/badge/EJS-Templating-purple?style=for-the-badge" alt="EJS"/> <img src="https://img.shields.io/badge/Passport.js-Authentication-blue?style=for-the-badge&logo=passport" alt="Passport.js"/> </p>
✨ Overview

Jharkhand is home to spectacular waterfalls, dense forests, scenic hill stations, wildlife sanctuaries, historical sites, temples, lakes, dams, and rich tribal heritage.

Jharkhand Trails aims to bring these destinations together in one simple and visually engaging platform.

The application allows users to:

🗺️ Explore destinations across Jharkhand
💧 Discover waterfalls and natural attractions
⛰️ Find hill stations and scenic locations
🐘 Explore wildlife destinations
🏞️ Discover lakes, dams, and viewpoints
🛕 Learn about cultural and heritage locations
🔐 Create an account and securely log in
✅ Mark destinations as visited
⭐ Receive personalized destination recommendations
🔎 Search and filter destinations by category
☁️ Serve destination images through Cloudinary
📱 Browse the platform on different screen sizes
🚀 Live Demo

🌐 Live Website:
https://jharkhandtourism-seven.vercel.app/

The production URL may change as the project evolves.

📸 Screenshots
🏠 Homepage

📍 Trending Locations

🗺️ Browse by District

🌄 Explore Destinations

Note: Add the provided screenshots to public/images/screenshots/ using the filenames above, or update the image paths to match your project structure.

🎯 Core Features
🔎 Destination Discovery

Explore different types of destinations across Jharkhand, including:

Waterfalls
Hill Stations
Wildlife
Tribal Heritage
Dams & Lakes
Viewpoints
Historical Places
Nature Escapes
📍 Destination Details

Each destination can have its own dedicated page containing information such as:

Destination name
District
Description
Category
Images
Tags
Travel information
Visit status

This creates a structured destination database that can be expanded as more places are added.

👤 User Authentication

Users can create accounts and manage their personal travel activity.

Authentication is implemented using:

Passport.js
Local authentication strategy
Express sessions
Secure password handling

Available actions include:

Sign up
Log in
Log out
Protected user functionality
✅ Visited Places

Users can keep track of destinations they have already explored.

The platform supports:

Mark as Visited
       ↓
Save destination to user profile
       ↓
Use visit history for recommendations

Users can also remove a destination from their visited list.

🤖 Personalized Recommendations

The For You experience recommends destinations based on places the user has previously visited.

The recommendation system uses destination tags and user activity to find places with similar characteristics.

For example:

User visited:
Hundru Falls
        ↓
Tags:
Waterfall + Nature + Adventure
        ↓
Recommendation:
Dassam Falls
Lodh Waterfall
Other similar destinations
🖼️ Cloudinary Image Management

The project supports Cloudinary for storing and delivering destination images.

The image migration workflow allows local images to be uploaded to Cloudinary and destination records to be updated with Cloudinary URLs.

npm run migrate-images

This helps reduce dependency on local image storage and provides better image delivery for production deployments.

🛠️ Tech Stack
Backend
Technology	Purpose
Node.js	JavaScript runtime
Express.js	Web framework and routing
MongoDB	Database
Mongoose	MongoDB ODM
Passport.js	Authentication
Express Session	User sessions
Method Override	PUT/DELETE form requests
Frontend
Technology	Purpose
EJS	Server-side rendering
EJS-Mate	Layouts and reusable templates
HTML5	Page structure
CSS3	Styling
JavaScript	Client-side interactions
Infrastructure & Services
Technology	Purpose
MongoDB Atlas	Cloud database
Cloudinary	Image storage & delivery
Vercel	Deployment
GitHub	Source control
🏗️ Architecture

Jharkhand Trails follows an MVC-style architecture.

                    ┌──────────────────┐
                    │      Browser     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Express      │
                    │     Routes       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Controllers    │
                    │ Business Logic   │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
      ┌───────────────┐             ┌───────────────┐
      │    MongoDB    │             │     EJS       │
      │   + Mongoose  │             │    Views      │
      └───────────────┘             └───────┬───────┘
                                            │
                                            ▼
                                     HTML Response
Architecture Principles
Routes handle URL and HTTP method mapping.
Controllers contain application/business logic.
Models handle MongoDB data structures.
Views render application data using EJS.
Middleware handles authentication and reusable request logic.
📂 Project Structure
Jharkhand_tourism/
│
├── config/
│   └── database configuration
│
├── controllers/
│   └── application business logic
│
├── middleware/
│   └── authentication & request middleware
│
├── models/
│   └── MongoDB / Mongoose models
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── routes/
│   └── Express route definitions
│
├── scripts/
│   └── utility and migration scripts
│
├── seed/
│   └── database seed data
│
├── tests/
│   └── application tests
│
├── utils/
│   └── reusable utility functions
│
├── views/
│   ├── layouts/
│   ├── partials/
│   └── application pages
│
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
├── render.yaml
├── vercel.json
└── README.md
⚙️ Getting Started

Follow these steps to run Jharkhand Trails locally.

1. Prerequisites

Make sure you have installed:

Node.js 18+
npm
Git
MongoDB Atlas account or local MongoDB

Check your versions:

node -v
npm -v
git --version
2. Clone the Repository
git clone https://github.com/Kaifkhan-Code/Jharkhand_tourism.git

Move into the project directory:

cd Jharkhand_tourism
3. Install Dependencies
npm install
🔐 Environment Variables

Create a .env file in the project root.

You can start from the example file:

cp .env.example .env

Add your configuration:

MONGO_URI=your_mongodb_connection_string

SESSION_SECRET=your_session_secret

GROQ_API_KEY=your_groq_api_key

CLOUDINARY_URL=your_cloudinary_url
Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
SESSION_SECRET	Secret used for session management
GROQ_API_KEY	API key for future AI functionality
CLOUDINARY_URL	Cloudinary connection URL

⚠️ Never commit your .env file to GitHub.

🌱 Seed the Database

The project includes a seed script for populating the database with destination data.

Run:

npm run seed

This populates the Place collection with the initial Jharkhand destinations.

You can add additional destinations by editing:

seed/seedPlaces.js
▶️ Run the Application

Start the development server:

npm run dev

Then open:

http://localhost:3000
☁️ Deployment

Jharkhand Trails can be deployed using platforms such as:

Vercel
Render
Other Node.js-compatible hosting platforms

The repository already contains deployment configuration files:

vercel.json
render.yaml

For production deployment, make sure your hosting provider has the required environment variables configured.

🌐 Custom Domain

The project can be connected to a custom domain such as:

www.jharkhandtrails.com

Recommended production architecture:

GitHub
   │
   ▼
Vercel / Render
   │
   ▼
Custom .com Domain
   │
   ▼
Google Search
   │
   ▼
Visitors
🔍 SEO & Discoverability

The long-term goal of Jharkhand Trails is to make useful destination information discoverable through search engines.

Potential SEO improvements include:

Search-friendly destination URLs
Dynamic page titles
Meta descriptions
Open Graph metadata
sitemap.xml
robots.txt
Structured data / Schema.org
Destination-specific landing pages
Internal linking
Fast page loading
Mobile-first design

Example destination URL:

https://yourdomain.com/places/netarhat

instead of:

https://yourdomain.com/place?id=123
💰 Monetization Roadmap

The project can eventually support several legitimate monetization channels.

Google AdSense

After building sufficient useful content and meeting Google's policies:

Organic Traffic
      ↓
Website Visitors
      ↓
Useful Tourism Content
      ↓
Google AdSense
      ↓
Advertising Revenue
Other potential revenue sources
Hotel affiliate programs
Travel affiliate programs
Local tour partnerships
Sponsored destination listings
Local business advertising
Travel guides
Premium travel planning services

Monetization should always follow the relevant advertising platform's policies and applicable laws.

🗺️ Current Destination Categories

The platform is designed around categories such as:

💧 Waterfalls
⛰️ Hill Stations
🐘 Wildlife
🌿 Nature
🛕 Tribal Heritage
🏞️ Dams & Lakes
🌄 Viewpoints
🏛️ Historical Places
🔮 Future Roadmap

The project can evolve into a complete Jharkhand travel platform.

Planned Features
 AI-powered trip planner
 Day-by-day itinerary generation
 Weather information
 Interactive maps
 Reviews and ratings
 Destination bookmarking
 Advanced recommendation engine
 Admin dashboard
 Destination image uploads
 Travel distance and route information
 Hotel and accommodation information
 Local guides directory
 Events and festivals
 Multilingual support
 PWA / mobile application
 SEO optimization
 Google Search Console integration
 Google AdSense integration
🤝 Contributing

Contributions are welcome.

1. Fork the repository
git clone https://github.com/Kaifkhan-Code/Jharkhand_tourism.git
2. Create a feature branch
git checkout -b feature/your-feature
3. Make your changes

Implement and test your changes locally.

4. Commit your changes
git add .
git commit -m "feat: add your feature"
5. Push the branch
git push origin feature/your-feature
6. Open a Pull Request

Explain:

What you changed
Why you changed it
How you tested it
🧪 Testing

Run the project's test suite with:

npm test

Before submitting changes, make sure:

The application starts correctly
Authentication works
Destination pages load correctly
Database operations work
No secrets are committed
Existing functionality remains intact
🔒 Security

Please do not commit sensitive information such as:

.env
API keys
Database passwords
Session secrets
Cloudinary credentials

If you discover a security issue, please report it privately rather than publicly exposing credentials or exploit details.

📜 License

This project currently does not specify a license.

If you intend to make the repository open source, consider adding an appropriate license such as the MIT License.

👨‍💻 Author
Kaif Khan

Jharkhand Trails

A project focused on making the natural and cultural attractions of Jharkhand easier to discover.

GitHub: https://github.com/Kaifkhan-Code
Repository: https://github.com/Kaifkhan-Code/Jharkhand_tourism
🌿 Vision

"Discover Jharkhand, one trail at a time."

Jharkhand has thousands of stories hidden within its forests, waterfalls, hills, villages, temples, wildlife, and communities.

Jharkhand Trails aims to make those places easier to discover — while encouraging responsible and meaningful travel across the state.

<p align="center"> <strong>🌿 Jharkhand Trails</strong><br/> Discover • Explore • Experience Jharkhand </p>
