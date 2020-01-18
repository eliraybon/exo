import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthRoute from '../util/route_util';
import Nav from './ui/Nav';

import UserShow from './user/UserShow';
import StoreShow from './stores/StoreShow';
import ProductExplore from './products/ProductExplore';
import ProductShow from './products/ProductShow';
import Splash from './splash/Splash';
import Cart from "./cart/Cart";
import Purchase from "./cart/Purchase";


const App = () => {
  return (
    <div>
      <AuthRoute path="/" component={Nav} routeType="" />
      <Switch>
        <AuthRoute exact path="/home" component={Splash} routeType="auth" />
        <AuthRoute exact path="/home/register" component={Splash} routeType="auth" />
        <AuthRoute exact path="/home/login" component={Splash} routeType="auth" />
        {/* <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" /> */}
        <Route path="/products/:id" component={ProductShow} />
        <AuthRoute path="/products" component={ProductExplore} routeType="protected" />
        <AuthRoute path="/users/:id" component={UserShow} routeType="protected" />
        <AuthRoute exact path="/stores/:id" component={StoreShow} routeType="protected" />
        <AuthRoute exact path="/cart" component={Cart} routeType="protected" />
        <AuthRoute exact path="/purchase" component={Purchase} routeType="protected" />
        <Route path="/" render={() => <Redirect to="/products" />} />
      </Switch>
    </div>
  );
};

export default App;