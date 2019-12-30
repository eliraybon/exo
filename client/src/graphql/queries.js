import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser @client
  }
`;


export const FETCH_USERS = gql`
  query fetchUsers {
    users {
      _id
      name
      image
    }
  }
`;

export const FETCH_USER = gql`
  query fetchUser($id: ID!) {
    user(_id: $id) {
      _id
      name
      image
      favoriteStores {
        _id
        name
        image
        products {
          _id
          reviews {
            _id
            rating
          }
        }
      }
      favoriteProducts {
        _id
        name
        price 
        image
      }
      store {
        _id
        name
        image
      }
    }
  }
`;

export const FETCH_USER_CART = gql`
  query fetchUserCart($id: ID!) {
    user(_id: $id) {
      _id
      name
      cartProducts {
        _id
        name
        price
        image
      }
    }
  }
`;

export const FETCH_STORES = gql`
  query fetchStores {
    stores {
      _id
      name
      image
      favorites
    }
  }
`;

export const FETCH_STORE = gql`
  query fetchStore($id: ID!) {
    store(_id: $id) {
      _id
      name
      image
      favorites
      owner {
        _id
        name
        image
      }
      products {
        _id
        name
        price
        description
        image
        reviews {
          _id
          rating
          body
        }
      }
    }
  }
`;

export const CATEGORY_PRODUCTS = gql`
  query categoryProducts ($category: String!) {
    categoryProducts(category: $category) {
      _id
      name
      price
      mass
      volume
      image
    }
  }
`;

export const FETCH_PRODUCT = gql`
query fetchProduct ($_id: ID!) {
  product(_id: $_id) {
    _id
    name
    price
    description
    mass
    volume
    category
    store {
      _id
      name
      rating
      owner
      {
        _id
        name
      }
    }
    image
    sold
    reviews {
      _id
      rating
      body
      product {
        _id
        name
      }
      author {
        _id
        name
      }
    }
    favorites 
    inCart
    productionTime
    capacity
    cargoVolume
    maxAcc
    maneuverability

    galacticLongitude
    galacticLatitude
    spectralType
    stellarAge
    luminosity
    starDensity
    starRadius
    starMetallicity
    planets
    starDistance

    exoDistance
    elipticLongitude
    elipticLatitude
    starSystem
    planetRad
    planetDensity

    color
    o2Vol
    vacExposure

    cuisine
    storageMethod
    labGrown
  }
}
`;
