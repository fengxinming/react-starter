import React, { PureComponent } from 'react';
import ProductList from './ProductList'
import ShoppingCart from './ShoppingCart'

class App extends PureComponent {
  render() {
    return (
      <div id="app">
        <h1>Shopping Cart Example</h1>
        <hr />
        <h2>Products</h2>
        <ProductList />
        <hr />
        <ShoppingCart />
      </div>
    );
  }
}

export default App;
