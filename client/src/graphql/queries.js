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