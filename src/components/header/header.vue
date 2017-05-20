<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliverTime}}分钟送达
        </div>
        <!-- 因为最开始的seller是{}，ajax请求需要时间，这样supports[0]一开始就会报错，所以加if -->
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" @click="showDetail" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">
              {{seller.name}}
            </div>
            <div class="star-wrapper">
              <!-- 组件里 定义size是数字类型，所以这里用： -->
              <star :size="48" :score="seller.score"></star>
            </div>
            <line-title-line></line-title-line> 
            <!-- <div class="title">
              这里用block元素 不然有兼容问题
              <div class="line"></div>
              <div class="text">综合评价</div>
              <div class="line"></div>
            </div> -->
            <ul v-if="seller.supports" class="supports">
              <li v-for="(support,index) in seller.supports" class="support-item">
                <span class="icon" :class="classMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <line-title-line></line-title-line>
            <div class="bulletin">
              <p class="content">
                {{seller.bulletin}}
              </p>
            </div>

          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import star from 'components/star/star'
import lineTitleLine from 'components/line-title-line/line-title-line'
export default {
  name: 'header',
  // 父组件接受传递过来的值
  props: {
    seller: {
      type: 0
    }
  },
  data () {
    return {
      detailShow: false,
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  // 引入 并且注册
  components:{
    star,
    lineTitleLine
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"

.header
  position relative
  overflow hidden
  color: #fff
  background-color: rgba(7,17,27,0.5)
  .content-wrapper
    padding: 24px 12px 18px 24px
    font-size: 0
    position: relative
    .avatar
      display: inline-block
      img
        border-radius: 2px
    .content
      display: inline-block
      vertical-align: top
      margin-left: 16px
      font-size: 14px
      .title
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          vertical-align: top
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          color: #fff
          line-height: 18px
          font-weight: bold
      .description
        margin-bottom: 10px
        font-size: 12px
        line-height: 12px
      .support
        // 不同类型 定义不同图标 在css这边也就是对应不同类名
        font-size: 0
        .icon
          display: inline-block
          width: 12px
          height: 12px
          vertical-align: top
          background-size: 12px 12px
          background-repeat: no-repeat
          // decrease,discount,guarantee,invoice,special
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          margin-left: 4px
          line-height: 12px
          font-size: 10px
    .support-count
      position: absolute
      bottom: 14px
      right: 12px
      padding: 0 8px
      height: 24px
      line-height: 24px
      font-size: 0
      background-color: rgba(0, 0, 0, 0.2)
      border-radius: 14px
      .count
        font-size: 10px
      .icon-keyboard_arrow_right
        margin-left: 2px;
        display: inline-block
        vertical-align: top
        font-size: 10px
        // 对齐
        line-height: 24px
  .bulletin-wrapper
    position: relative
    height: 28px
    line-height: 28px
    padding-left: 12px
    padding-right: 22px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background-color: rgba(7,17,27,0.2)
    .bulletin-title
      display: inline-block
      vertical-align: top
      margin-top 8px
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
    .bulletin-text
      margin-right: 4px
      font-size: 10px
    .icon-keyboard_arrow_right
      position: absolute
      right 10px
      top 10px
      font-size 10px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter:blur(10px)   
  .detail
    position fixed
    top 0
    left 0
    z-index 100
    width 100%
    height 100%
    overflow auto
    background-color: rgba(1,17,27,0.8)
    // 只有ios可以实现这个属性 
    backdrop-filter blur(10px)
    &.fade-enter-active,&.fade-leave-active
      transition all 0.5s ease
    &.fade-enter,&.fade-leave-active
      opacity 0
    .detail-wrapper
      min-height: 100%
      width 100%
      .detail-main
        margin-top:64px
        padding-bottom 64px
        .name
          text-align center
          font-size 16px
          font-weight 700
      .star-wrapper
        margin-top 16px
        text-align center
      .supports
        width 74.4%
        margin 24px auto 0
        .support-item
          margin-bottom 12px
          font-size 0
          &:last-child
            margin-bottom 0
          .icon
            display inline-block
            vertical-align top
            width 16px
            height 16px
            background-size 16px 16px
            background-repeat no-repeat
            // decrease,discount,guarantee,invoice,special
            &.decrease
              bg-image('decrease_2')
            &.discount
              bg-image('discount_2')
            &.guarantee
              bg-image('guarantee_2')
            &.invoice
              bg-image('invoice_2')
            &.special
              bg-image('special_2')
          .text
            margin-left: 6px
            // 有时候设计稿可能不对，这里文字和图片高度一致
            line-height: 16px
            font-size: 12px
      .bulletin
        .content
          width 74.4%
          margin 24px auto 0
          line-height 2
          font-size 12px
               
    .detail-close
      position:relative
      width: 32px
      height: 32px
      margin: -64px auto
      clear: both
      font-size: 32px
      text-align: center
    
    
        
</style>
