const { join } = require('path');
const { UmiRule } = require('chain-css-loader');

const resolve = (dir) => join(__dirname, '.', dir);

// ref: https://umijs.org/config/
export default {
  hash: true,
  alias: {
    '~': resolve('src')
  },
  urlLoaderExcludes: [
    /\.styl$/,
  ],
  chainWebpack(config) {
    const rule = new UmiRule(config, {
      modules: true
    });
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
      title: 'react-umi',
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
