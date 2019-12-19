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
          <button className="option">
            <div className="favorites"><i className="far fa-heart"></i></div>
            <div className="under-favorites"></div>
          </button>
          <button className="option" onClick={() => {
            if(document.getElementById("drpdwn").classList.contains("dropped")) {
              return document.getElementById("drpdwn").classList.remove("dropped")
            } else {
              document.getElementById("drpdwn").classList.add("dropped")}
            }

          }><i className="far fa-user you"></i></button>
          <button onClick={() => props.history.push("/cart")} className="option"><i className="fas fa-dolly cart"></i></button>

          <div className="dropdown-content" id="drpdwn">
            <p className="user-btn">User Profile</p>
            <ApolloConsumer>
              {client => (
                <div className="logout-btn">
                  <button
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