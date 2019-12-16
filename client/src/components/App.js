import React from "react";
import { Route, Switch, HashRouter } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthRoute from '../util/route_util';
import Nav from './ui/Nav';
import ProductIndex from './products/ProductIndex';

const App = () => {
  return (
    <div>
      <HashRouter>
        <AuthRoute path="/" component={Nav} routeType="" />
        <Switch>
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <AuthRoute exact path="/register" component={Register} routeType="auth" />
          <Route path="/products" component={ProductIndex} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;