const graphql = require("graphql");
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean 
} = graphql;
const AuthService = require('../services/auth');
const ProductService = require('../services/product');
const UserType = require('./types/user_type');
const User = require("../models/User");
const ProductType = require('./types/product_type');
const Product = require("../models/Product");
const StoreType = require('./types/store_type');
const Store = require("../models/Store");
const ReviewType = require('./types/review_type');
const Review = require("../models/Review");


const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
          owner: { type: GraphQLBoolean }
      },
      resolve(_, args) {
          return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: {
          type: GraphQLID
        }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: {
          type: GraphQLString
        }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    newProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
        mass: { type: GraphQLFloat },
        volume: { type: GraphQLFloat },
        category: { type: GraphQLString }
      },
      resolve(_, {name, price, description, mass, volume, category}) {
        return new Product({ name, price, description, mass, volume, category }).save();
      }
    },
    newStore: {
      type: StoreType,
      args: {
        name: { type: GraphQLString },
        owner: { type: GraphQLID },
        description: { type: GraphQLString },
      },
      resolve(_, { name, owner, description }) {
        return Store.createStore(name, owner, description);
      }
    },
    newReview: {
      type: ReviewType,
      args: {
        rating: { type: GraphQLInt },
        body: { type: GraphQLString },
        author: { type: GraphQLID},
        product: { type: GraphQLID }
      },
      resolve(_, {rating, body, author, product}) {
        return Review.createReview(rating , body, author, product);
      }
    },
    deleteReview: {
      type: ReviewType,
      args: {
        reviewId: { type: GraphQLID }
      },
      resolve(_, { reviewId }) {
        return Review.deleteReview(reviewId);
      }
    },
    updateReview: {
      type: ReviewType,
      args: {
        id: {type: GraphQLID},
        rating: {type: GraphQLInt},
        body: {type: GraphQLString}
      },
      resolve(parentValue, { id, rating, body }) {
        const updateObj = {};
        if (rating) updateObj.rating = rating;
        if (body) updateObj.body = body;

        return Review.findOneAndUpdate({ _id: id }, { $set: updateObj }, { new: true, useFindAndModify: false }, (err, review) => {
          return review;
        });
      }
    },
    addFavoriteProduct: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        productId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, productId }) {
        return User.addFavoriteProduct(userId, productId);
      }
    },
    deleteFavoriteProduct: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        productId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, productId }) {
        return User.deleteFavoriteProduct(userId, productId);
      }
    },
    addFavoriteStore: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        storeId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, storeId }) {
        return User.addFavoriteStore(userId, storeId);
      }
    },
    deleteFavoriteStore: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        storeId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, storeId }) {
        return User.deleteFavoriteStore(userId, storeId);
      }
    },
    seedExoplanets: {
      type: GraphQLString,
      args: {
        storeId: { type: GraphQLID }
      },
      resolve(parentValue, { storeId }) {
        return ProductService.seedExoplanets(storeId);
      }
    },
    seedStars: {
      type: GraphQLString,
      args: {
        storeId: { type: GraphQLID }
      },
      resolve(parentValue, { storeId }) {
        return ProductService.seedStars(storeId);
      }
    },
    seedSpaceships: {
      type: GraphQLString,
      args: {
        storeId: { type: GraphQLID }
      },
      resolve(parentValue, { storeId }) {
        return ProductService.seedSpaceships(storeId);
      }
    },
    seedSpacesuits: {
      type: GraphQLString,
      args: {
        storeId: { type: GraphQLID }
      },
      resolve(parentValue, { storeId }) {
        return ProductService.seedSpacesuits(storeId);
      }
    },
    seedFoods: {
      type: GraphQLString,
      args: {
        storeId: { type: GraphQLID }
      },
      resolve(parentValue, { storeId }) {
        return ProductService.seedFoods(storeId);
      }
    },
    addImageToStore: {
      type: StoreType,
      args: {
        storeId: { type: GraphQLID },
        image: { type: GraphQLString}
      },
      resolve(parentValue, { storeId, image }) {
        return Store.addImage(storeId, image);
      }
    },
    addImageToUser: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        image: { type: GraphQLString }
      },
      resolve(parentValue, { userId, image }) {
        return User.addImage(userId, image);
      }
    }
  }
});

module.exports = mutation;
