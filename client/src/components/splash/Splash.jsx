import React from 'react';
import Particles from 'react-particles-js';
import SplashBox from './SplashBox';


export default class Splash extends React.Component {
  render() {
    return (
      <div className="splash-page">
        <Particles className="canvas"
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
                  "value": "#ffffff"
                },
                "shape": {
                  "type": "circle",
                  "stroke": {
                    "width": 10,
                    "color": "#000000"
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
                  "opacity": 0.4,
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

        <SplashBox />



        {/* <p className="splash-box">
          One stop shop for the intergalactic traveller
        </p> */}
      </div>
    )
  }
};

