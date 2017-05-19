// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 因为vue-router的package.json那边name是这个
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
// 在webpack中已经有了路径的别名配置，所以这里的components其实是定义好的路径而不单纯是components
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
// webpack的特性 可以在js里引入样式
import index from 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
/* 加入router之后改写 */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
})
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
app.$mount('#app')
// vue1.0 router.go('/goods')
// 默认去哪个页面
router.push('/goods')
// 现在，应用已经启动了！
