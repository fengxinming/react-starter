import { eachModule } from './utils/module-util';

const modules = {};
eachModule(require.context('./store', false, /^\.\/.+\.js$/), (model, key) => {
  modules[key.replace(/^\.\/(.+)\.js$/, '$1') + 'Store'] = model;
});

export default modules;
