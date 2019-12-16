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
    _id: {
      type: GraphQLID
    },
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
          .populate('author')
          .then(review => review.author)
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