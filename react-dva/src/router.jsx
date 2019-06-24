import React from 'react';
import { Router, Redirect } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { eachModule } from './utils/module-util';

// 模拟校验
function isLogged() {
  return document.cookie.indexOf('TMD_SESSIONID=') > -1;
}

export default function ({ history, app }) {
  const routes = [];
  eachModule(require.context('./routes', false, /^\.\/.+\.js$/), (model) => {
    const parts = model(app);
    parts.forEach((route) => {
      route.key = route.key || route.path;
      // 默认每个页面需要登录才能打开
      if (route.loginRequired !== false) {
        const { component: Cmp, render } = route;
        if (render) {
          route.render = props =>
            isLogged()
              ? render(props)
              : (<Redirect to="/login" />)
        } else if (Cmp) {
          route.render = props =>
            isLogged()
              ? (<Cmp {...props} />)
              : (<Redirect to="/login" />)
        } else {
          throw new TypeError('Property component or render must be required in route config');
        }
      }
      routes[routes.length] = route;
    });
  });

  return (
    <Router history={history}>
      {renderRoutes(routes)}
    </Router>
  );
};
