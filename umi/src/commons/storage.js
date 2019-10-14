// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

const STORAGE_KEY = 'todos-react';

export function getTodos() {
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
}

export function setTodos(todos) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function onReducer(reducer) {
  return function (state, action) {
    if (!action.type.indexOf('todomvc')) {
      setTodos(state.todomvc.todos);
    }
    return reducer(state, action);
  }
}
