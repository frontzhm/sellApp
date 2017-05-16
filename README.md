# sellApp
vue构建一个外卖app

## 搭建环境
1. 先下载node
2. 安装 vue -cli
```
npm install -g vue-cli
```
3. 进入一个路径，初始化项目

```
vue init webpack sell
```
使用eslint（standard）其他基本是no
4.
``` 
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader)
## 项目的流程
初始化项目完成之后，开始真实项目的部署
1. 建立完整的目录结构，以及引入相应的图片和fonts，reset
2. mock数据（data.json）和相应的api（build/dev-server.js）
3. index.html加上viewport和reset