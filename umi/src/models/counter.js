import sleep from 'celia/sleep';

const state = {
  count: 0
}

const reducers = {
  increment2(state) {
    state.count++;
    return state;
  },
  decrement2(state) {
    state.count--;
    return state;
  }
}

const effects = {
  *increment(context, { put }) {
    yield put({ type: 'increment2' });
  },
  *decrement(context, { put }) {
    yield put({ type: 'decrement2' });
  },
  *incrementIfOdd(context, { put }) {
    if ((state.count + 1) % 2 === 0) {
      yield put({ type: 'increment2' });
    }
  },
  *incrementAsync(context, { put, call }) {
    yield call(sleep, 1000);
    yield put({ type: 'increment2' });
  }
}

export default {
  namespace: 'counter',
  state,
  reducers,
  effects
};
