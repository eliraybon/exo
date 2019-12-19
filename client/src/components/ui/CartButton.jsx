import React from 'react';
import { Mutation } from 'react-apollo';

import { ADD_TO_CART, REMOVE_FROM_CART } from '../../graphql/mutations';
import { FETCH_USER_CART } from '../../graphql/queries';

export default class CartButton extends React.Component {
  //props:
  //isInCart
  //productId
  //currentUserId

  handleAddToCart = (e, addToCart) => {
    e.preventDefault();
    addToCart({
      variables: {
        userId: this.props.currentUserId,
        productId: this.props.productId
      }
    });
  }

  handleRemoveFromCart = (e, removeFromCart) => {
    e.preventDefault();
    removeFromCart({
      variables: {
        userId: this.props.currentUserId,
        productId: this.props.productId
      }
    })
  }

  updateCache(cache, { data }) {
    let products;
    try {
      products = cache.readQuery({ query: FETCH_USER_CART });
    } catch (err) {
      return;
    }

    if (products) {
      //throw a debugger in here later and figure out what everything is
      let productArray = products.products;
      let newProduct = data.newProduct;
      cache.writeQuery({
        query: FETCH_USER_CART,
        data: { products: productArray.concat(newProduct) }
      });
    }
  }

  render() {
    const { isInCart } = this.props;
    if (!isInCart) {
      return (
        <Mutation
          mutation={ADD_TO_CART}
        >
          {addToCart => (
            <button
              className="cart-button"
              onClick={e => this.handleAddToCart(e, addToCart)}
              update={this.updateCache}
            >
              Add to Cart
            </button>
          )}
        </Mutation>
      )
    } else {
      return (
        <Mutation
          mutation={REMOVE_FROM_CART}
        >
          {removeFromCart => (
            <button
              className="cart-button"
              onClick={e => this.handleRemoveFromCart(e, removeFromCart)}
              update={this.updateCache}
            >
              Remove from Cart
            </button>
          )}
        </Mutation>
      )
    }
  }
}