import React, { Component } from 'react';
import { connect } from 'dva';
import { currency } from '~/commons/currency';
import { Button } from 'antd';

class ShoppingCart extends Component {
  checkout(products) {
    this.props.dispatch({ type: 'cart/checkout', payload: products });
  }

  render() {
    const { products, checkoutStatus, totalPrice } = this.props;
    const len = products.length;

    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p style={{ display: !len ? 'block' : 'none' }}><i>Please add some products to cart.</i></p>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.title} - {currency(product.price)} x {product.quantity}
            </li>
          ))}
        </ul>
        <p>Total: {currency(totalPrice)}</p>
        <p><Button type="primary" disabled={!len} onClick={() => this.checkout(products)}>Checkout</Button></p>
        <p style={{ display: checkoutStatus ? 'block' : 'none' }}>Checkout {checkoutStatus}.</p>
      </div>
    );
  }
}

export default connect(state => {
  const products = state.products.all;
  const { items } = state.cart;
  const cartProducts = items.map(({ id, quantity }) => {
    const product = products.find(product => product.id === id)
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity
    };
  });

  return {
    products: cartProducts,
    checkoutStatus: state.cart.checkoutStatus,
    totalPrice: cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  };
})(ShoppingCart);
