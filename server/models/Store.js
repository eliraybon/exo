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

StoreSchema.statics.createStore = (name, owner, description) => {
  const Store = mongoose.model('stores');
  const User = mongoose.model('users');

  return User.findById(owner).then(user => {
    return new Store({ name, owner, description }).save()
      .then(store => {
        user.stores.push(store);
        return user.save()
          .then(user => store)
      })
  })
};



module.exports = mongoose.model("stores", StoreSchema);