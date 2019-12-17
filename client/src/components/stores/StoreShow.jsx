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

            <div className="store-show-head">

              <div className="store-show-left">
                <div className="store-show-img-placeholder"></div>
                <div className="store-show-info">
                  <h1 className="store-show-name">{store.name}</h1>
                  <p className="store-show-description">{store.description}</p>
                  <p>Rating</p>
                  <p>Favorite/Unfavorite</p>
                </div>
              </div>

              <div className="store-show-owner">
                <p className="store-owner-text">Shop Owner</p>
                <div 
                  className="store-owner-div"
                  onClick={() => this.props.history.push(`/users/${store.owner._id}`)}
                >
                  <div className="owner-image-placeholder"></div>
                  <p className="store-owner-name">{store.owner.name}</p>
                </div>
              </div>
            </div>

            <ProductIndex products={ store.products } />
          </div>
        )
      }}
    </Query>
  )}
}
