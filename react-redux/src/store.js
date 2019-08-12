import { createStore, applyMiddleware } from 'redux';
import { reducer, middleware, Sam } from 'redux-sam';
import { eachModule } from './utils/module-util';

const modules = {};
eachModule(require.context('./models', false, /^\.\/.+\.js$/), (model, key) => {
  modules[key.replace(/^\.\/(.+)\.js$/, '$1')] = model;
});

const sam = new Sam({
  modules
});

const store = createStore(reducer(sam), sam.state, applyMiddleware(middleware(sam)));

export { store, sam };
