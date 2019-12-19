import React from 'react';
import { Query } from "react-apollo";
import { Route, NavLink, Redirect, Link } from 'react-router-dom';

import ProductIndex from '../products/ProductIndex';
import StoreIndex from '../stores/StoreIndex';

import { FETCH_USER } from '../../graphql/queries';

export default class UserShow extends React.Component {
  render() {
    return (<Query 
              query={FETCH_USER} 
              variables={{ id: this.props.match.params.id }} 
            >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return <p>Error</p>;
          const { user } = data;

        return (
          <div className="user-show">
            <div className="user-show-head">

              <div className="user-show-left">
                <img
                  src={user.image}
                  className="user-show-img-placeholder"
                  alt={""}
                />
                <div className="user-show-info">
                  <h1 className="user-show-name">{user.name}</h1>
                  <p className="user-show-description">{user.description}</p>
                </div>
              </div>

             {user.store && (
                <div className="user-store">
                  <Link to={`/stores/${user.store._id}`}>
                  <img
                    className="user-store-image"
                    src={user.store.image}
                  />
                    <p className="user-store-name">{user.store.name}</p>
                  </Link>
                </div>
              )} 
            </div>

            <div className="user-navbar">
              <ul className="user-navbar-links">
                <li key={1}>
                  <NavLink
                    activeClassName="active-navbar-link"
                    to={`/users/${this.props.match.params.id}/items`}
                  >Favorite Items
                  </NavLink>
                </li>

                <li key={2}>
                  <NavLink
                    activeClassName="active-navbar-link"
                    to={`/users/${this.props.match.params.id}/stores`}
                  >Favorite Stores
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="user-show-main">
              <Route
                exact path="/users/:id"
                render={() => <Redirect
                  to={`/users/${this.props.match.params.id}/items`}
                />}
              />
              <Route
                exact path="/users/:id/items"
                render={() => <ProductIndex products={user.favoriteProducts}
                />}
              />

              <Route
                exact path="/users/:id/stores"
                render={() => <StoreIndex stores={user.favoriteStores}
                />}
              />
            </div>
          </div>
          )
        }}
      </Query>
    )
  }
};

