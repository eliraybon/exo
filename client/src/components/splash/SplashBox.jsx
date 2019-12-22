import React from 'react';
import { Route, NavLink, Redirect, Link, withRouter } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';

class SplashBox extends React.Component {

  render() {
    return (
      <div>
        <div className="splash-box"></div>
        
        <div className="splash-box-2">
          <div className="splash-navbar">
            <h1 className="splash-logo"
              onClick={() => this.props.history.push('/home')}
            >
              Exo
              </h1>
            <ul className="splash-navbar-links">
              
              <li key={1}>
                <NavLink className="splash-button"
                  activeClassName="active-navbar-link"
                  to="/home/register"
                ><div className="splash-button-text">Sign Up </div>
                </NavLink>
              </li>

              <li key={2}>
                <NavLink className="splash-button"
                  activeClassName="active-navbar-link"
                  to="/home/login"
                ><div className="splash-button-text">Login </div>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="user-show-main">
            <Route
              exact path="/home"
              render={() => <p className="splash-motto">One stop shop for the intergalactic traveller</p>}
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
      </div>
      
    )
  }
}

export default withRouter(SplashBox);