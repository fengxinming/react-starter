import forOwn from 'celia/forOwn';

/**
 * 解析配置参数得到models
 * @param {Object} initialState 初始state
 * @param {Object} globalModels 全局models
 */
function ParseModel(initialState, globalModels) {
  return function parseModel(model, namespace) {
    // 是否对 type 增加前缀
    const keyPrefix = model.namespaced ? `${namespace}/` : '';

    // 解析 mutations
    forOwn(model.mutations, (mutation, key) => {
      globalModels[`${keyPrefix}${key}`] = {
        namespace,
        mutation
      };
    });

    // 解析 actions
    forOwn(model.actions, (action, key) => {
      key = `${keyPrefix}${key}`;
      const model = globalModels[key];
      if (model) {
        model.action = action
      } else {
        globalModels[key] = {
          namespace,
          action
        };
      }
    });

    if (namespace) {
      initialState[namespace] = model.state || {};
    } else {
      forOwn(model.state, (val, key) => {
        initialState[key] = val;
      });
    }
  }
};

/**
 * 解析配置模块
 * @param {Object} options 基础配置
 * @param {Object} initialState 初始state
 */
export default function parseModels(options, initialState) {
  const globalModels = {};
  const parseModel = ParseModel(initialState, globalModels);
  // 解析根部mutation
  parseModel(options, '');

  const { modules } = options;
  if (modules) {
    forOwn(modules, parseModel);
  }
  return globalModels;
}
