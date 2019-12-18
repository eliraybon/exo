import React from 'react';
import { Mutation } from "react-apollo";
import { NEW_REVIEW } from '../../graphql/mutations';
import { FETCH_PRODUCT } from '../../graphql/queries';

class CreateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      body: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.currentValue });
  }

  updateCache(cache, { data }) {
    let product;
    try {
      product = cache.readQuery({ 
        query: this.props.productQuery,
        variables: {
          id: this.props.productId
        }
      });
    } catch (err) {
      return;
    }

    if (product) {
      cache.writeQuery({
        query: this.props.productQuery,
        data: { product: product }
      });
    }
  }

  handleSubmit = (e, newReview) => {
    e.preventDefault();
    newReview({
      variables: {
        rating: this.state.rating,
        body: this.state.body,
        author: this.props.authorId,
        product: this.props.productId
      }
    }).then(data => {
      this.setState({
        body: ""
      });
    });
  }

  render() {
    return (
      <Mutation
        mutation={NEW_REVIEW}
        update={this.updateCache}
      >
        {newReview => {
          <div className="review-form-container">
            <form 
              class="review-form"
              onSubmit={e => this.handleSubmit(e, newReview)}
            >
              <h2>Leave a Review</h2>

              <select value={this.state.rating} onChange={this.update("rating")}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <textarea
                value={this.state.body}
                update={this.update("body")}
              />

              <button>Submit Review</button>
            </form>
          </div>
        }}
      </Mutation>
    )
  }
}

export default CreateReview;