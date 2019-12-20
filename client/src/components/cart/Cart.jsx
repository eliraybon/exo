import React from "react";
import { Query, ApolloConsumer } from "react-apollo";

import { FETCH_USER_CART } from "../../graphql/queries";
import ProductIndexItem from "../products/ProductIndexItem";
import { VERIFY_USER } from "../../graphql/mutations";

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentUser: null, loading: true }
    this.priceTotal = this.priceTotal.bind(this);
  }

  priceTotal(cart) {
    const numbers = cart.map((product) => product.price);
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum;

  }

  render() {
    return (
      <ApolloConsumer>
        {client => {

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
                      <div className="cart-ribbon to-flex-col col-center shadow">
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
                    <div className="cart-ribbon to-flex-col shadow">
                      <div className="cart-text-above to-flex">
                        <div>{data.user.cartProducts.length} items in your cart</div>
                        <div className="keep-shopping" onClick={() => this.props.history.push(`/products/`)}>keep shopping</div>
                      </div>
                      <div className="cart-big-box to-flex">
                        <div className="cart-left-section to-flex-col">
                          <ul>
                            {data.user.cartProducts.map((product, i) => {
                              return (
                                <ProductIndexItem key={i} product={product} cart={true} userId={this.state.currentUser}/>
                              )
                            })}
                          </ul>
                        </div>
                        <div className="cart-right-section to-flex-col">
                            <div className="cart-ditty">Thank you for your patronage! Please proceed to automatically charge your HoloCard account</div>
                            <div className="cart-right-douple">
                              <div className="cart-item-total">item total:</div>
                            <div className="cart-item-total">{this.priceTotal(data.user.cartProducts)}</div>
                            </div>
                            <div className="cart-right-douple">
                              <div className="cart-discount">discount: 10%</div>
                              <div className="cart-discount">-{(this.priceTotal(data.user.cartProducts) * 0.1).toFixed(2)}</div>
                            </div>
                            
                            <div className="cart-linebreak"></div>

                            <div className="cart-right-douple">
                              <div className="cart-subtotal">subtotal:</div>
                              <div className="cart-subtotal">{(this.priceTotal(data.user.cartProducts) * 0.9).toFixed(2)}</div>
                            </div>

                            <div className="cart-right-douple">
                              <div className="cart-shipping">shipping:</div>
                              <div className="cart-shipping">{(this.priceTotal(data.user.cartProducts) * 0.072).toFixed(2)}</div>
                            </div>
                            <div className="cart-linebreak"></div>
                            <div className="cart-right-douple">
                              <div className="cart-total">total:</div>
                            <div className="cart-total">{((this.priceTotal(data.user.cartProducts) * 0.9) + (this.priceTotal(data.user.cartProducts) * 0.072)).toFixed(2)}</div>
                            </div>
                            <button className="cart-button ps-cart-button">
                              <div onClick={() => this.props.history.push("/purchase")} className="ps-button-text">Purchase</div><i className="far fa-hand-point-up"></i>
                            </button>
                        </div>
                      </div>
                     
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