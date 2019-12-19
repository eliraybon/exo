import React from "react";
import { Query, ApolloConsumer } from "react-apollo";

import { FETCH_USER_CART } from "../../graphql/queries";
import ProductIndexItem from "../products/ProductIndexItem";
import { VERIFY_USER } from "../../graphql/mutations";

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentUser: null, loading: true }
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

                return (
                  <div>
                    {data.user.cartProducts.map(product => {
                      return (
                        <ProductIndexItem key={product._id} product={product} />
                      )
                    })}
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