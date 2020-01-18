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
          <div className="pi-outer" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80)` }}>

          <div className="user-show pi-container">
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
                    alt=""
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
                    className="splash-button"
                    activeClassName="active-navbar-link"
                    to={`/users/${this.props.match.params.id}/items`}
                  ><div className="splash-button-text">Favorite Items</div>
                  </NavLink>
                </li>

                <li key={2}>
                  <NavLink
                    className="splash-button"
                    activeClassName="active-navbar-link"
                    to={`/users/${this.props.match.params.id}/stores`}
                  ><div className="splash-button-text">Favorite Stores</div>
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
                  render={() => <ProductIndex products={user.favoriteProducts} wrap={true}
                />}
              />
              <Route
                exact path="/users/:id/stores"
                  render={() => <StoreIndex stores={user.favoriteStores} wrap={true}
                />}
              />
            </div>
          </div>
          </div>
          )
        }}
      </Query>
    )
  }
};

