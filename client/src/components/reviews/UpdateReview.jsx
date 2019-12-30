import React from 'react';
import { Mutation } from "react-apollo";
import { UPDATE_REVIEW } from '../../graphql/mutations';
import { FETCH_PRODUCT } from '../../graphql/queries';

import ReviewStars from './ReviewStars';

export default class UpdateReview extends React.Component {
  constructor(props) {
    super(props);
    const { review } = props;
    this.state = {
      rating: review.rating,
      body: review.body,
      message: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateRating = rating => {
    this.setState({ rating: rating });
  }

  handleSubmit = (e, updateReview) => {
    e.preventDefault();
    const body = this.state.body.trim();
    if (body) {
      updateReview({
        variables: {
          id: this.props.review._id,
          rating: parseInt(this.state.rating),
          body
        }
      }).then(data => {
        // this.props.refetchProduct();
        this.props.closeUpdate();
        this.setState({ body: "", message: "" });
      });
    } else {
      this.setState({ message: "Review cannot be empty" });
    }
  }

  render() {

    return (
      <Mutation
        mutation={UPDATE_REVIEW}
        refetchQueries={[
          {
            query: FETCH_PRODUCT,
            variables: {
              _id: this.props.review.product._id
            }
          }
        ]}
      >
        {updateReview => (
          <div className="review-form-container">
            <form
              className="review-form"
              onSubmit={e => this.handleSubmit(e, updateReview)}
            >
              {/* <p>{this.state.message}</p> */}

              <ReviewStars
                selectedStar={this.state.rating}
                updateRating={this.updateRating}
              />

              {/* <select value={this.state.rating} onChange={this.update("rating")}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select> */}

              <textarea
                className="review-input-text"
                value={this.state.body}
                onChange={this.update("body")}
              />

              <div className="to-flex">

              <button className="review-index-button">Update Review</button>
              <button className="review-index-button" onClick={this.props.closeUpdate}>
                Cancel
              </button>
              </div>
            </form>

            
          </div>
        )}
      </Mutation>
    )
  }
}