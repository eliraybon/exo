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
  },
  sold: {
    type: Boolean,
    default: false
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "users" }],
  inCart: [{ type: Schema.Types.ObjectId, ref: "users" }],
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
    type: Number
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
  capacity: {
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

// Exoplanet
// Id
// Name - NASA pl_name
// Distance = NASA st_dist(parsecs)
// Coordinates 
// eliptic long - st_elon
// eliptic lat - st_elat
// Star - System - NASA pl_hostname / starId
// Mass - NASA pl_masse(earth mass)
// Radius - NASA pl_rade(earth rad)
// Density - NASA pl_dens
// Climate
// Year time - NASA pl_trandur(days)
// Day time
// Owner
// Cost

// Star
// Id
// Name - NASA hd_name
// Coordinates
// galactic long - st_glon
// galactic lat - st_glat
// spectral type: st_spstr
// Stellar age: st_age
// Luminosity: st_lum
// Star Density: st_dens
// Star Metallicity: st_metfe
// Owner
// Planets
// Cost

// Spaceship
// Id
// Name
// Price
// Production Time
// Living space(li)
// Cargo Space(li)
// Mass(kg)
// Volume
// Max Accelleration(m / s2)
// Directional Force Coverage(degrees out of 360)
// Additional Features

// Spacesuit
// Id
// Name
// Designer
// Cost
// Mass
// Volume
// Body Type(biped, etc)
// Size
// Oxygen Volume
// Vacuum Exposure Time

// Food
// Id
// Name
// Cost
// Mass
// Volume
// Cuisine
// Storage Method(freeze - dried, orbital stasis, quantum chilled, etc)
// Labgrown(t / f)
