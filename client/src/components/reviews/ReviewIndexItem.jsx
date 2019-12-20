import React from 'react';
import { Query, Mutation } from 'react-apollo';

import UpdateReview from './UpdateReview';

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
    if (this.state.updating) {
      return (
        <UpdateReview
          review={review}
          closeUpdate={this.closeUpdate}
        />
      )
    }
    return (
      <li>
        {review.rating}
        {review.body}

        <Query query={CURRENT_USER}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return <p>Error</p>
            const { currentUser } = data;

            if (review.author._id === currentUser) {
              return (
                <div className="rii-update-and-delete">
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
                          className="rii-delete-button"
                        >
                          Delete
                        </button>
                      )
                    })}
                  </Mutation>

                  <button onClick={() => this.setState({ updating: true })}>
                    update
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

