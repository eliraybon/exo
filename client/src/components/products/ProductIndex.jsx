import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";


import { CATEGORY_PRODUCTS } from "../../graphql/queries";

class ProductIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(id) {
    return e => {
      e.preventDefault();
      this.props.history.push(`/products/${id}`);
    }

  }

  render() {
    let count = 0
    let category = "exoplanet"
  return(
    <div className="pi-outer">
    <div className = "pi-container" >
      <p className="pi-section-title">{category}</p>
      <ul className="pi-section">
      <Query query={CATEGORY_PRODUCTS} variables={{ category: category }}>
        
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;

            return data.categoryProducts.map(({ _id, name, price, mass, volume, image }) => (
              
              <li key={_id} className="pi-product-detail" onClick={this.handleClick(_id)}>
                <div className="pi-product-image" style={{ backgroundImage: `url(${image})` }}></div>

                <div className="pi-price">${price}</div>
                
              </li>
             
            ));
          }}
        </Query>
      </ul>
    </div>
    </div>
  );

  }



};

export default ProductIndex;