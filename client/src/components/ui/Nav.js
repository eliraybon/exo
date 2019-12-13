import React from 'react';
import { Query } from "react-apollo";
import { IS_LOGGED_IN } from '../../graphql/queries';
import { ApolloConsumer } from "react-apollo";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const Nav = props => {
  return (
    <div className="nav-bar-div">
      <h2>Exo</h2>
      <input className="nav-search" type="search" placeholder="Search for planets, stars, etc.."></input>
      <button>Favorites</button>
      <button>You</button>
      <button>Cart</button>
    </div>
  );
};

export default withRouter(Nav);