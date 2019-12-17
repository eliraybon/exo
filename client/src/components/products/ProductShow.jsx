import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import { FETCH_PRODUCT } from "../../graphql/queries";


class ProductShow extends React.Component {
  constructor(props) {
    super(props);
    // this.id = this.props.match.params.id;
    this.itemDetails = this.itemDetails.bind(this);

  }

  itemDetails(product) {
    let hash
    if (product.category === "spaceship") {
      hash = { "productionTime": "Production Time",
      "capacity": "Capacity",
      "cargoVolume": "Cargo Volume",
      "maxAcc": "Max Acceleration",
      "maneuverability": "Maneuverability" }
    } else if (product.category === "spaceship") {
      hash = {
        "productionTime": "Production Time",
        "capacity": "Capacity",
        "cargoVolume": "Cargo Volume",
        "maxAcc": "Max Acceleration",
        "maneuverability": "Maneuverability"
      }
    }


    console.log(product);
    let output = Object.keys(hash).map(key => {
      return(<div className="ps-product-douple to-flex-col">
        <div className="ps-douple-key">{hash[key]}:</div>
        <div className="ps-douple-info">{product.key}</div>
      </div>)
    })
    return output;
    
  }

  render() {
    // console.log(this.props.match.params.id);
    return (
      <Query query={FETCH_PRODUCT} variables={{ _id: `${this.props.match.params.id}` }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          console.log(data.product);
          return (
            <div className="ps-outer">
              <div className="ps-container">
                <div className="ps-product">
                  <div className="ps-big">
                    <div className="ps-pic-container">
                      <div className="ps-picture" style={{ backgroundImage: `url(${data.product.image})` }}></div>
                    </div>
                    <div className="ps-reviews">Reviews</div>
                  </div>
                  <div className="ps-side">
                    <div className="ps-store-mini ps-side-spacing">{data.product.store.owner.name} {data.product.store.rating}</div>
                    <div className="ps-name ps-side-spacing">{data.product.name}</div>
                    <div className="ps-price ps-side-spacing">${data.product.price}</div>
                    <div className="ps-options ps-side-spacing">Options for purchase</div>
                    <div className="ps-cart-button">cart Button</div>
                    <div className="ps-item-details">{this.itemDetails(data.product)}</div>
                    <div className="ps-shipping">Shipping infor</div>
                    <div className="ps-store-owner">store owner details</div>
                  </div>
                </div>
                <div className="ps-store-band">Products from store</div>
                <div className="ps-suggestions">search suggestions</div>
                <div className="ps-tags">tags on tags</div>
              </div>
            </div>
          );
        }}
      </Query>
    )
  }
}

export default ProductShow;


// const GodDetail = props => {
//   return (
    // <Query query={FETCH_PRODUCT} variables={{ id: props.match.params.id }}>
    //   {({ loading, error, data }) => {
    //     if (loading) return <p>Loading...</p>;
    //     if (error) return <p>Error</p>;
    //     return (
    //       <div className="detail">
    //        product detail goes here
    //       </div>
    //     );
    //   }}
    // </Query>
//   );
// };