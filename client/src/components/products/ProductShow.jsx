import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import { FETCH_PRODUCT } from "../../graphql/queries";


class ProductShow extends React.Component {
  constructor(props) {
    super(props);
    // this.id = this.props.match.params.id;

  }

  render() {
    // console.log(this.props.match.params.id);
    return (
      <Query query={FETCH_PRODUCT} variables={{ _id: `${this.props.match.params.id}` }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          console.log(data);
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
                    <div className="ps-store-mini">store details</div>
                    <div className="ps-name">{data.product.name}</div>
                    <div className="ps-price">${data.product.price}</div>
                    <div className="ps-options">Options for purchase</div>
                    <div className="ps-cart-button">cart Button</div>
                    <div className="ps-item-details">Item detail section</div>
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