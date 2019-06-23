function warn(message) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message);
  }
}

/**
 * 生成中间件
 * @param {Object} globalModels 全局models
 */
export default function Middleware(globalModels) {
  return function middleware({ dispatch, getState }) {
    return function (next) {
      return function (type, payload, async) {
        // 入参兼容
        switch (typeof type) {
          case 'string':
            type = { type, payload, async: !!async };
            break;
          case 'object':
            if (arguments.length > 1) {
              warn('Only one argument can be set when argument is the type of object');
            }
            break;
          default:
            throw new TypeError(`confused arguments ${arguments}`);
        }

        // 触发异步方法
        if (type.async) {
          const model = globalModels[type.type];
          if (!model) {
            throw new TypeError(`unknown action ${type.type}`);
          }
          return Promise.resolve(model.action({ dispatch, getState }, type.payload));
        }

        // next 为 createStore 里面的 dispatch 方法
        return next(type);
      };
    };
  };
};
