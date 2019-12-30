import React from "react";
import { Query } from "react-apollo";

import { 
  FETCH_PRODUCT,
  CURRENT_USER 
} from "../../graphql/queries";

import CreateReview from '../reviews/CreateReview';
import ReviewIndex from '../reviews/ReviewIndex';
import Favorite from '../ui/Favorite';
import CartButton from '../ui/CartButton';


class ProductShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFavorited: '', isInCart: '' };
    this.itemDetails = this.itemDetails.bind(this);
  }

  updateFavorite = (isFavorited) => {
    this.setState({ isFavorited });
  }

  updateCart = (isInCart) => {
    this.setState({ isInCart });
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
      // console.log(product["description"]);
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
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          const { product } = data;

          return (
            <Query
              query={CURRENT_USER}
              onCompleted={(data) => this.setState({ 
                isFavorited: product.favorites.includes(data.currentUser), 
                isInCart: product.inCart.includes(data.currentUser)
              })}
            >
              {({ loading, error, data }) => {

                if (loading) return null;
                if (error) return <p>Error</p>

                return (
                  <div className="ps-outer" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80)` }}>
                    <div className="ps-container">
                      <div className="ps-product">
                        <div className="ps-big">
                          <div className="ps-pic-container">
                            <div className="ps-picture" style={{ backgroundImage: `url(${product.image})` }}></div>
                          </div>
                          <div className="ps-reviews">
                            <CreateReview
                              productId={product._id}
                              authorId={data.currentUser}
                              productQuery={FETCH_PRODUCT}
                              refetchProduct={refetch}
                            />
                            <h2 className="store-reviews-title">More Reviews for this Item:</h2>
                            <ReviewIndex reviews={product.reviews} />
                          </div>
                        </div>
                        <div className="ps-side">
                          <div className="ps-store-mini" 
                            onClick={() => this.props.history.push(`/stores/${product.store._id}`)}
                            // onClick={() => console.log(product.store)}
                            >
                              {product.store.name} {product.store.rating}
                            </div>
                          <div className="ps-name ps-title">{product.name}</div>
                          <Favorite
                            favoriteId={product._id}
                            currentUserId={data.currentUser}
                            type="product"
                            isFavorited={this.state.isFavorited}
                            updateFavorite={this.updateFavorite}
                          />
                          <div className="ps-mass ps-below-title">{product.mass} {mSuff[product.category]}</div>
                          <div className="ps-volume ps-below-title">{product.volume} {vSuff[product.category]}</div>
                          <div className="ps-price">₶ {product.price}</div>
                          {/* <div className="ps-options">Options for purchase</div> */}
                          <CartButton
                            currentUserId={data.currentUser}
                            productId={product._id}
                            isInCart={this.state.isInCart}
                            updateCart={this.updateCart}
                          />

                          <div className="ps-item-details">

                            <div className="ps-product-douple to-flex-col">
                              <div className="ps-douple-key">Item Details:</div>
                              <div className="ps-douple-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Ultricies integer quis auctor elit sed vulputate mi sit amet. Tellus orci ac auctor augue mauris. Vel pretium lectus quam id. Quisque id diam vel quam elementum pulvinar. At quis risus sed vulputate. Volutpat diam ut venenatis tellus in metus vulputate eu. Nibh nisl condimentum id venenatis a condimentum. Id velit ut tortor pretium viverra suspendisse potenti. Posuere lorem ipsum dolor sit amet consectetur adipiscing.</div>
                            </div>

                            {this.itemDetails(product)}
                          </div>
                          <div className="ps-shipping">

                          </div>
                          <div className="ps-store-owner">

                          </div>
                        </div>
                      </div>
                      <div className="ps-store-band"></div>
                      <div className="ps-suggestions"></div>
                      <div className="ps-tags"></div>
                    </div>
                  </div>
                );
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}

export default ProductShow;