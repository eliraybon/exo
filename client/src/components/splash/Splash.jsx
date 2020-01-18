import React from 'react';
import Particles from 'react-particles-js';
import Register from '../auth/Register';
import Login from '../auth/Login';
import { NavLink } from 'react-router-dom';


export default class Splash extends React.Component {
  render() {
    const pathname = this.props.location.pathname;

    return (
      <div className="splash-page">
        <Particles className="particles-canvas"
          params={
            {
              "particles": {
                "number": {
                  "value": 75,
                  "density": {
                    "enable": true,
                    "value_area": 1000
                  }
                },
                "color": {
                  "value": "#D1B9F5"
                },
                "shape": {
                  "type": "circle",
                  "stroke": {
                    "width": 10,
                    "color": "#005B33"
                  },
                  "polygon": {
                    "nb_sides": 8
                  },
                  "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                  }
                },
                "opacity": {
                  "value": 0.5,
                  "random": false,
                  "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                  }
                },
                "size": {
                  "value": 3,
                  "random": true,
                  "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                  }
                },
                "line_linked": {
                  "enable": true,
                  "distance": 200,
                  "color": "#898989",
                  "opacity": 0.5,
                  "width": 2.4
                },
                "move": {
                  "enable": true,
                  "speed": 6,
                  "direction": "none",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                  }
                }
              },
              "retina_detect": true
            }
          } />

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
};

