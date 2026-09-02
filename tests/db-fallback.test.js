const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const express = require('express');
const path = require('node:path');
const ejsMate = require('ejs-mate');

const connectDB = require('../config/db');
const { cloudinaryImageUrl } = require('../utils/cloudinary');
const itineraryController = require('../controllers/itineraryController');
const placeController = require('../controllers/placeController');
const authController = require('../controllers/authController');

test('login stores home as the preference return path instead of a stale dashboard route', async () => {
  const redirects = [];
  const req = {
    user: { role: 'customer', likedCategories: [] },
    session: { redirectTo: '/dashboard' },
  };
  const res = { redirect: (url) => redirects.push(url) };

  authController.login(req, res);

  assert.deepEqual(req.session.preferenceRedirectTo, '/');
  assert.deepEqual(redirects, ['/preferences']);
});

test('savePreferences redirects home instead of reusing a stale dashboard redirect', async () => {
  const redirects = [];
  const req = {
    body: { likedCategories: ['waterfall'] },
    session: { preferenceRedirectTo: '/dashboard' },
    user: { likedCategories: [], save: async () => {} },
  };
  const res = {
    redirect: (url) => redirects.push(url),
  };

  await authController.savePreferences(req, res);

  assert.deepEqual(req.session.preferenceRedirectTo, undefined);
  assert.deepEqual(redirects, ['/']);
});

test('itinerary add stays on the place detail page so back goes to the previous page once', async () => {
  const originalCreate = require('../models/itineraryPlace').create;
  const redirects = [];

  require('../models/itineraryPlace').create = async () => {};

  try {
    await itineraryController.add(
      {
        user: { _id: 'user-1' },
        params: { placeId: 'place-1' },
        get(header) {
          if (header === 'Referer') return 'http://localhost:3005/places/place-1';
          if (header === 'Host') return 'localhost:3005';
          return undefined;
        },
        headers: { referer: 'http://localhost:3005/places/place-1' },
        protocol: 'http',
        originalUrl: '/places/place-1',
      },
      { redirect: (url) => redirects.push(url) }
    );

    assert.deepEqual(redirects, ['/places/place-1']);
  } finally {
    require('../models/itineraryPlace').create = originalCreate;
  }
});

test('markVisited stays on the place detail page so back goes to the previous page once', async () => {
  const originalCreate = require('../models/visitedPlace').create;
  const redirects = [];

  require('../models/visitedPlace').create = async () => {};

  try {
    await placeController.markVisited(
      {
        user: { _id: 'user-1' },
        params: { id: 'place-1' },
        get(header) {
          if (header === 'Referer') return 'http://localhost:3005/places/place-1';
          if (header === 'Host') return 'localhost:3005';
          return undefined;
        },
        headers: { referer: 'http://localhost:3005/places/place-1' },
        protocol: 'http',
        originalUrl: '/places/place-1',
      },
      { redirect: (url) => redirects.push(url) }
    );

    assert.deepEqual(redirects, ['/places/place-1']);
  } finally {
    require('../models/visitedPlace').create = originalCreate;
  }
});

test('connectDB falls back to local MongoDB when Atlas fails', async () => {
  const originalConnect = mongoose.connect;
  const calls = [];

  process.env.MONGO_URI = 'mongodb+srv://atlas.example/test';
  process.env.LOCAL_MONGO_URI = 'mongodb://127.0.0.1:27017/jharkhand-tourism';

  mongoose.connect = async (uri) => {
    calls.push(uri);
    if (uri === process.env.MONGO_URI) {
      throw new Error('Atlas unavailable');
    }
    return Promise.resolve();
  };

  try {
    await connectDB({ retries: 1, delay: 0 });
    assert.deepEqual(calls, [process.env.MONGO_URI, process.env.LOCAL_MONGO_URI]);
  } finally {
    mongoose.connect = originalConnect;
    delete process.env.LOCAL_MONGO_URI;
  }
});

