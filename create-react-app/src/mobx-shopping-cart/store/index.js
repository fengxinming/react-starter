import Cart from './cart'
import Products from './products'

const products = new Products()
const cart = new Cart(products)

export default { cart, products }
