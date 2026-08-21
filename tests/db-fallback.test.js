const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const express = require('express');
const path = require('node:path');
const ejsMate = require('ejs-mate');

const connectDB = require('../config/db');

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
