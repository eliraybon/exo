import React from 'react';
import { Query } from 'react-apollo';
import ProductIndex from '../products/ProductIndex';
import Favorite from '../ui/Favorite';
import Stars from '../ui/Stars';

import { FETCH_STORE, CURRENT_USER } from '../../graphql/queries';


export default class StoreShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFavorited: '' }
  }

  updateFavorite = (isFavorited) => {
    this.setState({ isFavorited });
  }

  render() {
    return (
    <Query 
      query={FETCH_STORE} 
      variables={{ id: this.props.match.params.id }}
    >
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return <p>Error</p>;
        const { store } = data;

        return (
          <div className="store-show">

            <div className="store-show-head">

              <div className="store-show-left">
                {/* <div className="store-show-img-placeholder"></div> */}
                <img
                  className="store-show-img-placeholder"
                  src={store.image}
                />
                <div className="store-show-info">
                  <h1 className="store-show-name">{store.name}</h1>
                  <p className="store-show-description">{store.description}</p>
                  {/* {this.returnStars(store)} */}
                  <Stars store={store} />
                  <Query 
                    query={CURRENT_USER}
                    onCompleted={(data) => this.setState({ isFavorited: store.favorites.includes(data.currentUser) })}
                  >
                    {({ loading, error, data }) => {
                      
                      if (loading) return null;
                      if (error) return <p>Error</p>

                      return (
                        <Favorite 
                          favoriteId={store._id} 
                          currentUserId={data.currentUser}
                          type="store"
                          isFavorited={this.state.isFavorited}
                          updateFavorite={this.updateFavorite}
                        />
                      )
                    }}
                  </Query>
                </div>
              </div>

              <div className="store-show-owner">
                <p className="store-owner-text">Shop Owner</p>
                <div 
                  className="store-owner-div"
                  onClick={() => this.props.history.push(`/users/${store.owner._id}`)}
                >
                  {/* <div className="owner-image-placeholder"></div> */}
                  <img
                    className="owner-image-placeholder"
                    src={store.owner.image}
                  />
                  <p className="store-owner-name">{store.owner.name}</p>
                </div>
              </div>
            </div>

            <ProductIndex products={ store.products } wrap={true}/>
          </div>
        )
      }}
    </Query>
  )}
}
