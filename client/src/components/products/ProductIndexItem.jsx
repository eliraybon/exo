import React from 'react';
import { withRouter } from 'react-router-dom';

class ProductIndexItem extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <li 
        onClick={() => this.props.history.push(`/products/${product._id}`)}
        className="pi-product-detail"
      >
        <div 
          className="pi-product-image" 
          style={{ backgroundImage: `url(${product.image})` }}>
        </div>
        <div className="pi-name">{product.name}</div>
        <div className="pi-price">${product.price}</div>
      </li>
    )
  }
}

export default withRouter(ProductIndexItem);