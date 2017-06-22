<template>

  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" :alt="food.name">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default{
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
  &.move-enter-active
    transition all 0.2s linear
    transform translate3d(0,0,0)
  &.move-enter,&.move-leave
    transform translate3d(100%,0,0)

</style>