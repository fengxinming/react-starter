import { join } from 'path';
import { UmiRule } from 'chain-css-loader';

function resolve() {
  return join(__dirname, ...arguments);
}

// ref: https://umijs.org/config/
export default {
  hash: true,
  history: 'hash',
  alias: {
    '~': resolve('src')
  },
  urlLoaderExcludes: [
    /\.styl$/,
  ],
  cssModulesWithAffix: true,
  cssModulesExcludes: [
    resolve('src/pages/chat/chat.css')
  ],
  chainWebpack(config) {
    const rule = new UmiRule(config);
    rule.useStylus();
    return config;
  },
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'Umi Examples',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
