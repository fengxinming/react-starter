import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { dynamic } from 'dva';

export default function ({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        <Route
          key='index'
          path='/'
          exact={true}
          component={dynamic({
            app,
            models: () => [
              import('./model')
            ],
            component: () => import('./components/App')
          })} />
      </Switch>
    </Router>
  );
};
