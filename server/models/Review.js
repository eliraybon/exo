const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  rating: {
    type: Number
  },
  body: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "stores"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("reviews", ReviewSchema);