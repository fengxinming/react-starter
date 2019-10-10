import '../global.styl';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/App';
import store from './store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  (<Provider {...store}>
    <App />
  </Provider>)
  , document.getElementById('root')
);

serviceWorker.unregister();
