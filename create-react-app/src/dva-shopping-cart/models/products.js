import shop from '../api/shop'

// initial state
const state = {
  all: [],
  allChanged: 0
}

// actions
const effects = {
  *getAllProducts(context, { call, put }) {
    const products = yield call(shop.getProducts);
    yield put({ type: 'setProducts', payload: products });
  }
}

// mutations
const reducers = {
  setProducts(state, { payload }) {
    state.all = payload;
    return state;
  },

  decrementProductInventory(state, { payload: { id } }) {
    const product = state.all.find(product => product.id === id);
    product.inventory--;
    if (!product.inventory) {
      // state.all = state.all.slice(0);
      state.allChanged++;
    }
    return state;
  }
}

export default {
  namespace: 'products',
  state,
  effects,
  reducers
}
