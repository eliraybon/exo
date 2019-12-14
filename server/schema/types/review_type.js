const mongoose = require("mongoose");
const graphql = require("graphql");
const Review = mongoose.model("reviews");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt
} = graphql;

const ReviewType = new GraphQLObjectType({
  name: "ReviewType",
  fields: () => ({
    rating: {
      type: GraphQLInt
    },
    body: {
      type: GraphQLString
    },
    author: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Review.findById(parentValue._id)
          .populate('user')
          .then(review => review.user)
      }
    },
    store: {
      type: require('./store_type'),
      resolve(parentValue) {
        return Review.findById(parentValue._id)
          .populate('store')
          .then(review => review.store)
      }
    },
    product: {
      type: require('./product_type'),
      resolve(parentValue) {
        return Review.findById(parentValue._id)
          .populate('product')
          .then(review => review.product)
      }
    }
  })
});

module.exports = ReviewType;