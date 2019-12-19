import React from 'react';
import { Mutation } from 'react-apollo';

import { 
  ADD_FAVORITE_PRODUCT,
  ADD_FAVORITE_STORE,
  DELETE_FAVORITE_PRODUCT,
  DELETE_FAVORITE_STORE
} from '../../graphql/mutations';

import { 
  FETCH_USER
} from '../../graphql/queries';

class Favorite extends React.Component {
  //Props: 
  //favoriteId: either a product id or store id
  //currentUserId: the id of current user 
  //favorited : Boolean if the current user has already favorited
  //type: either product or store 

  handleAddProduct = (e, addFavoriteProduct) => {
    e.preventDefault();
    debugger;
    addFavoriteProduct({
      variables: {
        userId: this.props.currentUserId,
        productId: this.props.favoriteId
      }
    });
  }

  handleAddStore = (e, addFavoriteStore) => {
    e.preventDefault();
    addFavoriteStore({
      variables: {
        userId: this.props.currentUserId,
        storeId: this.props.favoriteId
      }
    });
  }

  handleDeleteProduct = (e, deleteFavoriteProduct) => {
    e.preventDefault();
    deleteFavoriteProduct({
      variables: {
        userId: this.props.currentUserId,
        productId: this.props.favoriteId
      }
    });
  }

  handleDeleteStore = (e, deleteFavoriteStore) => {
    e.preventDefault();
    deleteFavoriteStore({
      variables: {
        userId: this.props.currentUserId,
        storeId: this.props.favoriteId
      }
    });
  }

  updateCache(cache, { data }) {
    let user;
    try {
      user = cache.readQuery({
        query: FETCH_USER,
        variables: {
          id: this.props.currentUserId
        }
      });
    } catch (err) {
      return;
    }

    if (user) {
      cache.writeQuery({
        query: FETCH_USER,
        data: { user: user }
      });
    }
  }

  render() {
    const { isFavorited, type } = this.props;
    if (!isFavorited) {
      if (type === 'product') {
        return (
          <Mutation
            mutation={ ADD_FAVORITE_PRODUCT }
            onCompleted={() => this.props.updateFavorite(true)}
            update={this.updateCache}
            refetchQueries={[
              {
                query: FETCH_USER,
                variables: {
                  id: this.props.currentUserId
                }
              }
            ]}
          >
          {addFavoriteProduct => (
            <button
              className="favorite-button"
              onClick={e => this.handleAddProduct(e, addFavoriteProduct)}
            >
              Add to Favorites
            </button>
          )}
          </Mutation>
        )
      } else if (type === 'store') {
        return (
          <Mutation
            mutation={ADD_FAVORITE_STORE}
            onCompleted={() => this.props.updateFavorite(true)}
            update={this.updateCache}
            refetchQueries={[
              {
                query: FETCH_USER,
                variables: {
                  id: this.props.currentUserId
                }
              }
            ]}
          >
            {addFavoriteStore => (
              <button
                className="favorite-button"
                onClick={e => this.handleAddStore(e, addFavoriteStore)}
              >
                Add to Favorites
              </button>
            )}
          </Mutation>
        )
      }
    } else {
      if (type === 'product') {
        return (
          <Mutation
            mutation={DELETE_FAVORITE_PRODUCT}
            onCompleted={() => this.props.updateFavorite(false)}
            update={this.updateCache}
            refetchQueries={[
              {
                query: FETCH_USER,
                variables: {
                  id: this.props.currentUserId
                }
              }
            ]}
          >
            {deleteFavoriteProduct => (
              <button
                className="favorite-button"
                onClick={e => this.handleDeleteProduct(e, deleteFavoriteProduct)}
              >
                Remove from Favorites
            </button>
            )}
          </Mutation>
        )
      } else if (type === 'store') {
        return (
          <Mutation
            mutation={DELETE_FAVORITE_STORE}
            onCompleted={() => this.props.updateFavorite(false)}
            update={this.updateCache}
            refetchQueries={[
              {
                query: FETCH_USER,
                variables: {
                  id: this.props.currentUserId
                }
              }
            ]}
          >
            {deleteFavoriteStore => (
              <button
                className="favorite-button"
                onClick={e => this.handleDeleteStore(e, deleteFavoriteStore)}
              >
                Remove from Favorites
            </button>
            )}
          </Mutation>
        )
      }
    }
  }
}

export default Favorite;