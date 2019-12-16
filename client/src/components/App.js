import React from "react";
import { Route, Switch } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthRoute from '../util/route_util';
import Nav from './ui/Nav';
import UserShow from './user/UserShow';
import StoreShow from './stores/StoreShow';

const App = () => {
  return (
    <div>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <AuthRoute exact path="/users/:id" component={UserShow} routeType="protected" />
        <AuthRoute exact path="/stores/:id" component={StoreShow} routeType="protected" />
        <Route path="/" component={Nav} />
      </Switch>
    </div>
  );
};

export default App;