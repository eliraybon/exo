import React from 'react';
import { Query, Mutation } from 'react-apollo';

import UpdateReview from './UpdateReview';

import ReviewItemStars from '../ui/ReviewItemStars';

import { CURRENT_USER, FETCH_PRODUCT } from '../../graphql/queries';
import { DELETE_REVIEW, UPDATE_REVIEW } from '../../graphql/mutations';


export default class ReviewIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { updating: false };
  }

  closeUpdate = () => {
    this.setState({ updating: false });
  }

  handleDeleteReview = (e, deleteReview) => {
    e.preventDefault();
    deleteReview({
      variables: {
        reviewId: this.props.review._id
      }
    })
  }

  render() {
    const { review } = this.props;
    // console.log(review);
    if (this.state.updating) {
      return (
        <UpdateReview
          review={review}
          closeUpdate={this.closeUpdate}
        />
      )
    }
    return (
      <li className="review-index-item">
        <div className="to-flex review-item-douple">
          <h2 className="review-item-name">{review.product.name}</h2>
          <div className="review-item-rating"> <ReviewItemStars rating={review.rating} /></div>
        </div>
        
        
        <div className="review-item-user" onClick={() => this.props.history.push(`/users/${review.author._id}`)}>Reviewer: {review.author.name}</div>
          
        
        <div className="review-item-body">{review.body}</div>

        <Query query={CURRENT_USER}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return <p>Error</p>
            const { currentUser } = data;

            if (review.author._id === currentUser) {
              return (
                <div className="rii-update-and-delete to-flex">
                  <Mutation 
                    mutation={DELETE_REVIEW}
                    refetchQueries={[
                      {
                        query: FETCH_PRODUCT,
                        variables: {
                          _id: this.props.review.product._id
                        }
                      }
                    ]}
                  >
                    {(deleteReview => {
                      return (
                        <button 
                          onClick={e => this.handleDeleteReview(e, deleteReview)}
                          className="review-index-button"
                        >
                          Delete
                        </button>
                      )
                    })}
                  </Mutation>

                  <button  className="review-index-button" onClick={() => this.setState({ updating: true })}>
                    Update
                  </button>
                </div>
              )
            } else {
              return null;
            }
          }}
        </Query>
      </li>
    )
  }
}

