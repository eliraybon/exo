import React from 'react';
import { Query } from 'react-apollo';

import { FETCH_STORE } from '../../graphql/queries';

export default class StoreShow extends React.Component {
  render() {
    const { store } = this.props;
    return (
    <Query query={FETCH_STORE} variables={{ id: this.props.match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return <p>Error</p>;
        return (
          <p>This is a show page for {data.store.name}</p>
        )
      }}
    </Query>
  )}
}
