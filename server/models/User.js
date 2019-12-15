const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({ 
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews"}],
  favoriteProducts: [{ type: Schema.Types.ObjectId, ref: "products" }],
  favoriteStores: [{ type: Schema.Types.ObjectId, ref: "stores" }],
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics.addFavoriteProduct = (userId, productId) => {
  const User = mongoose.model('users');
  const Product = mongoose.model('products');

  return Promise.all([User.findById(userId), Product.findById(productId)])
    .then(([user, product]) => {
      user.favoriteProducts.push(product);
      product.favorites.push(user);

      return Promise.all([user.save(), product.save()])
        .then(([user, product]) => user)
    })
}

UserSchema.statics.deleteFavoriteProduct = (userId, productId) => {
  const User = mongoose.model('users');
  const Product = mongoose.model('products');

  return Promise.all([User.findById(userId), Product.findById(productId)])
    .then(([user, product]) => {
      user.favoriteProducts.pull(product);
      product.favorites.pull(user);

      return Promise.all([user.save(), product.save()])
        .then(([user, product]) => user)
    })
}

module.exports = mongoose.model("users", UserSchema);