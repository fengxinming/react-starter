import './index.css';
import 'todomvc-app-css/index.css';
import dva from 'dva';
import createLoading from 'dva-loading';
import router from './router';
import history from './history';
import { onReducer } from './storage';
import * as serviceWorker from './serviceWorker';

const app = dva({
  history,
  onReducer
});

app.use(createLoading());

app.router(router);

app.start('#root');

serviceWorker.unregister();
