import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/index';
import LandingPage from './components/LandingPage/index';
import CheckoutPage from './components/CheckoutPage/index';
import Main from './components/Main/index';
import Login from './components/Login/index';
import ItemPage from './components/ItemPage/index';
import ErrorPage from './components/ErrorPage/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="browse" component={Main} />
    <Route path="item/:id" component={ItemPage} />
    <Route path="login" component={Login} />
    <Route path="cart" component={CheckoutPage} />
    <Route path="*" component={ErrorPage} />
  </Route>
);
