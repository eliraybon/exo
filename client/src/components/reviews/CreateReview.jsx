import React from 'react';
import { Mutation } from "react-apollo";
import { NEW_REVIEW } from '../../graphql/mutations';

class CreateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      body: "",
      message: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }


  handleSubmit = (e, newReview) => {
    e.preventDefault();
    const body = this.state.body.trim();
    if (body) {
      newReview({
        variables: {
          rating: parseInt(this.state.rating),
          body,
          author: this.props.authorId,
          product: this.props.productId
        }
      }).then(data => {
        this.props.refetchProduct();
        this.setState({ body: "", message: "" });
      });
    } else {
      this.setState({ message: "Review cannot be empty"});
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_REVIEW}
        update={this.updateCache}
      >
        {newReview => (
          <div className="review-form-container">
            <form 
              className="review-form"
              onSubmit={e => this.handleSubmit(e, newReview)}
            >
              <h2>Leave a Review</h2>
              <p>{this.state.message}</p>

              <select value={this.state.rating} onChange={this.update("rating")}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <textarea
                value={this.state.body}
                onChange={this.update("body")}
              />

              <button>Submit Review</button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}

export default CreateReview;