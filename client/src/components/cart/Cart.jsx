import React from "react";
import { Query, ApolloConsumer } from "react-apollo";

import { FETCH_USER_CART } from "../../graphql/queries";
import ProductIndexItem from "../products/ProductIndexItem";
import { VERIFY_USER } from "../../graphql/mutations";

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentUser: null, loading: true, prices: [] }
  }

  priceTotal(cart) {

  }

  render() {
    return (
      <ApolloConsumer>
        {client => {
          // debugger
          client.mutate({ mutation: VERIFY_USER, variables: { token: localStorage.getItem("auth-token") } })
            .then(({ data: verifyUser }) => {
              this.setState({ loading: false, currentUser: verifyUser.verifyUser._id })
            })
          if (this.state.loading) return <div>Loading...</div>
          return(
            <Query query={FETCH_USER_CART} variables={{ id: this.state.currentUser }}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                // console.log(data)

                if (data.user.cartProducts.length < 1) {
                  return (
                    <div className="cart-outer to-flex">
                      <div className="cart-ribbon to-flex-col col-center">
                        <div className="cart-big-box cart-box-empty">
                          <div className="cart-empty-above">Your cart is empty</div>
                          <div className="cart-empty-linebreak"></div>
                          <div className="cart-empty-below" onClick={() => this.props.history.push(`/products/`)}>Discover something amazing to fill it up</div>
                        </div>
                      </div>
                    </div>
                    
                  )
                }
                return (
                  <div className="cart-outer to-flex">
                    <div className="cart-ribbon to-flex-col">
                      <div className="cart-text-above to-flex">
                        <div>{data.user.cartProducts.length} items in your cart</div>
                        <div className="keep-shopping" onClick={() => this.props.history.push(`/products/`)}>keep shopping</div>
                      </div>
                      <div className="cart-big-box to-flex">
                        <div className="cart-left-section to-flex-col">
                          <ul>
                            {data.user.cartProducts.map(product => {
                              return (
                                <ProductIndexItem key={product._id} product={product} cart={true} userId={this.state.currentUser}/>
                              )
                            })}
                          </ul>
                        </div>
                        <div className="cart-right-section to-flex-col">
                            <div className="cart-ditty">Thank you for your patronage! Please proceed to automatically charge your HoloCard account</div>
                            <div className="cart-right-douple">
                              <div className="cart-item-total">item total</div>
                            <div className="cart-item-total">{}</div>
                            </div>
                            <div className="cart-right-douple">
                              <div className="cart-discount">discount</div>
                              <div className="cart-discount">discount</div>
                            </div>
                            
                            <div className="cart-linebreak"></div>

                            <div className="cart-right-douple">
                              <div className="cart-subtotal">subtotal</div>
                              <div className="cart-subtotal">subtotal</div>
                            </div>

                            <div className="cart-right-douple">
                              <div className="cart-shipping">shipping</div>
                              <div className="cart-shipping">hipping</div>
                            </div>
                            <div className="cart-linebreak"></div>
                            <div className="cart-right-douple">
                              <div className="cart-total">total</div>
                              <div className="cart-total">total</div>
                            </div>
                            <button className="cart-button ps-cart-button">
                              <div className="ps-button-text">Purchase</div><i className="far fa-hand-point-up"></i>
                            </button>
                        </div>
                      </div>
                      <div>text below</div>
                    </div>
                  </div>
                )
              }}
            </Query>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default Cart;