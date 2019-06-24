import './index.styl';
import dva, { dynamic } from 'dva';
import createLoading from 'dva-loading';
import history from './history';
import router from './router';
import PageLoading from './components/PageLoading';
import * as serviceWorker from './serviceWorker';

// 设置动态加载组件时的默认效果
dynamic.setDefaultLoadingComponent(PageLoading);

const app = dva({
  history
});

app.use(createLoading());

app.router(router);

app.start('#root');

serviceWorker.unregister();
