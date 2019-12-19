import React from "react";
import { Query } from "react-apollo";

import { 
  FETCH_PRODUCT,
  CURRENT_USER 
} from "../../graphql/queries";

import CreateReview from '../reviews/CreateReview';
import ReviewIndex from '../reviews/ReviewIndex';


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
      "cargoVolume": ["Cargo Volume", ""],
      "maxAcc": ["Max Acceleration", ""],
      "maneuverability": ["Maneuverability", ""] }
    } else if (product.category === "star") {
      hash = {
        "stellarAge": ["Stellar Age", ""],
        "spectralType": ["Spectral Type", ""],
        "starDistance": ["Distance", ""],
        "galacticLatitude": ["Galactic Latitude", ""],
        "galacticLongitude": ["Galactic Longitude", ""],
        "planets": ["Planets", ""]
      }
    } else if (product.category === "exoplanet") {
      hash = {
        "starSystem": ["Star System", ""],
        "exoDistance": ["Distance from Star", "eu"],
        "elipticLongitude": ["Eliptic Longitude", ""],
        "elipticLatitude": ["Eliptic Latitude", ""],
        "planetRad": ["Planet Radius", "eRad"],
        "planetDensity": ["Planet Density", "eDens"]
      }
    }


    console.log(product);
    let output = Object.keys(hash).map(key => {
      return(<div className="ps-product-douple to-flex-col">
        <div className="ps-douple-key">{hash[key][0]}:</div>
        <div className="ps-douple-info">{product[key]} {hash[key][1]}</div>
      </div>)
    })
    return output;
    
  }

  render() {
    // console.log(this.props.match.params.id);
    return (
      <Query query={FETCH_PRODUCT} variables={{ _id: `${this.props.match.params.id}` }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          console.log(data.product);
          const { product } = data;

          return (
            <div className="ps-outer">
              <div className="ps-container">
                <div className="ps-product">
                  <div className="ps-big">
                    <div className="ps-pic-container">
                      <div className="ps-picture" style={{ backgroundImage: `url(${product.image})` }}></div>
                    </div>
                    <div className="ps-reviews">Reviews
                                    <Query
                        query={CURRENT_USER}
                      >
                        {({ loading, error, data }) => {

                          if (loading) return null;
                          if (error) return <p>Error</p>

                          return (
                            <CreateReview
                              productId={product._id}
                              authorId={data.currentUser}
                              productQuery={FETCH_PRODUCT}
                              refetchProduct={refetch}
                            />
                          )
                        }}
                      </Query>

                      <ReviewIndex reviews={product.reviews} />
                    
                    
                    
                    </div>
                  </div>
                  <div className="ps-side">
                    <div className="ps-store-mini" onClick={() => this.props.history.push(`/stores/${product.store._id}`)}>{product.store.owner.name} {product.store.rating}</div>
                    <div className="ps-name ps-title">{product.name}</div>
                    <div className="ps-mass ps-below-title">{product.mass} eMass</div>
                    <div className="ps-volume ps-below-title">{product.volume}</div>
                    <div className="ps-price">${product.price}</div>
                    {/* <div className="ps-options">Options for purchase</div> */}
                    <button className="ps-cart-button">
                      <div className="ps-button-text">Add to cart</div>
                      </button>
                    
                    <div className="ps-item-details">{this.itemDetails(product)}</div>
                    <div className="ps-shipping">Shipping infor</div>
                    <div className="ps-store-owner">store owner details</div>
                  </div>
                </div>
                <div className="ps-store-band">Products from store</div>
                <div className="ps-suggestions">search suggestions</div>
                <div className="ps-tags">tags on tags</div>
              </div>

              {/* <Query
                query={CURRENT_USER}
              >
                {({ loading, error, data }) => {

                  if (loading) return null;
                  if (error) return <p>Error</p>

                  return (
                    <CreateReview
                      productId={product._id}
                      authorId={data.currentUser}
                      productQuery={FETCH_PRODUCT}
                      refetchProduct={refetch}
                    />
                  )
                }}
              </Query>

              <ReviewIndex reviews={product.reviews} /> */}
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