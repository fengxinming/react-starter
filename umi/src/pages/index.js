import styles from './index.module.styl';
import React, { PureComponent } from 'react';
import Link from 'umi/link';

export default class extends PureComponent {
  render() {
    return (
      <div className={styles.list}>
        <h2>Umi Examples</h2>
        <ul>
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to="/shopping-cart">Shopping Cart</Link></li>
          <li><Link to="/todomvc">TodoMVC</Link></li>
          <li><Link to="/chat">FluxChat</Link></li>
        </ul>
      </div>
    );
  }
}
