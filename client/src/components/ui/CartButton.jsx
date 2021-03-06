import React from 'react';
import { Mutation } from 'react-apollo';

import { ADD_TO_CART, REMOVE_FROM_CART } from '../../graphql/mutations';
import { FETCH_USER_CART, FETCH_PRODUCT } from '../../graphql/queries';

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

  render() {
    const { isInCart } = this.props;
    if (!isInCart) {
      return (
        <Mutation
          mutation={ADD_TO_CART}
          onCompleted={() => this.props.updateCart(true)}
          update={this.updateCache}
          refetchQueries={[
            {
              query: FETCH_USER_CART,
              variables: {
                id: this.props.currentUserId
              }
            },
            {
              query: FETCH_PRODUCT,
              variables: {
                _id: this.props.productId
              }
            }
          ]}
        >
          {addToCart => (
            <button
              className="ps-cart-button"
              onClick={e => this.handleAddToCart(e, addToCart)}
            >
              <div className="ps-button-text">Add to cart</div><i className="far fa-hand-point-up"></i>
            </button>
          )}
        </Mutation>
      )
    } else {
      return (
        <Mutation
          mutation={REMOVE_FROM_CART}
          update={this.updateCache}
          onCompleted={() => this.props.updateCart(false)}
          refetchQueries={[
            {
              query: FETCH_USER_CART,
              variables: {
                id: this.props.currentUserId
              }
            },
            {
              query: FETCH_PRODUCT,
              variables: {
                _id: this.props.productId
              }
            }
          ]}
        >
          {removeFromCart => (
            <button
              className="ps-in-cart-button"
              onClick={e => this.handleRemoveFromCart(e, removeFromCart)}
            >
              <div className="ps-in-cart-text">Remove from cart</div>
            </button>
          )}
        </Mutation>
      )
    }
  }
}