import React from "react";
import { Query } from "react-apollo";
import ProductIndex from './ProductIndex';

import { CATEGORY_PRODUCTS } from "../../graphql/queries";

class ProductExplore extends React.Component {
  render() {
    let count = 0
    let category = "exoplanet"
    return (
      <div className="pi-outer">
        <div className="pi-container" >
          <p className="pi-section-title">{category}</p>
          <Query query={CATEGORY_PRODUCTS} variables={{ category: category }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              return <ProductIndex products={data.categoryProducts} />
            }}
          </Query>
        </div>
      </div>
    );

  }
};

export default ProductExplore;