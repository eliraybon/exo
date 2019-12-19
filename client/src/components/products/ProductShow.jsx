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
      hash = { "productionTime": ["Production Time", "days"],
      "capacity": ["Capacity", ""],
      "cargoVolume": ["Cargo Volume", "li3"],
      "maxAcc": ["Max Acceleration", "lm/s2"],
      "maneuverability": ["Maneuverability", "deg"] }
    }  else if (product.category === "exoplanet") {
      hash = {
        "starSystem": ["Star System", ""],
        "exoDistance": ["Distance from Star", "eRad"],
        "elipticLongitude": ["Eliptic Longitude", ""],
        "elipticLatitude": ["Eliptic Latitude", ""],
        "planetRad": ["Planet Radius", "eRad"],
        "planetDensity": ["Planet Density", "eDens"]
      }
    } else if (product.category === "star") {
      hash = {
        "stellarAge": ["Stellar Age", "solarYears"],
        "spectralType": ["Spectral Type", ""],
        "starDistance": ["Distance", "parsecs"],
        "galacticLongitude": ["Galactic Longitude", ""],
        "galacticLatitude": ["Galactic Latitude", ""],
        "planets": ["Planets in System", ""],
        "starRadius": ["Star Radius", "sRad"],
        "starMetallicity": ["Star Metallicity", "Fe/H"]
      }
    } else if (product.category === "spacesuit") {
      hash = {
        "description": ["Description", ""],
        "color": ["Color", ""],
        "o2Vol": ["O2 Volume", "m3"],
        "vacExposure": ["Vacuum Exposure Time", "minutes"]
      }

    } else if (product.category === "food") {

      hash = {
        "cuisine": ["Cuisine", ""],
        "storageMethod": ["Storage Method", ""],
        "labGrown": ["LabGrown", ""]
      }
    }
    
    
    let output = Object.keys(hash).map(key => {
      // console.log(product[key]);
      let catName = hash[key][0];
      let suffix = hash[key][1];
      console.log(product["description"]);
      if (catName === "LabGrown") {
        let food = (product.labGrown) ? "Yes" : "No";
        // console.log(food);

        return (
        <div className="ps-product-douple to-flex-col">
          <div className="ps-douple-key">{catName}:</div>
          <div className="ps-douple-info"> {food}</div>
        </div>)
      } else {
        return (
          <div className="ps-product-douple to-flex-col">
            <div className="ps-douple-key">{catName}:</div>
            <div className="ps-douple-info">{product[key]} {suffix}</div>
          </div>)
      }
      
    })
    return output;
    
  }

  render() {
    // console.log(this.props.match.params.id);
    const mSuff = {"exoplanet": "eMass", "star": "sMass", "spaceship": "kT", "spacesuit": "kg", "food": "g"};
    const vSuff = { "exoplanet": "eVol", "star": "sVol", "spaceship": "m3", "spacesuit": "cm3", "food": "cm3" };
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
                    <div className="ps-store-mini" onClick={() => this.props.history.push(`/stores/${data.product.store._id}`)}>{data.product.store.owner.name} {data.product.store.rating}</div>
                    <div className="ps-name ps-title">{data.product.name}</div>
                    <div className="ps-mass ps-below-title">{data.product.mass} {mSuff[data.product.category]}</div>
                    <div className="ps-volume ps-below-title">{data.product.volume} {vSuff[data.product.category]}</div>
                    <div className="ps-price">${data.product.price}</div>
                    {/* <div className="ps-options">Options for purchase</div> */}
                    <button className="ps-cart-button">
                      <div className="ps-button-text">Add to cart</div><i className="far fa-hand-point-up"></i>
                      </button>
                    
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