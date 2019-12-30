import React from "react";
import { Query } from "react-apollo";
import ProductIndex from './ProductIndex';

import { CATEGORY_PRODUCTS } from "../../graphql/queries";

class ProductExplore extends React.Component {
  render() {


    let category = {"exoplanet": "Exoplanets", "star": "Stars", "spaceship": "Spaceships", "spacesuit": "Spacesuits", "food": "Food"}
    return (
      <div className="pi-outer" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80)` }}>
        <div className="pi-container" >
          {Object.keys(category).map(cTitle => {
            return (
             
              <Query query={CATEGORY_PRODUCTS} variables={{ category: cTitle }}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error</p>;
                  return (
                    <div className="to-flex-col">
                    <h2 className="pi-section-title">{category[cTitle]}:</h2>
                      <ProductIndex products={data.categoryProducts} category={category[cTitle]}/>
                    </div>
                  )
                }}
              </Query>
            )

          }
          )
          }
          
        </div>
      </div>
    );

  }
};

export default ProductExplore;