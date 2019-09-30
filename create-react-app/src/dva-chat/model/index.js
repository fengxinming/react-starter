export { default as reducers } from './reducers';
export { default as effects } from './effects';

export const namespace = 'chat';
export const state = {
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
