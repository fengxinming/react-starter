import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  basename: '/dva-counter'
});

export default history;
