import React from 'react';

import StoreIndex from '../stores/StoreIndex';


export default class OwnerShow extends React.Component {
  render() {
    const { owner } = this.props;
    return <div>
      <h1>{owner.name}</h1>
  
      <StoreIndex stores={owner.stores} />
    </div>
  }
}