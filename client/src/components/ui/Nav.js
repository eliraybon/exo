import React from 'react';
import { ApolloConsumer } from "react-apollo";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Search from "../search/Search";
import { VERIFY_USER } from '../../graphql/mutations';
import { CURRENT_USER } from "../../graphql/queries";
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }
  }
  render() {
    // if(!this.props.token) {
    //   return null;
    // }
    return (
      <div className="nav-div">
        <header className="nav-header">
          <div className="nav-logo">
            <Link to="/products"><h2 className="exo">Exo</h2></Link>
          </div>
          <div className="search-ul">
            <Search />
          </div>
          <div className="nav-options">
            <ApolloConsumer>
              {client => {
                // debugger
                if (!this.state.currentUser) {
                  client.query({ query: CURRENT_USER })
                    .then(({ data }) => {
                      this.setState({ currentUser: data.currentUser })
                      // debugger
                    })
                }
                return (
                  <button onClick={() => this.props.history.push(`/users/${this.state.currentUser}`)} className="option"><i className="far fa-user you"></i></button>
                )
              }}
            </ApolloConsumer>

            <button onClick={() => this.props.history.push("/cart")} className="option"><i className="fas fa-dolly cart"></i></button>


            <ApolloConsumer>
              {client => (
                
                <button className="option"
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      client.writeData({ data: { isLoggedIn: false } });
                      this.props.history.push("/");
                    }}>
                    <i className="fas fa-sign-out-alt out"></i>
                    </button>
                
              )}
            </ApolloConsumer>





            
          </div>
        </header>
      </div>
    );
  }
};
export default withRouter(Nav);