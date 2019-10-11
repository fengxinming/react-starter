import { Component } from 'react';
import { createStore } from 'redux-sam';
import { mutations, STORAGE_KEY } from './mutations';
import actions from './actions';
import plugins from './plugins';

const { store } = createStore({
  state: {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
    todosChanged: 0
  },
  actions,
  mutations,
  plugins
}, Component);

export { store };
