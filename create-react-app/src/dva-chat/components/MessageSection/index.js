import React, { Component } from 'react';
import { connect } from 'dva';
import Message from '../Message';
import { getCurrentThread, getSortedMessages } from '../../getter';

class MessageSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      lastMessageId: ''
    };
  }

  sendMessage = (e) => {
    const text = e.target.value;
    const { thread, dispatch } = this.props;
    if (text.trim()) {
      this.setState({ text: '' });
      dispatch({
        type: 'chat/sendMessage',
        payload: {
          text,
          thread
        }
      });
    }
  }

  onChangeTextArea = (e) => {
    this.setState({ text: e.target.value });
  }

  onKeyUp = (e) => {
    switch (e.switch || e.keyCode) {
      case 13: // 回车
        this.sendMessage(e);
        break;
      default:
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const ul = this.refs.list;
      ul.scrollTop = ul.scrollHeight;
    }
  }

  render() {
    const { thread, threads, currentThreadID, messages } = this.props;
    const msgs = getSortedMessages(threads, currentThreadID, messages);

    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{thread.name}</h3>
        <ul className="message-list" ref="list">
          {
            msgs.map(message => (
              <Message
                key={message.id}
                message={message}>
              </Message>
            ))
          }
        </ul>
        <textarea
          className="message-composer"
          value={this.state.text}
          onChange={this.onChangeTextArea}
          onKeyUp={this.onKeyUp}></textarea>
      </div>
    );
  }
}

export default connect(state => ({
  threads: state.chat.threads,
  currentThreadID: state.chat.currentThreadID,
  messages: state.chat.messages,
  thread: getCurrentThread(state.chat.threads, state.chat.currentThreadID)
}))(MessageSection);
