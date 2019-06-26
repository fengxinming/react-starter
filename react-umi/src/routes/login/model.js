import sleep from 'celia/sleep';
import {
  UPDATE_STATE,
  UPDATE_FIELDS,
  SIGN_IN,
  SUCCESS
} from '~/constants/dispatch-types';

export default {
  namespace: 'login',
  state: {
    disabledUsername: true,
    disabledPassword: true,
    isLogging: false,
    passwordStatus: '',
    password: '',
    fields: {
      username: '',
      password: ''
    }
  },
  reducers: {
    [UPDATE_FIELDS](state, { payload }) {
      Object.assign(state.fields, payload);
      return { ...state };
    },
    [UPDATE_STATE](state, { payload }) {
      Object.assign(state, payload);
      return { ...state };
    },
    [SUCCESS](state) {
      let now = Date.now();
      const session = Math.random().toString(36).slice(2) + now.toString(36);
      now = new Date(now + 30 * 60 * 1000);
      document.cookie = `TMD_SESSIONID=${session};expires=${now.toUTCString()}`;

      state.isLogging = false;
      return state;
    }
  },
  effects: {
    *[SIGN_IN]({ payload }, { call, put }) {
      // 按钮上出现loading
      yield put({
        type: UPDATE_STATE,
        payload: { isLogging: true }
      });

      const { username, password } = payload;
      if (username === 'admin' && password === 'admin') {
        yield call(sleep, 2000);
        yield put({ type: SUCCESS });
        return { code: 200 };
      } else {
        yield put({ type: UPDATE_STATE, payload: { isLogging: false } });
        return Promise.reject({ code: 401, message: '用户名或者密码错误' });
      }
    }
  }
};
