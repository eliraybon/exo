import React from 'react';
import { Route, NavLink, Redirect, Link, withRouter } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';

class SplashBox extends React.Component {

  render() {
    return (
      <div className="splash-box">
        

        <div className="splash-navbar">
          <ul className="splash-navbar-links">
            <h1
              onClick={() => this.props.history.push('/home')}
            >
              Exo
            </h1>
            <li key={1}>
              <NavLink
                activeClassName="active-navbar-link"
                to="/home/register"
              >Sign Up
              </NavLink>
            </li>

            <li key={2}>
              <NavLink
                activeClassName="active-navbar-link"
                to="/home/login"
              >Login
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="user-show-main">
          <Route
            exact path="/home"
            render={() => <p>One stop shop for the intergalactic traveller</p>}
          />

          <Route
            exact path="/home/register"
            render={() => <Register
            />}
          />

          <Route
            exact path="/home/login"
            render={() => <Login
            />}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(SplashBox);