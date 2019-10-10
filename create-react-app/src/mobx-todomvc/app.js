import './index.css';
import 'todomvc-app-css/index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import * as serviceWorker from './serviceWorker';

Object.defineProperty(Component.prototype, '$store', {
  get() {
    return store;
  }
});

ReactDOM.render((
  <App />
), document.getElementById('root'));

serviceWorker.unregister();
