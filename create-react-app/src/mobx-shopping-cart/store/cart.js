import { action, computed, observable } from 'mobx'
import shop from '../api/shop'

class Cart {
  constructor(products) {
    this.products = products
  }

  @observable items = []
  @observable checkoutStatus = null

  @computed get cartProducts() {
    const { items } = this;
    const products = this.products.all;

    return items.map(({ id, quantity }) => {
      const product = products.find(product => product.id === id)
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity
      };
    })
  }

  @computed get cartTotalPrice() {
    return this.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }

  @action.bound checkout(products) {
    const savedCartItems = this.items
    this.checkoutStatus = null

    // empty cart
    this.items = [];

    shop.buyProducts(products).then(
      () => {
        this.checkoutStatus = 'successful'
      },
      () => {
        this.checkoutStatus = 'failed'

        // rollback to the cart saved before sending the request
        this.items = savedCartItems;
      }
    )
  }

  @action.bound addProductToCart(product) {
    this.checkoutStatus = null
    const prodId = product.id

    if (product.inventory > 0) {
      const cartItem = this.items.find(item => item.id === prodId)
      if (!cartItem) {
        this.items.push({
          id: product.id,
          quantity: 1
        })
      } else {
        cartItem.quantity++
      }

      // remove 1 item from stock
      this.products.decrementProductInventory(prodId);
    }
  }
}

export default Cart
