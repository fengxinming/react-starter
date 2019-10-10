import './index.styl';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';

@observer
class Counter extends Component {
  render() {
    const evenOrOdd = this.$store.count % 2 === 0 ? 'even' : 'odd';
    return (
      <div className="cmp-counter">
        Clicked: {this.$store.count} times, count is {evenOrOdd}.
        <br />
        <br />
        <Button type="primary" onClick={this.$store.increment} >+</Button>&nbsp;
        <Button type="primary" onClick={this.$store.decrement} >-</Button>&nbsp;
        <Button type="primary" onClick={this.$store.incrementIfOdd} >Increment if odd</Button>&nbsp;
        <Button type="primary" onClick={this.$store.incrementAsync} >Increment async</Button>&nbsp;
      </div >
    );
  }
}

export default Counter;
