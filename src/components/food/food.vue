<template>

  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" :alt="food.name">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="food-main">
          <h2 class="food-name">
            {{food.name}}
          </h2>
          <div class="food-sell-amount">
            <span>月售{{food.sellCount}}份</span><span class="food-sell-rating">好评率{{food.rating}}%</span>
          </div>
          <div class="food-price">
            <span class="now">¥{{food.price}}</span><span v-if="food.oldPrice" class="old">{{food.oldPrice}}</span>
          </div>
          <div class="food-cart-wrap">
            <a  class="food-btn" v-show="!hasAmount" href="javascript:;" @click="addCount">加入购物车</a>
            <cartcontrol v-show="hasAmount"></cartcontrol>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
export default{
  components: {
    cartcontrol
  },
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      console.log(this.food)
    },
    hide() {
      this.showFlag = false
    },
    addCount() {
      this.food.count++
    }

  },
  created() {
    console.log(this.food)
  },
  computed: {
    hasAmount() {
      return this.food.count > 0
    } 

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.food
  position fixed
  left 0
  top 0
  bottom 48px
  z-index 2
  width 100%
  background-color: #fff
  // transform translate3d(10%,0,0)
  &.move-enter-active,&.move-leave-active
    transition all 0.2s linear
    transform translate3d(0,0,0)
  &.move-leave-active
    transform translate3d(100%,0,0)
  &.move-enter,&.move-leave
    transform translate3d(100%,0,0)
  .image-header
    position relative
    width 100%
    height 0
    // 根据width
    padding-top 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .back
      position absolute
      top 10px
      left 0
      .icon-arrow_lift
        display block
        padding 10px
        font-size 20px
        color #fff
  .food-main
    position relative
    padding 18px
    .food-name
      line-height 1
      font-size 14px
      font-weight 700
      color rgb(7, 17, 27)
    .food-sell-amount
      margin-top 8px
      line-height 1
      font-size 10px
      color rgb(147, 153, 159)
      .food-sell-rating
        padding-left 12px
    .food-price
      margin-top 18px
      .now
        line-height 24px
        font-size 14px
        font-weight 700
        color rgb(240,20,20)
      .old
        padding-left 10px
        font-size 10px
        font-weight 700
        color rgb(147, 153, 159)
        line-height 24px
    .food-cart-wrap
      position absolute
      right 18px
      bottom 18px
      .food-btn
        display inline-block
        width 74px
        height 24px
        line-height 24px
        border-radius 12px
        text-align center
        background-color rgb(0, 160, 220)
        font-size 10px
        color rgb(255,255,255)
        
</style>