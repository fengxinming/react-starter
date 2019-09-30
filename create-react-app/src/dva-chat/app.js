import './css/chat.css';
import dva from 'dva';
import createLoading from 'dva-loading';
import router from './router';
import history from './history';
import * as serviceWorker from './serviceWorker';

const app = dva({
  history
});

app.use(createLoading());

app.router(router);

app.start('#root');

serviceWorker.unregister();
