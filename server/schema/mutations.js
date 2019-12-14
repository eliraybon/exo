const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat } = graphql;
const AuthService = require('../services/auth');
const ProductService = require('../services/product');
const UserType = require('./types/user_type');
const ProductType = require('./types/product_type');
const Product = require("../models/Product");


const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString }
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
    createProduct: {
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
        // return ProductService.createProduct(args);
      }
    }
  }
});

module.exports = mutation;
