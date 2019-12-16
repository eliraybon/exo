import React from 'react';
import StoreIndexItem from './StoreIndexItem';

export default class StoreIndex extends React.Component {
  render() {
    return (
      <ul className="store-index">
        {this.props.stores.map(store => {
          return (
            <StoreIndexItem 
              store={store}
              key={store._id}
            />
          )
        })}
      </ul>
    )
  }
}