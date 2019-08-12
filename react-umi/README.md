# react-redux
> 基于 [create umi](https://www.npmjs.com/package/create-umi) 构建的 react+umi demo

---

## 快速生成React项目

有三种方式
* npx (npm 5.2+)
```
  npx create-umi my-app
```
* npm (npm 6+)
```
  npm create umi my-app
```
* yarn (yarn 0.25+)
```
  yarn create umi my-app
```

---

## 自定义目录结构

```
--
|- assets 图片等资源文件
|- components 组件
|- constants 常量
|- layouts 定义套在路由外的布局组件
|- routes 路由对应的页面，通过 `PAGES_PATH` 重新指定 pages 目录
|- models 自定义state、reducer和effects
```

暂时实现了一个登录demo，启动开发服务
```
npm run dev
```

## 注意事项
* `PAGES_PATH` 可替换 pages 目录
* 喜欢使用 stylus 的小伙伴可查看 demo 中的配置，非常简单
* 局部注册model时，只需要在 routes 目录对应的组件文件夹里面创建 model.js 即可
