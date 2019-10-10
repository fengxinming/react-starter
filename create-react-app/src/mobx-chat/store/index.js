import { observable, action, computed } from "mobx";
import {
  getAllMessages,
  createMessage
} from '../api';

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

class ChatStore {
  @observable currentThreadID = null
  @observable threads = {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  }
  @observable threadsChanged = 0
  @observable messages = {
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

  @computed get currentThread() {
    const { threads, currentThreadID } = this;
    return currentThreadID
      ? threads[currentThreadID]
      : {};
  }

  @computed get unreadCount() {
    const { threads } = this;
    return Object.keys(threads).reduce((count, id) => {
      return threads[id].lastMessage.isRead ? count : count + 1
    }, 0)
  }

  @computed get sortedMessages() {
    const { messages, currentThread } = this;
    let currentMessages = currentThread.messages;
    currentMessages = currentMessages
      ? currentMessages.map(id => messages[id])
      : [];
    return currentMessages.slice().sort((a, b) => a.timestamp - b.timestamp);
  }

  @action getAllMessages() {
    getAllMessages(action('receiveAll', (messages) => {
      let latestMessage;
      messages.forEach(message => {
        const { threadID, threadName } = message;

        // 如果窗口id不存在，就需要创建一个新窗口对象
        if (!this.threads[threadID]) {
          createThread(this, threadID, threadName);
        }

        // 标记最后一条消息
        if (!latestMessage || message.timestamp > latestMessage.timestamp) {
          latestMessage = message;
        }

        // 加入消息队列
        addMessage(this, message);
      });

      // 设置最后一条消息所在的窗口为当前窗口
      setCurrentThread(this, latestMessage.threadID);
    }));
  }

  @action sendMessage(msg) {
    createMessage(msg, action('receiveMessage', message => {
      addMessage(this, message)
    }))
  }

  @action.bound switchThread(id) {
    setCurrentThread(this, id)
  }
}

const store = new ChatStore();

// 默认获取所有消息
store.getAllMessages();

export default store;
