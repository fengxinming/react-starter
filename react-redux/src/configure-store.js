import { createStore, applyMiddleware } from 'redux';
import rx from './lib/redux-smt';
import { eachModule } from './utils/module-util';

const modules = {};
eachModule(require.context('./store', false, /^\.\/.+\.js$/), (model, key) => {
  modules[key.replace(/^\.\/(.+)\.js$/, '$1')] = model;
});

const { state, reducer, middleware } = rx({
  modules
});

const store = createStore(reducer, state, applyMiddleware(middleware));

export default store;
