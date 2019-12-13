import React from "react";
import { Route, Switch } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthRoute from '../util/route_util';
import Nav from './ui/Nav';

const App = () => {
  return (
    <div>
      <h1>Exo</h1>
      <Nav />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        {/* <Route exact path="/" component={Login} /> */}
      </Switch>
    </div>
  );
};

export default App;