const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  mass: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "stores"
  },
  image: { 
    type: String
    //maybe make required later
  },
  sold: {
    type: Boolean,
    default: false
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "users" }],
  // Star
  galacticLongitude: {
    type: Number
  },
  galacticLatitude: {
    type: Number
  },
  spectralType: {
    type: String
  },
  stellarAge: {
    type: String
  },
  luminosity: {
    type: String
  },
  starDensity: {
    type: String
  },
  starRadius: {
    type: Number
  },
  starMetallicity: {
    type: String
  },
  planets: {
    type: String
  },
  starDistance: {
    type: Number
  },
  // Exoplanet
  exoDistance: {
    type: Number
  },
  elipticLongitude: {
    type: Number
  },
  elipticLatitude: {
    type: Number
  },
  starSystem: {
    type: String
  },
  planetRad: {
    type: Number
  },
  planetDensity: {
    type: Number
  },
  climate: {
    type: String
  },
  planetYear: {
    type: Number
  },
  // Spaceships
  productionTime: {
    type: Number
  },
  livingVolume: {
    type: Number
  },
  cargoVolume: {
    type: Number
  },
  maxAcc: {
    type: Number
  },
  maneuverability: {
    type: Number
  },
  addtlFeatures: [{ type: String }],
// Spacesuit
  designer: {
    type: String
  },
  size: {
    type: String
  },
  o2Vol: {
    type: Number
  },
  vacExposure: {
    type: Number
  },
  color: {
    type: String
  },
  // Food
  cuisine: {
    type: String
  },
  storageMethod: {
    type: String
  },
  labGrown: {
    type: Boolean
  }
});

module.exports = mongoose.model("products", ProductSchema);