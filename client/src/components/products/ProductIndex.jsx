import React from "react";
import ProductIndexItem from "./ProductIndexItem";


class ProductIndex extends React.Component {
  render() {
    const { products } = this.props;
    if (!products) return null; 

    return(
      <ul className="pi-section">
        {products.map(product => {
          return <ProductIndexItem product={ product } key={ product._id } />
        })}
      </ul>
    );
  }
};

export default ProductIndex;