const mongoose = require("mongoose");
const graphql = require("graphql");
const Product = mongoose.model("products");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
} = graphql;

const ProductType = new GraphQLObjectType({
  name: "ProductType", 
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    price: {
      type: GraphQLFloat
    },
    mass: {
      type: GraphQLFloat
    },
    volume: {
      type: GraphQLFloat
    },
    category: {
      type: GraphQLString
    },
    image: {
      type: GraphQLString
    },
    sold: {
      type: GraphQLBoolean
    },
    reviews: {
      type: new GraphQLList(require('./review_type')),
      resolve(parentValue) {
        return Product.findById(parentValue._id)
          .populate("reviews")
          .then(product => product.reviews)
      }
    },
    favorites: {
      type: new GraphQLList(GraphQLString),
      resolve(parentValue) {
        return Product.findById(parentValue._id)
          .then(product => product.favorites)
      }
    },
    //Star
    galacticLongitude: {
      type: GraphQLFloat
    },
    galacticLatitude: {
      type: GraphQLFloat
    },
    spectralType: {
      type: GraphQLString
    },
    stellarAge: {
      type: GraphQLString
    },
    luminosity: {
      type: GraphQLString
    },
    starDensity: {
      type: GraphQLString
    },
    starRadius: {
      type: GraphQLFloat
    },
    starMetallicity: {
      type: GraphQLString
    },
    planets: {
      type: GraphQLString
    },
    starDistance: {
      type: GraphQLFloat
    },
    // Exoplanet
    exoDistance: {
      type: GraphQLFloat
    },
    elipticLongitude: {
      type: GraphQLFloat
    },
    elipticLatitude: {
      type: GraphQLFloat
    },
    starSystem: {
      type: GraphQLString
    },
    planetRad: {
      type: GraphQLFloat
    },
    planetDensity: {
      type: GraphQLFloat
    },
    climate: {
      type: GraphQLString
    },
    planetYear: {
      type: GraphQLFloat
    },
    // Spaceships
    productionTime: {
      type: GraphQLFloat
    },
    capacity: {
      type: GraphQLInt
    },
    cargoVolume: {
      type: GraphQLFloat
    },
    maxAcc: {
      type: GraphQLFloat
    },
    maneuverability: {
      type: GraphQLFloat
    },
    // addtlFeatures: {
    //   type: GraphQLArray 
    // },
    // Spacesuit
    designer: {
      type: GraphQLString
    },
    size: {
      type: GraphQLString
    },
    o2Vol: {
      type: GraphQLFloat
    },
    vacExposure: {
      type: GraphQLFloat
    },
    color: {
      type: GraphQLString
    },
    // Food
    cuisine: {
      type: GraphQLString
    },
    storageMethod: {
      type: GraphQLString
    },
    labGrown: {
      type: GraphQLBoolean
    }
  })
});

module.exports = ProductType;