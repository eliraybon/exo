import React from 'react';
import { withRouter } from 'react-router-dom';
import { REMOVE_FROM_CART } from "../../graphql/mutations";
import { FETCH_USER_CART } from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo";


class ProductIndexItem extends React.Component {
  render() {
    const { product, cart, userId } = this.props;

    if (cart) {
      return (
        <li className="cart-element-box to-flex">
          <div 
            className="cart-image"
            style={{ backgroundImage: `url(${product.image})` }}
            onClick={() => this.props.history.push(`/products/${product._id}`)}
            >
          </div>
          <div className="to-flex large-douple">
            <div className="cart-name to-flex-col">
              <div className="cart-box-name">{product.name}</div>
              <div className="cart-douple to-flex">
                <div className="cart-btn">save</div>
                <ApolloConsumer>
                  {client => {
                    return <div 
                    className="cart-btn cart-remove" 
                    onClick={() => client.mutate({ 
                        mutation: REMOVE_FROM_CART, 
                        variables: { userId: userId, productId: product._id },
                        refetchQueries: [
                          {
                            query: FETCH_USER_CART,
                            variables: {
                              id: userId
                            }
                          }
                        ]
                       })}
                    >
                      remove
                    </div>;
                  }}
                </ApolloConsumer>
              </div>
            </div>
            <div className="cart-prod-price">${product.price}</div>
          </div>
        </li>
      )
    }

    return (
      <li 
        onClick={() => this.props.history.push(`/products/${product._id}`)}
        className="pi-product-detail"
      >
        <div 
          className="pi-product-image" 
          style={{ backgroundImage: `url(${product.image})` }}>
        </div>
        <div className="pi-name">{product.name}</div>
        <div className="pi-price">${product.price}</div>
      </li>
    )
  }
}

export default withRouter(ProductIndexItem);