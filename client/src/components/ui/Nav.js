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
              
                return(
                  <button onClick={() => this.props.history.push(`/users/${this.state.currentUser}`)} className="option"><img className="favorites" src="https://img.icons8.com/pastel-glyph/64/000000/hearts.png" alt="" /></button>
                )
              }}
            </ApolloConsumer>
            <button className="option" onClick={() => {
              if(document.getElementById("drpdwn").classList.contains("dropped")) {
                return document.getElementById("drpdwn").classList.remove("dropped")
              } else {
                document.getElementById("drpdwn").classList.add("dropped")}
              }

            }><img className="you" src="https://img.icons8.com/ios/50/000000/user-female-circle.png" alt=""/></button>
            <button onClick={() => this.props.history.push("/cart")} className="option"><img className="cart" src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v1.png" alt=""/></button>

            <div className="dropdown-content" id="drpdwn">
                    <p onClick={() =>  {
                      if (document.getElementById("drpdwn").classList.contains("dropped")) {
                        this.props.history.push(`users/${this.state.currentUser}`)
                        return document.getElementById("drpdwn").classList.remove("dropped")
                      } else {
                        document.getElementById("drpdwn").classList.add("dropped")
                        this.props.history.push(`users/${this.state.currentUser}`)
                      }
                    }} className="user-btn">User Profile</p>
              <ApolloConsumer>
                {client => (
                  <div>
                    <button className="logout-btn"
                      onClick={e => {
                        e.preventDefault();
                        localStorage.removeItem("auth-token");
                        client.writeData({ data: { isLoggedIn: false } });
                        this.props.history.push("/");
                      }}>
                      Log out
                    </button>
                  </div>
                )}
              </ApolloConsumer>
            </div>
          </div>
        </header>
      </div>
    );
  }
};

export default withRouter(Nav);