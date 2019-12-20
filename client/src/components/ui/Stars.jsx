import React from 'react';

export default class Stars extends React.Component {
  calculateRating = store => {
    let totalRating = 0;
    let totalReviews = 0;

    store.products.forEach(product => {
      product.reviews.forEach(review => {
        totalRating += review.rating;
        totalReviews++;
      })
    })

    if (totalReviews) {
      const rating = totalRating / totalReviews
      if (rating > 0.5) {
        return Math.ceil(totalRating / totalReviews);
      } else {
        return Math.floor(totalRating / totalReviews);
      }

    } else {
      return 0
    }
  }

  returnStars = store => {
    const rating = this.calculateRating(store);

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
    return this.returnStars(this.props.store);
  }
}