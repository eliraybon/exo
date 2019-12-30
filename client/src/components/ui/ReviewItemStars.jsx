import React from 'react';

export default class ReviewItemStars extends React.Component {
  

  returnStars = rating => {
    

    const one = (rating >= 1) ? "checked" : "";
    const two = (rating >= 2) ? "checked" : "";
    const three = (rating >= 3) ? "checked" : "";
    const four = (rating >= 4) ? "checked" : "";
    const five = (rating >= 5) ? "checked" : "";

    return (
      <div className="stars">
        <span className={`fa fa-star ${one}`}></span>
        <span className={`fa fa-star ${two}`}></span>
        <span className={`fa fa-star ${three}`}></span>
        <span className={`fa fa-star ${four}`}></span>
        <span className={`fa fa-star ${five}`}></span>
      </div>
    )
  }

  render() {
    return this.returnStars(this.props.rating);
  }
}