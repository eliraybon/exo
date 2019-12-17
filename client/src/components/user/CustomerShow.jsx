import React from 'react';

// import ProductIndex from '../products/ProductIndex';
import StoreIndex from '../stores/StoreIndex';

export default class CustomerShow extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>{user.name}</h1>
        <StoreIndex stores={user.favoriteStores} />
        {/* <ProductIndex products={user.favoriteProducts} /> */}
      </div>
    )
  }
}