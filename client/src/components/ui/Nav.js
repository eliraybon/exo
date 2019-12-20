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
    debugger;
    const { pathname } = this.props.location;
    if (pathname === "/login" || pathname === "/register") {
      return null;
    }

    if (pathname === "/splash" || pathname === "/") {
      return (
        <div className="nav-div">
          <header className="nav-header nav-splash">
            <div className="nav-logo">
              <h2 className="exo">Exo</h2>
            </div>
            <div className="auth-link-buttons">
              <div 
                className="splash-login-button"
                onClick={() => this.props.history.push('/login')}
              >
                Login
              </div>

              <div 
                className="splash-signup-button"
                onClick={() => this.props.history.push('/register')}
              >
                Sign Up
              </div>
            </div>

          </header>
        </div>
      );
    }

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
                  <button onClick={() => this.props.history.push(`/users/${this.state.currentUser}`)} className="option"><div className="favorites"><i className="far fa-heart"></i></div></button>
                )
              }}
            </ApolloConsumer>
            <button className="option" onClick={() => {
              if (document.getElementById("drpdwn").classList.contains("dropped")) {
                return document.getElementById("drpdwn").classList.remove("dropped")
              } else {
                document.getElementById("drpdwn").classList.add("dropped")
              }
            }
            }><i className="far fa-user you"></i></button>
            <button onClick={() => this.props.history.push("/cart")} className="option"><i className="fas fa-dolly cart"></i></button>
            <div className="dropdown-content" id="drpdwn">
              <p onClick={() => {
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