import {
  getAllMessages,
  createMessage
} from '../api';

export default {
  *getAllMessages(context, { put, call }) {
    const messages = yield call(getAllMessages);
    yield put({ type: 'receiveAll', payload: messages });
  },

  *sendMessage({ payload }, { call, put }) {
    const message = yield call(createMessage, payload);
    yield put({
      type: 'receiveMessage',
      payload: message
    });
  }
};
