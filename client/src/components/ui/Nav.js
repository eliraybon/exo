import React from 'react';
import { ApolloConsumer } from "react-apollo";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Search from "../search/Search";

const Nav = props => {
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
          <button className="option"><img className="favorites" src="https://img.icons8.com/pastel-glyph/64/000000/hearts.png" alt=""/></button>
          <button className="option" onClick={() => {
            if(document.getElementById("drpdwn").classList.contains("dropped")) {
              return document.getElementById("drpdwn").classList.remove("dropped")
            } else {
              document.getElementById("drpdwn").classList.add("dropped")}
            }
          }><img className="you" src="https://img.icons8.com/ios/50/000000/user-female-circle.png" alt=""/></button>
          <button className="option"><img className="cart" src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v1.png" alt=""/></button>
          <div className="dropdown-content" id="drpdwn">
            <p className="user-btn">User Profile</p>
            <ApolloConsumer>
              {client => (
                <div>
                  <button className="logout-btn"
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      client.writeData({ data: { isLoggedIn: false } });
                      props.history.push("/");
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
};

export default withRouter(Nav);