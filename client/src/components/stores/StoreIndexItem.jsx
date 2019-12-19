import React from 'react';
import { withRouter } from 'react-router-dom';
import Stars from '../ui/Stars';

class StoreIndexItem extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <li 
        className="pi-product-detail"
        onClick={() => this.props.history.push(`/stores/${store._id}`)}
      >
        <div
          className="pi-product-image"
          style={{ backgroundImage: `url(${store.image})` }}>
        </div>
        <div className="pi-name">{store.name}</div>
        <Stars store={store} />
      </li>
    )
  }
}

export default withRouter(StoreIndexItem);