const mongoose = require("mongoose");
const graphql = require("graphql");
const Store = mongoose.model("stores");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt
} = graphql;

const StoreType = new GraphQLObjectType({
  name: "StoreType",
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    owner: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Store.findById(parentValue._id)
          .populate('user')
          .then(store => store.user)
      }
    },
    description: {
      type: GraphQLString
    },
    rating: {
      type: GraphQLInt
    },
    products: {
      type: new GraphQLList(require('./product_type')),
      resolve(parentValue) {
        return Store.findById(parentValue._id)
          .populate('products')
          .then(store => store.products)
      }
    },
    reviews: {
      type: new GraphQLList(require('./review_type')),
      resolve(parentValue) {
        return Store.findById(parentValue._id)
          .populate('reviews')
          .then(store => store.reviews)
      }
    },
    favorites: {
      type: new GraphQLList(GraphQLString),
      resolve(parentValue) {
        return Store.findById(parentValue._id)
          .then(store => store.favorites)
      }
    },
    image: {
      type: GraphQLString
    },
    location: {
      type: GraphQLString
    }
  })
});

module.exports = StoreType;