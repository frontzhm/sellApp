<template>
	<div class="cartcontrol">
	<!-- 数量>0才显示 -->
		<transition name="move">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart">
			<!-- 内层平移加滚动 -->
			<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count"  v-show="food.count>0">{{this.food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart"></div>
	</div>
</template>

<script>
// <!-- <script type="text/ecmascipt-6"> -->
import Vue from 'vue'
export default{
	// 调用这个组件 传入food知道是哪件商品
	props:{
		food:{
			type:Object
		}
	},
	created() {
		console.log(this.food)
	},
	methods:{
		// 点击不生效 因为bscroll ,所以需要在goods那边的foodsScroll添加可以点击
		addCart(event) {
			if (!event._constructed) {
				return
			}
			this.food.count ? (this.food.count ++) : Vue.set(this.food, 'count', 1)
			// this.$dispatch('cart.add',event.target)
			this.$emit('addCart', event.target)
		},
		decreaseCart(event) {
			if (!event._constructed) {
				return
			}
			this.food.count > 0 && (this.food.count --)
		}
	}
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
	font-size 0
	.cart-decrease
		display inline-block
		padding 6px
		// transition all 0.4s linear 0
		&.move-enter-active,&.move-leave-active
			transition all 0.5s ease
			// transform translate3D(0,0,0)
			.inner
				transform rotate(180deg)
		&.move-enter,&.move-leave-active
			opacity 0
			transform translate3d(24px,0,0)
		// &.move-transition
			// opacity 1
			// transform translate3D(0,0,0)
			// 只有这个状态下的inner才会
			.inner
				display inline-block
				font-size 24px
				line-height 1
				color rgb(0,160,220)
				transition all 0.4s linear
				transform rotate(0)
		// &.move-enter,&.move-leave-active
		// &.move-enter,&.move-leave
			// opacity 0
			// transform translate3D(24px,0,0)
			// .inner
				// transform rotate(180deg)
	.cart-count
		display inline-block
		vertical-align top
		line-height 35px
		font-size 14px
	.cart-add
		display inline-block
		font-size 24px
		line-height 1
		padding 6px
		color rgb(0,160,220)
</style>