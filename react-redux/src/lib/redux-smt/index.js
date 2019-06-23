import parseModels from './lib/parse-models';
import Reducer from './lib/reducer';
import Middleware from './lib/middleware';

export default function (options) {
  const initialState = {};

  // 重新组装模型
  const globalModels = parseModels(options, initialState);

  return {
    // 全局reducer处理
    reducer: Reducer(initialState, globalModels),
    state: initialState,
    // 异步action处理插件
    middleware: Middleware(globalModels)
  }
}

