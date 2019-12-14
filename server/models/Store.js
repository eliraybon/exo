const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  description: {
    type: String
  },
  rating: {
    type: Number
  },
  products: [{ type: Schema.Types.ObjectId, ref: "products" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "users" }],
  image: {
    type: String
  },
  location: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("stores", StoreSchema);