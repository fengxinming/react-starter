import { dynamic } from 'dva';

export default function (app) {
  return [{
    path: '/',
    exact: true,
    component: dynamic({
      app,
      component: () => import('../views/home')
    })
  }];
}
