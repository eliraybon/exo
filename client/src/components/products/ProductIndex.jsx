import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";


import { CATEGORY_PRODUCTS } from "../../graphql/queries";

class ProductIndex extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    let count = 0
    let category = "exoplanet"
  return(
    <div className = "pi-container" >
      <Query query={CATEGORY_PRODUCTS} variables={{ category: category }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;

            return data.categoryProducts.map(({ id, name, price, mass, volume }) => (
              <li key={id}>
                <Link to={`/products/${id}`}>
                  <h4>{name}</h4>
                </Link>
                <p className="pi-price">Price: {price}</p>
              </li>
            ));
          }}
        </Query>
    </div>
  );

  }



};

export default ProductIndex;