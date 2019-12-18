import React from 'react';
import { Query } from 'react-apollo';
import ProductIndex from '../products/ProductIndex';
import Favorite from '../ui/Favorite';

import { FETCH_STORE, CURRENT_USER } from '../../graphql/queries';


export default class StoreShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFavorited: '' }
  }

  updateFavorite = (isFavorited) => {
    this.setState({ isFavorited });
  }

  calculateRating = store => {
    let totalRating = 0; 
    let totalReviews = 0; 

    store.products.forEach(product => {
      product.reviews.forEach(review => {
        totalRating += review.rating;
        totalReviews++;
      })
    })

    if (totalReviews) {
      const rating = totalRating / totalReviews
      if (rating > 0.5) {
        return Math.ceil(totalRating / totalReviews);
      } else {
        return Math.floor(totalRating / totalReviews);
      }

    } else {
      return "No reviews yet!"
    }
  }

  // updateStore(cache, newStore) {
  //   let stores;
  //   try {
  //     store = cache.readQuery({ query: FETCH_STORE });
  //   } catch (err) {
  //     return;
  //   }

  //   if (stores) {
  //     let storeArray = stores.stores;
  //     cache.writeQuery({
  //       query: FETCH_STORE,
  //       data: { emblems: emblemArray.concat(newEmblem) }
  //     });
  //   }
  // }


  render() {
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
                  <p>{this.calculateRating(store)}</p>
                  <Query query={CURRENT_USER}>
                    {({ loading, error, data }) => {
                      
                      if (loading) return null;
                      if (error) return <p>Error</p>

                      if (this.state.isFavorited === '') {
                        this.setState({ isFavorited: store.favorites.includes(data.currentUser)});
                      }
                      return (
                        <Favorite 
                          favoriteId={store._id} 
                          currentUserId={data.currentUser}
                          type="store"
                          isFavorited={this.state.isFavorited}
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
