import { dynamic } from 'dva';

export default function (app) {
  return [{
    path: '/login',
    exact: true,
    loginRequired: false,
    component: dynamic({
      app,
      component: () => import('../views/login'),
      models() {
        return [import('../store/login')];
      }
    })
  }];
}
