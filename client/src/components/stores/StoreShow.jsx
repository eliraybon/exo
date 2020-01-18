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
          <div className="pi-outer" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80)` }}>
          <div className="pi-container">

            <div className="store-show-head">

              <div className="store-show-left">
                {/* <div className="store-show-img-placeholder"></div> */}
                <img
                  className="store-show-img-placeholder"
                  src={store.image}
                  alt=""
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
                    alt=""
                  />
                  <p className="store-owner-name">{store.owner.name}</p>
                </div>
              </div>
            </div>

            <ProductIndex products={ store.products } wrap={true} storePage={true}/>
          </div>
          </div>
        )
      }}
    </Query>
  )}
}
