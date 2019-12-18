import React from 'react';
import { Query } from "react-apollo";

import OwnerShow from './OwnerShow';
import CustomerShow from './CustomerShow';

import { FETCH_USER } from '../../graphql/queries';

export default class UserShow extends React.Component {
  render() {
    return (<Query query={FETCH_USER} variables={{ id: this.props.match.params.id }} pollInterval={1}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return <p>Error</p>;
          return (
            data.user.owner 
            ? <OwnerShow owner={data.user} /> 
            : <CustomerShow user={data.user} />
          )
        }}
      </Query>
    )
  }
};