test('nested EJS views render successfully with the boilerplate layout', async () => {
  const app = express();
  app.engine('ejs', ejsMate);
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'views'));

  app.use((req, res, next) => {
    res.locals.currentUser = null;
    next();
  });

  app.get('/places', (req, res) => {
    res.render('places/index', {
      places: [
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'Hundru Falls',
          district: 'Ranchi',
          category: 'waterfall',
          bestSeason: 'Monsoon',
          description: 'A dramatic waterfall in the Chotanagpur plateau.',
          image: { url: 'https://example.com/hundru.jpg' },
        },
      ],
      visitedIds: [],
      query: {},
    });
  });

  const server = app.listen(0);
  try {
    const port = server.address().port;
    const response = await fetch(`http://127.0.0.1:${port}/places`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /Explore Jharkhand/);
  } finally {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  }
});

test('seed data includes Bhatinda Waterfall in Dhanbad with the expected image file name', async () => {
  const seedPlaces = require('../seed/seedPlaces.js');
  const bhatinda = seedPlaces?.places?.find((place) => place.name === 'Bhatinda Waterfall');

  assert.ok(bhatinda, 'Bhatinda Waterfall should be registered in the place seed list');
  assert.equal(bhatinda.district, 'Dhanbad');
  assert.equal(bhatinda.category, 'waterfall');
  assert.ok(
    bhatinda.image.url.endsWith('/bhatindawaterfall.jpg.jpeg') || bhatinda.image.url.endsWith('bhatindawaterfall.jpg.jpeg'),
    'The image URL should point to the Bhatinda waterfall file in either local or Cloudinary form'
  );
  assert.equal(bhatinda.googleMapsUrl, 'https://maps.app.goo.gl/RgQxYpsoEmdp4s1KA');
});

test('seed data includes Sahibganj places for district filtering', async () => {
  const seedPlaces = require('../seed/seedPlaces.js');

  const expectedNames = [
    'Gangabihar Park',
    'Jhilmil Waterfall',
    'Sahibganj Pahari Waterfall',
    'Motijharna Waterfall',
    'Radha Krishna Ojha Ganga View Point',
    'Local Jharna',
  ];

  const sahibganjPlaces = seedPlaces?.places?.filter((place) => place.district === 'Sahibganj');

  assert.ok(sahibganjPlaces.length >= 6, 'Sahibganj should contain the requested place entries');
  expectedNames.forEach((name) => {
    assert.ok(sahibganjPlaces.some((place) => place.name === name), `${name} should be present in Sahibganj`);
  });

  const mapReferenced = sahibganjPlaces.every((place) => typeof place.googleMapsUrl === 'string' && place.googleMapsUrl.startsWith('https://maps.app.goo.gl/'));
  assert.equal(mapReferenced, true, 'Each Sahibganj place should include a Google Maps URL');
});

test('seed data includes Sahibganj places for district filtering', async () => {
  const seedPlaces = require('../seed/seedPlaces.js');

  const expectedNames = [
    'King Palace',
    'Bandi Dam',
    'Dalma Hill Top',
    'Ganjia Barrage',
    'River View Park',
    'Hesakocha Waterfall',
    'Saraikela Rajmahal',
    'Chandil Dam',
    'Saraikela Palace',
  ];

  const sahibganjPlaces = seedPlaces?.places?.filter((place) => place.district === 'Sahibganj');

  assert.ok(sahibganjPlaces.length >= 9, 'Sahibganj should contain the new requested place entries');
  expectedNames.forEach((name) => {
    assert.ok(sahibganjPlaces.some((place) => place.name === name), `${name} should be present in Sahibganj`);
  });

  const mapReferenced = sahibganjPlaces.every((place) => typeof place.googleMapsUrl === 'string' && place.googleMapsUrl.startsWith('https://maps.app.goo.gl/'));
  assert.equal(mapReferenced, true, 'Each Sahibganj place should include a Google Maps URL');
});

