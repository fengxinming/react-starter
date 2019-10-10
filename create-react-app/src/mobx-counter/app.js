import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import * as serviceWorker from './serviceWorker';
import store from './store';

Object.defineProperty(Component.prototype, '$store', {
  get() {
    return store;
  }
});

ReactDOM.render(
  <Counter />
  , document.getElementById('root')
);

serviceWorker.unregister();
