import {
  getAllMessages,
  createMessage
} from '../api/chat';

const namespace = 'chat';
const state = {
  currentThreadID: null,
  threads: {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  },
  threadsChanged: 0,
  messages: {
    /*
    id: {
      id,
      threadId,
      threadName,
      authorName,
      text,
      timestamp,
      isRead
    }
    */
  }
}

const effects = {
  * getAllMessages(context, { put, call }) {
    const messages = yield call(getAllMessages);
    yield put({ type: 'receiveAll', payload: messages });
  },

  * sendMessage({ payload }, { call, put }) {
    const message = yield call(createMessage, payload);
    yield put({
      type: 'receiveMessage',
      payload: message
    });
  }
};

function addMessage(state, message) {
  // 聊天窗口 ID
  const { threadID, id } = message;

  // 增加是否已阅读状态
  message.isRead = threadID === state.currentThreadID;

  // 找到对应的聊天窗口
  const thread = state.threads[threadID];

  // 推送消息到聊天窗口
  if (!thread.messages.some(_id => _id === id)) {
    thread.messages.push(id);
    thread.lastMessage = message;

    // 触发左侧当前窗口信息同步
    state.threads[threadID] = { ...thread };
  }

  // 添加到消息队列
  state.messages[id] = message;

  // // 触发当天对话框信息更新
  // state.threads = { ...state.threads };
  state.threadsChanged++;
}

function setCurrentThread(state, id) {
  state.currentThreadID = id;

  // 切换到当前窗口，最后一条消息已读
  state.threads[id].lastMessage.isRead = true;
}

function createThread(state, id, name) {
  state.threads[id] = {
    id,
    name,
    messages: [],
    lastMessage: null
  };
}


const reducers = {
  receiveAll(state, { payload: messages }) {
    let latestMessage;
    messages.forEach(message => {
      const { threadID, threadName } = message;

      // 如果窗口id不存在，就需要创建一个新窗口对象
      if (!state.threads[threadID]) {
        createThread(state, threadID, threadName);
      }

      // 标记最后一条消息
      if (!latestMessage || message.timestamp > latestMessage.timestamp) {
        latestMessage = message;
      }

      // 加入消息队列
      addMessage(state, message)
    })

    // 设置最后一条消息所在的窗口为当前窗口
    setCurrentThread(state, latestMessage.threadID)
    return state;
  },

  receiveMessage(state, { payload: message }) {
    addMessage(state, message)
    return state;
  },

  switchThread(state, { payload: id }) {
    setCurrentThread(state, id)
    return { ...state };
  }
}

export default {
  namespace,
  state,
  effects,
  reducers
}
