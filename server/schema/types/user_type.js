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
    owner: {
      type: GraphQLBoolean
    },
    token: {
        type: GraphQLString
      },
    loggedIn: {
      type: GraphQLBoolean
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
    }
  })
});

module.exports = UserType;