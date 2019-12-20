const mongoose = require("mongoose");
const graphql = require("graphql");
const User = mongoose.model("users");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    token: {
        type: GraphQLString
      },
    loggedIn: {
      type: GraphQLBoolean
    },
    image: {
      type: GraphQLString
    },
    store: {
      type: require('./store_type'),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate('store')
          .then(user => user.store)
      }
    },
    reviews: {
      type: new GraphQLList(require('./review_type')),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("reviews")
          .then(user => user.reviews)
      }
    },
    favoriteStores: {
      type: new GraphQLList(require('./store_type')),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate('favoriteStores')
          .then(user => user.favoriteStores)
      }
    },
    favoriteProducts: {
      type: new GraphQLList(require('./product_type')),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate('favoriteProducts')
          .then(user => user.favoriteProducts)
      }
    },
    cartProducts: {
      type: new GraphQLList(require('./product_type')),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("cartProducts")
          .then(user => user.cartProducts)
      }
    }
  })
});

module.exports = UserType;