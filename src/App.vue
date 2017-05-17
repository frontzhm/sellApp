<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <!-- 点击相应的，加上了类名router-link-exact-active router-link-active -->
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <!-- vue1.0 <a v-link="{path:'/goods'}"></a> -->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    <div class="footer">
      i am footer
    </div>
  </div>
</template>

<script>
import header from './components/header/header'

export default {
  name: 'app',
  components: {
    'v-header': header
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .tab
      // vue引入了postcss,自动解决兼容问题
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      // 1px在iphone6上会变成2px
      // border 1px solid rgba(7,17,27,0.1)
      // 定义一个方法，这样复用代码
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        // 生成的时候router-view会变成a标签
        &>a
          // 增加热区，撑满区域
          display: block
          font-size: 14px
          color: rgb(77,85,93)
          // 将激活时的类名加一个别名active
          &.active
            color: rgb(240,20,20)
</style>
