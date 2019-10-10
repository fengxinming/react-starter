import React, { Component } from 'react';
import Message from '../Message';
import { observer } from 'mobx-react';

@observer
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
    if (text.trim()) {
      const { currentThread } = this.$store;
      this.setState({ text: '', lastMessageId: currentThread.lastMessage.id });
      this.$store.sendMessage({
        text,
        thread: currentThread
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
    if (!this.state.text &&
      this.state.lastMessageId !== this.$store.currentThread.lastMessage.id) {
      const ul = this.refs.list;
      ul.scrollTop = ul.scrollHeight;
    }
  }

  render() {
    const { sortedMessages, currentThread } = this.$store;

    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{currentThread.name}</h3>
        <ul className="message-list" ref="list">
          {
            sortedMessages.map(message => (
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

export default MessageSection;
