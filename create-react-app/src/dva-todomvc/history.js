import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  basename: '/dva-todomvc'
});

export default history;
