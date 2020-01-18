import React from 'react';
import { NavLink } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';

class SplashBox extends React.Component {

  render() {

    const { pathname } = this.props;

    return (
      <div>
        
        <div className="splash-box-2">
          <div className="splash-navbar">
            <div className="splash-logo"
              // style={{ backgroundImage: `url(/assets/pictures/logo.png)` }}
              onClick={() => this.props.history.push('/home')}
            >
              
              </div>
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
            {pathname === "/home" && (
              <p className="splash-motto">One stop shop for the intergalactic traveller</p>
            )}

            {pathname === "/home/register" && (
              <Register />
            )}

            {pathname === "/home/login" && (
              <Login />
            )}


          </div>
        </div>
      </div>
      
    )
  }
}

export default SplashBox;