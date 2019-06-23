import './index.styl';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import store from './configure-store';
import Router from './router';
import * as serviceWorker from './serviceWorker';

render(
  <>
    <Provider {...store}>
      <Router />
    </Provider>
    {
      process.env.NODE_ENV === 'development'
        ? (<DevTools />)
        : null
    }
  </>,
  document.getElementById('root'));

serviceWorker.unregister();
