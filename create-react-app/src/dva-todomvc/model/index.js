import { getTodos } from '../storage';

export { default as effects } from './effects';
export { default as reducers } from './reducers';
// export { default as effects } from './effects';
export const namespace = 'mvc';
export const state = {
  todos: getTodos(),
  todosChanged: 0
};
