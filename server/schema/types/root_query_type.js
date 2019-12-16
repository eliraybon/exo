const mongoose = require("mongoose");
const graphql = require("graphql");
const UserType = require("./user_type");
const User = mongoose.model("users");
const ProductType = require('./product_type');
const Product = mongoose.model("products");
const ReviewType = require('./review_type');
const Review = mongoose.model("reviews");
const StoreType = require('./store_type');
const Store = mongoose.model('stores');

// const axios = require('axios');
// const awsKey = require("../../../config/keys").AWSKey;

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql;

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({});
      }
    },
    product: {
      type: ProductType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return Product.findById(args._id)
      }
    },
    stores: {
      type: new GraphQLList(StoreType),
      resolve() {
        return Store.find({});
      }
    },
    store: {
      type: StoreType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return Store.findById(args._id)
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve() {
        return Review.find({});
      }
    },
    review: {
      type: ReviewType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return Review.findById(args._id)
      }
    }
  })
});

module.exports = RootQueryType;