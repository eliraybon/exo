import React from 'react';

import StoreIndex from '../stores/StoreIndex';
import ProductIndex from '../products/ProductIndex';

export default class CustomerShow extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="user-show">
        <div className="user-show-head">

          <div className="user-show-left">
            <div className="user-show-img-placeholder"></div>
            <div className="user-show-info">
              <h1 className="user-show-name">{user.name}</h1>
              <p className="user-show-description">{user.description}</p>
            </div>
          </div>
        </div>

        <StoreIndex stores={user.favoriteStores} />
        <ProductIndex products={user.favoriteProducts} />
      </div>
    )
  }
}