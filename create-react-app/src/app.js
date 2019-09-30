import './global.styl';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((<>
  <h1>React Examples</h1>
  <dl>
    <dt>Redux</dt>
    <dd><a href="redux-counter">Counter</a></dd>
    <dd><a href="redux-shopping-cart">Shopping Cart</a></dd>
    <dd><a href="redux-todomvc">TodoMVC</a></dd>
    <dd><a href="redux-chat">FluxChat</a></dd>
  </dl>
  <dl>
    <dt>Dva</dt>
    <dd><a href="dva-counter">Counter</a></dd>
    <dd><a href="dva-shopping-cart">Shopping Cart</a></dd>
    <dd><a href="dva-todomvc">TodoMVC</a></dd>
    <dd><a href="dva-chat">FluxChat</a></dd>
  </dl>
  <dl>
    <dt>Mobx</dt>
    <dd><a href="mobx-counter">Counter</a></dd>
    <dd><a href="mobx-shopping-cart">Shopping Cart</a></dd>
    <dd><a href="mobx-todomvc">TodoMVC</a></dd>
    <dd><a href="mobx-chat">FluxChat</a></dd>
  </dl>
</>), document.getElementById('root'));

serviceWorker.unregister();
