import React from "react";
import ProductIndexItem from "./ProductIndexItem";


class ProductIndex extends React.Component {
  render() {
    const { products, wrap } = this.props;
    let names
    if (!products) return null; 
    if (wrap) {
      names = "pi-section to-wrap"
    } else {
      names = "pi-section"
    }

    return(
      <ul className={names}>
        {products.map(product => {
          return <ProductIndexItem product={ product } key={ product._id } />
        })}
      </ul>
    );
  }
};

export default ProductIndex;