test('seed data includes Simdega places for district filtering', async () => {
  const seedPlaces = require('../seed/seedPlaces.js');

  const expectedNames = [
    'Kelaghat Dam',
    'Kobang Dam',
    'Rajadera Picnic Spot',
    'Eraap Dam',
    'Heaven Hills Simdega',
    'Kairbera Dam',
    'Dangadi Waterfall',
    'Simdega Basantpur',
    'Gurunda Ghagh Kolebira Simdega',
    'Rani Waterfall',
    'Kelaghat Dam Center',
  ];

  const simdegaPlaces = seedPlaces?.places?.filter((place) => place.district === 'Simdega');

  assert.ok(simdegaPlaces.length >= 11, 'Simdega should contain the requested place entries');
  expectedNames.forEach((name) => {
    assert.ok(simdegaPlaces.some((place) => place.name === name), `${name} should be present in Simdega`);
  });

  const mapReferenced = simdegaPlaces.every((place) => typeof place.googleMapsUrl === 'string' && place.googleMapsUrl.startsWith('https://maps.app.goo.gl/'));
  assert.equal(mapReferenced, true, 'Each Simdega place should include a Google Maps URL');
});

test('seed data includes West Singhbhum places for district filtering', async () => {
  const seedPlaces = require('../seed/seedPlaces.js');

  const expectedNames = [
    'Kachahari Talab',
    'Lupungutu Jharna',
    'Chaibasa Clock Tower',
    'Jubilee Lake Park',
  ];

  const westSinghbhumPlaces = seedPlaces?.places?.filter((place) => place.district === 'West Singhbhum');

  assert.ok(westSinghbhumPlaces.length >= 4, 'West Singhbhum should contain the approved Chaibasa place entries');
  expectedNames.forEach((name) => {
    assert.ok(westSinghbhumPlaces.some((place) => place.name === name), `${name} should be present in West Singhbhum`);
  });

  const mapReferenced = westSinghbhumPlaces.every((place) => typeof place.googleMapsUrl === 'string' && place.googleMapsUrl.startsWith('https://maps.app.goo.gl/'));
  assert.equal(mapReferenced, true, 'Each West Singbhum place should include a Google Maps URL');
});

test('home page includes the missing district cards and seeded entries exist', async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const seedPlaces = require('../seed/seedPlaces.js');

  const homeHtml = fs.readFileSync(path.join(__dirname, '..', 'views', 'home.ejs'), 'utf8');
  const requiredDistricts = ['Lohardaga', 'Hazaribagh', 'East Singhbhum', 'Khunti', 'Sahibganj', 'Koderma', 'Jamtara'];

  requiredDistricts.forEach((district) => {
    const places = seedPlaces?.places?.filter((place) => place.district === district);
    assert.ok(places && places.length > 0, `${district} should contain seeded place entries`);
    assert.match(homeHtml, new RegExp(`district:\\s*['\"]${district}['\"]`), `${district} should be listed in the home page district explorer`);
  });

  assert.doesNotMatch(homeHtml, /district:\s*['"]Sahebganj['"]/);
  assert.doesNotMatch(homeHtml, /district:\s*['"]Jamshedpur['"]/);
  const eastSinghbhumPlaces = seedPlaces?.places?.filter((place) => place.district === 'East Singhbhum');
  assert.ok(eastSinghbhumPlaces.some((place) => place.name === 'Dimna Lake'), 'East Singhbhum should include Jamshedpur-area places');});

test('image URLs encode filenames with spaces so district thumbnails load correctly', () => {
  const previous = process.env.CLOUDINARY_URL;
  process.env.CLOUDINARY_URL = 'cloudinary://123456:abcdef@demo-cloud';

  try {
    const url = cloudinaryImageUrl('katikora dam.jpg');
    assert.equal(url, '/images/places/katikora%20dam.jpg');
  } finally {
    if (previous === undefined) {
      delete process.env.CLOUDINARY_URL;
    } else {
      process.env.CLOUDINARY_URL = previous;
    }
  }
});

test('local image files are preferred over Cloudinary when the file exists on disk', () => {
  const previous = process.env.CLOUDINARY_URL;
  process.env.CLOUDINARY_URL = 'cloudinary://123456:abcdef@demo-cloud';

  try {
    const url = cloudinaryImageUrl('lilatariwaterfall.jpg');
    assert.equal(url, '/images/places/lilatariwaterfall.jpg');
  } finally {
    if (previous === undefined) {
      delete process.env.CLOUDINARY_URL;
    } else {
      process.env.CLOUDINARY_URL = previous;
    }
  }
});
