import { createStore } from 'redux-sam';
import { Component } from 'react';
import createLogger from 'redux-sam/logger';
import sleep from 'celia/sleep';

const state = {
  count: 0
}

const mutations = {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  }
}

const actions = {
  incrementIfOdd({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  async incrementAsync({ commit }) {
    await sleep(1000)
    commit('increment')
  }
}

const { store } = createStore({
  state,
  actions,
  mutations,
  plugins: [process.env.NODE_ENV !== 'production' && createLogger()]
}, Component);

export { store };
