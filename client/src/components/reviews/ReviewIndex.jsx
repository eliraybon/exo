import React from 'react';
import ReviewIndexItem from './ReviewIndexItem';

export default class ReviewIndex extends React.Component {
  render() {
    const { reviews } = this.props;
    return (
      <ul className="review-index">
        {reviews.map(review => {
          return (
            <ReviewIndexItem 
              key={review._id}
              review={review}
            />
          )
        })}
      </ul>
    )
  }
}

