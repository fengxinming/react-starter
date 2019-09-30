import dva, { dynamic } from 'dva';
import createLoading from 'dva-loading';
import PageLoading from './components/PageLoading';
import router from './router';
import history from './history';
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
