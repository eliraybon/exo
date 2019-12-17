import React from 'react';
import StoreIndexItem from './StoreIndexItem';

export default class StoreIndex extends React.Component {
  render() {
    const { stores } = this.props;
    if (!stores) return null; 

    return (
      <ul className="store-index">
        {stores.map(store => {
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