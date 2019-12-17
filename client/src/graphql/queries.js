import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;


export const FETCH_USERS = gql`
  query fetchUsers {
    users {
      _id
      name
    }
  }
`;

export const FETCH_USER = gql`
  query fetchUser($id: ID!) {
    user(_id: $id) {
      _id
      name
      owner
      favoriteStores {
        _id
        name
      }
      favoriteProducts {
        _id
        name
        price 
      }
    }
  }
`;

export const FETCH_STORES = gql`
  query fetchStores {
    stores {
      _id
      name
    }
  }
`;

export const FETCH_STORE = gql`
  query fetchStore($id: ID!) {
    store(_id: $id) {
      _id
      name
      owner {
        _id
        name
      }
      products {
        _id
        name
        description
        image
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
    mass
    volume
    image
  }
}
`;
