/**
 * 全局reducer，只处理同步请求
 * @param {Object} initialState 初始state
 * @param {Object} globalModels 全局models
 */
export default function Reducer(initialState, globalModels) {
  return function (prevState = initialState, action) {
    const { type, payload } = action;
    if (type && type.indexOf('@@redux') === 0) {
      return prevState;
    }

    const model = globalModels[type];
    if (!model) {
      throw new TypeError(`unknown mutation ${type}`);
    }

    const { namespace } = model;
    if (namespace) {
      let state = prevState[namespace];
      state = model.mutation(state, payload) || state;
      prevState[namespace] = state;
    } else {
      prevState = model.mutation(prevState, payload) || prevState;
    }
    // 一定要返回新对象才生效，坑爹
    return { ...prevState };
  };
}
