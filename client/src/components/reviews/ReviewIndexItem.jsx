import React from 'react';

export default class ReviewIndexItem extends React.Component {
  render() {
    const { review } = this.props;
    return (
      <li>
        {review.rating}
        {review.body}
      </li>
    )
  }
}

