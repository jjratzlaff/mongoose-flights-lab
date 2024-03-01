const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Destination Schema
const destinationSchema = new Schema({
  airport: {
    type: String,
    required: true,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'] // Assuming you want to restrict to these values
  },
  arrival: Date // No default value specified, so it remains as Date without validation
}, {
  timestamps: true
});

// Flight Schema
const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: () => Date.now() + 365*24*60*60*1000 // Default to one year from now
  },
  destinations: [destinationSchema] // Add this line to include destinations in the flight schema
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);
