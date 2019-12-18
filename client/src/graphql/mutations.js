import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
      _id
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
      _id
    }
  }
`;

export const REGISTER_USER = gql `
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      email
      token
      loggedIn
      _id
    }
  }
`;

export const ADD_FAVORITE_STORE = gql`
  mutation AddFavoriteStore($userId: ID!, $storeId: ID!) {
    addFavoriteStore(userId: $userId, storeId: $storeId) {
      _id
      name
    }
  }
`;

export const ADD_FAVORITE_PRODUCT = gql`
  mutation AddFavoriteProduct($userId: ID!, $productId: ID!) {
    addFavoriteProduct(userId: $userId, productId: $productId) {
      _id
      name
    }
  }
`;

export const DELETE_FAVORITE_STORE = gql`
  mutation DeleteFavoriteStore($userId: ID!, $storeId: ID!) {
    deleteFavoriteStore(userId: $userId, storeId: $storeId) {
      _id
      name
    }
  }
`;

export const DELETE_FAVORITE_PRODUCT = gql`
  mutation DeleteFavoriteProduct($userId: ID!, $productId: ID!) {
    deleteFavoriteProduct(userId: $userId, productId: $productId) {
      _id
      name
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $productId: ID!) {
    addToCart(userId: $userId, productId: $productId) {
      _id
      name
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($userId: ID!, $productId: ID!) {
    removeFromCart(userId: $userId, productId: $productId) {
      _id
      name
    }
  }
`;