import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Icon } from 'antd';
import { currency } from '../currency';

@inject('products', 'cart')
@observer
class ProductList extends Component {
  componentDidMount() {
    this.props.products.getAllProducts();
  }

  render() {
    const { addProductToCart } = this.props.cart;

    return (
      <ul>
        {
          this.props.products.all.map(product => (
            <li key={product.id} style={{ lineHeight: '40px' }}>
              <label style={{ display: 'inline-block', width: '300px' }}>{product.title} - {currency(product.price)}</label>
              <Button
                type="primary"
                disabled={!product.inventory}
                onClick={() => addProductToCart(product)}>
                <Icon type="shopping-cart" />
                Add to cart
              </Button>
            </li>
          ))
        }
      </ul>
    );
  }
}

export default ProductList;
