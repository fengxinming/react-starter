import { action, observable } from 'mobx'
import shop from '../api/shop'

class Products {
  @observable all = []

  @action getAllProducts() {
    shop.getProducts().then(action((items) => {
      this.all = items
    }));
  }

  @action decrementProductInventory(id) {
    const product = this.all.find(prod => prod.id === id)
    product.inventory--
  }
}

export default Products
