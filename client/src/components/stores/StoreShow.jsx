import React from 'react';
import { Query } from 'react-apollo';
import ProductIndex from '../products/ProductIndex';

import { FETCH_STORE } from '../../graphql/queries';

export default class StoreShow extends React.Component {
  render() {
    const { store } = this.props;
    return (
    <Query query={FETCH_STORE} variables={{ id: this.props.match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return <p>Error</p>;
        const { store } = data;
        return (
          <div className="store-show">
            <h1>{store.name}</h1>
            <ProductIndex products={ store.products } />
          </div>
        )
      }}
    </Query>
  )}
}
