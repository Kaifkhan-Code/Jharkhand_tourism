const mongoose = require('mongoose');
const Place = require('../models/place');

async function cleanup() {
  await mongoose.connect('mongodb://127.0.0.1:27017/jharkhand-tourism');
  
  // Delete all Rajrappa entries except the first of each name
  const places = await Place.find({ district: 'Ramgarh' }).sort({ name: 1, createdAt: 1 });
  
  const seen = {};
  const toDelete = [];
  
  for (const place of places) {
    if (place.name.includes('Rajrappa')) {
      if (!seen[place.name]) {
        seen[place.name] = place._id;
        console.log('Keep:', place.name, 'ID:', place._id);
      } else {
        toDelete.push(place._id);
        console.log('Delete duplicate:', place.name, 'ID:', place._id);
      }
    }
  }
  
  if (toDelete.length > 0) {
    const result = await Place.deleteMany({ _id: { $in: toDelete } });
    console.log('\nDeleted:', result.deletedCount, 'duplicate entries');
  }
  
  // Get the 4 correct Rajrappa places
  const correct = await Place.find({ 
    district: 'Ramgarh',
    name: { $in: ['Rajrappa', 'Rajrappa Riverside', 'Rajrappa Bridge', 'Rajrappa Waterfall'] }
  }).sort({ name: 1 });
  
  console.log('\nFinal Rajrappa places:', correct.length);
  correct.forEach(p => console.log('-', p.name));
  
  process.exit(0);
}

cleanup().catch(err => { console.error(err); process.exit(1); });

