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
        name
      }
      favoriteProducts {
        name
        price 
      }
    }
  }
`;