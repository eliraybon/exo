import React from "react";
import { Route, Switch, HashRouter } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthRoute from '../util/route_util';
import Nav from './ui/Nav';

import UserShow from './user/UserShow';
import StoreShow from './stores/StoreShow';
import ProductIndex from './products/ProductIndex';
import ProductShow from './products/ProductShow';


const App = () => {
  return (
    <div>
      <AuthRoute path="/" component={Nav} routeType="" />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <Route path="/products" component={ProductIndex} />
        <AuthRoute exact path="/users/:id" component={UserShow} routeType="protected" />
        <AuthRoute exact path="/stores/:id" component={StoreShow} routeType="protected" />
      </Switch>
    </div>
  );
};

export default App;