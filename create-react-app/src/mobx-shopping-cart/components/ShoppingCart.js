import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'antd';
import { currency } from '../currency';

@inject('products', 'cart')
@observer
class ShoppingCart extends Component {

  render() {
    const { checkoutStatus, cartTotalPrice, cartProducts, checkout } = this.props.cart;
    const len = cartProducts.length;

    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p style={{ display: !len ? 'block' : 'none' }}><i>Please add some products to cart.</i></p>
        <ul>
          {cartProducts.map(product => (
            <li key={product.id}>
              {product.title} - {currency(product.price)} x {product.quantity}
            </li>
          ))}
        </ul>
        <p>Total: {currency(cartTotalPrice)}</p>
        <p><Button type="primary" disabled={!len} onClick={() => checkout(cartProducts)}>Checkout</Button></p>
        <p style={{ display: checkoutStatus ? 'block' : 'none' }}>Checkout {checkoutStatus}.</p>
      </div>
    );
  }
}

export default ShoppingCart;
