import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './containers/Home';

const  { lazy } = React
const CurrentYear = lazy(() => import('./containers/CurrentYear'))
const PastYear = lazy(() => import('./containers/PastYear'))
const Login = lazy(() => import('./containers/Login'))

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to='/home'></Redirect>}></Route>
      <Route path="/home" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/2019" component={CurrentYear} exact />
      <Route path="/2018" component={PastYear} exact />
      <Route path="/2017" component={PastYear} exact />
    </Switch>
  );
}

export default Routes;
