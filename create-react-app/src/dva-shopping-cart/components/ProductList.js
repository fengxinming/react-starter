import React, { Component } from 'react';
import { currency } from '../currency';
import { connect } from 'dva';
import { Button, Icon } from 'antd';

class ProductList extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'products/getAllProducts' });
  }

  addProductToCart(product) {
    this.props.dispatch({
      type: 'cart/addProductToCart',
      payload: product
    })
  }

  render() {
    return (
      <ul>
        {
          this.props.products.map(product => (
            <li key={product.id} style={{ lineHeight: '40px' }}>
              <label style={{ display: 'inline-block', width: '300px' }}>{product.title} - {currency(product.price)}</label>
              <Button
                type="primary"
                disabled={!product.inventory}
                onClick={() => this.addProductToCart(product)}>
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

export default connect(state => ({
  products: state.products.all,
  productsChanged: state.products.allChanged
}))(ProductList);
