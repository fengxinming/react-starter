import React, { PureComponent } from 'react';
import { connect } from 'dva';
import ThreadSection from '../ThreadSection';
import MessageSection from '../MessageSection';

class App extends PureComponent {
  componentDidMount() {
    // 默认获取所有消息
    this.props.dispatch({ type: 'chat/getAllMessages' });
  }
  render() {
    return (
      <div className="chatapp">
        <ThreadSection />
        <MessageSection />
      </div>
    );
  }
}

export default connect()(App);
