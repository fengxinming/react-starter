import shop from '../api/shop'

// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  itemsChanged: 0,
  checkoutStatus: null
}

// actions
const effects = {
  *checkout({ payload: { products } }, { put, call, select }) {
    let { items: savedCartItems, itemsChanged } = yield select(state => state.cart);
    yield put({
      type: 'setCheckoutStatus',
      payload: null
    })
    // empty cart
    yield put({
      type: 'setCartItems',
      payload: { items: [] }
    })
    try {
      yield call(shop.buyProducts, products);
      yield put({
        type: 'setCheckoutStatus',
        payload: 'successful'
      });
    } catch (e) {
      yield put({
        type: 'setCheckoutStatus',
        payload: 'failed'
      });
      yield put({
        type: 'setCartItems',
        payload: { items: savedCartItems, itemsChanged: itemsChanged++ }
      });
    }
  },

  *addProductToCart({ payload: product }, { put, call, select }) {
    yield put({
      type: 'setCheckoutStatus',
      payload: null
    })
    if (product.inventory > 0) {
      const { items } = yield select(state => state.cart);
      const cartItem = items.find(item => item.id === product.id);
      if (!cartItem) {
        yield put({ type: 'pushProductToCart', payload: { id: product.id } });
      } else {
        yield put({ type: 'incrementItemQuantity', payload: cartItem });
      }
      // remove 1 item from stock
      yield put({ type: 'products/decrementProductInventory', payload: { id: product.id } });
    }
  }
}

// mutations
const reducers = {
  pushProductToCart(state, { payload: { id } }) {
    state.items.push({
      id,
      quantity: 1
    })
    return state
  },

  incrementItemQuantity(state, { payload: { id } }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
    return state
  },

  setCartItems(state, { payload: { items, itemsChanged } }) {
    state.items = items
    state.itemsChanged = itemsChanged
    return state
  },

  setCheckoutStatus(state, { payload: status }) {
    state.checkoutStatus = status
    return state
  }
}

export default {
  namespace: 'cart',
  state,
  effects,
  reducers
}
