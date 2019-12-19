import React from 'react';
import { Route, Redirect, NavLink, withRouter } from 'react-router-dom';

import StoreIndex from '../stores/StoreIndex';
import ProductIndex from '../products/ProductIndex';

class CustomerShow extends React.Component {
  render() {
    const { user } = this.props;
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
            exact path ="/users/:id/items" 
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
  }
}

export default withRouter(CustomerShow);