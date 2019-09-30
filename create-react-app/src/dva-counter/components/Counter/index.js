import './index.styl';
import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

class Counter extends Component {
  increment = () => {
    this.props.dispatch({ type: 'counter/increment' });
  }

  decrement = () => {
    this.props.dispatch({ type: 'counter/decrement' });
  }

  incrementIfOdd = () => {
    this.props.dispatch({ type: 'counter/incrementIfOdd' });
  }

  incrementAsync = () => {
    this.props.dispatch({ type: 'counter/incrementAsync' });
  }

  render() {
    const evenOrOdd = this.props.count % 2 === 0 ? 'even' : 'odd';
    return (
      <div className="cmp-counter">
        Clicked: {this.props.count} times, count is {evenOrOdd}.
        <br />
        <br />
        <Button type="primary" onClick={this.increment} >+</Button>&nbsp;
        <Button type="primary" onClick={this.decrement} >-</Button>&nbsp;
        <Button type="primary" onClick={this.incrementIfOdd} >Increment if odd</Button>&nbsp;
        <Button type="primary" onClick={this.incrementAsync} >Increment async</Button>&nbsp;
      </div >
    );
  }
}

export default connect((state) => ({ count: state.counter.count }))(Counter);
