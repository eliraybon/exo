import React from "react";
import { Query } from "react-apollo";
import ProductIndex from './ProductIndex';

import { CATEGORY_PRODUCTS } from "../../graphql/queries";

class ProductExplore extends React.Component {
  render() {

    let category = {"exoplanet": "Exoplanets", "star": "Stars", "spaceship": "Spaceships", "spacesuit": "Spacesuits", "food": "Food"}
    return (
      <div className="pi-outer">
        <div className="pi-container" >
          {Object.keys(category).map(cTitle => {
            return (
             
              <Query query={CATEGORY_PRODUCTS} variables={{ category: cTitle }}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error</p>;
                  return (
                    <div className="to-flex-col">
                    <div className="pi-section-title">{category[cTitle]}</div>
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