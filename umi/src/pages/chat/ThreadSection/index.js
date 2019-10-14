import React, { Component } from 'react';
import { connect } from 'dva';
import map from 'celia/map';
import { getUnreadCount, getCurrentThread } from '~/commons/getter';
import Thread from '../Thread';

class ThreadSection extends Component {
  switchThread = (id) => {
    this.props.dispatch({
      type: 'chat/switchThread',
      payload: id
    })
  }

  render() {
    const { threads, currentThreadID } = this.props;
    const unreadCount = getUnreadCount(threads);
    const currentThread = getCurrentThread(threads, currentThreadID);

    return (
      <div className="thread-section">
        <div className="thread-count">
          <span style={{ display: unreadCount ? 'inline' : '' }}>
            未读消息窗口: {unreadCount}
          </span>
        </div>
        <ul className="thread-list">
          {
            map(threads, (thread) => (
              <Thread
                key={thread.id}
                thread={thread}
                active={thread.id === currentThread.id}
                switchThread={this.switchThread}>
              </Thread>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  threads: state.chat.threads,
  threadsChanged: state.chat.threadsChanged,
  currentThreadID: state.chat.currentThreadID
}))(ThreadSection);
