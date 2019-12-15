const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
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

ReviewSchema.statics.createReview = (rating, body, author, product) => {
  const User = mongoose.model('users');
  const Product = mongoose.model('products');
  const Review = mongoose.model('reviews');

  return Promise.all([User.findById(author), Product.findById(product)]).then(
    ([user, product]) => {

      return new Review({rating, body, author, product}).save()
        .then(review => {
          user.reviews.push(review);
          product.reviews.push(review);

          return Promise.all([user.save(), product.save()])
            .then(([user, product]) => review)
        })
    }
  )
}

ReviewSchema.statics.deleteReview = reviewId => {
  const User = mongoose.model('users');
  const Product = mongoose.model('products');
  const Review = mongoose.model('reviews');

  return Review.findByIdAndDelete(reviewId)
    .then(review => {
      return Promise.all([User.findById(review.author), Product.findById(review.product)])
        .then(([user, product]) => {
          user.reviews.pull(review);
          product.reviews.pull(review);
          return Promise.all([user.save(), product.save()])
            .then(([user, product]) => {
              console.log(review);
              return review;
            })
        })
    })
}

module.exports = mongoose.model("reviews", ReviewSchema);