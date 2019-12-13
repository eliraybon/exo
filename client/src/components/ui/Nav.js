import React from 'react';
import { Query } from "react-apollo";
import { IS_LOGGED_IN } from '../../graphql/queries';
import { ApolloConsumer } from "react-apollo";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const Nav = props => {
  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      client.writeData({ data: { isLoggedIn: false } });
                      props.history.push("/");
                    }}
                  >
                    Logout
                </button>
                  <Link to="/">Home</Link>
                </>
              );
            } else {
              return (
                <div>
                  <Link to="/">Home</Link>
                  <Link to="/register">Register</Link>
                  <Link to="/login">Login</Link>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Nav);