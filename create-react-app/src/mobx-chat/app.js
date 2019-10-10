import './css/chat.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import App from './components/App';
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
