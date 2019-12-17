import React from 'react';
import { Link } from 'react-router-dom';

export default class StoreIndexItem extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Link to={`/stores/${store._id}`}>
        <li>
          {store.name}
        </li>
      </Link>
    )
  }
}