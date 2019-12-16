import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
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