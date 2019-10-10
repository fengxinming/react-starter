import React, { Component } from 'react';
import map from 'celia/map';
import Thread from '../Thread';
import { observer } from 'mobx-react';

@observer
class ThreadSection extends Component {

  render() {
    const { currentThread, unreadCount, threads } = this.$store;

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
                switchThread={this.$store.switchThread}>
              </Thread>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default ThreadSection;
