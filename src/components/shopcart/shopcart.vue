<template>
<div>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price"  :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
				<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop.prevent="pay">
				<div class="pay" :class="payClass">
					{{this.payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			<transition-group name="drop" tag="div" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
				<div class="ball" v-for="(ball,index) in balls" v-show="ball.show" key="index">
					<div class="inner inner-hook"></div>
				</div>
			</transition-group>
		</div>
		<!-- 展开 收起的动画 -->
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>¥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>	
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
	<transition name="fade">
		<div class="list-mask" v-show="listShow" @click="hideList">
			
		</div>
	</transition>
</div></template>

<!-- <script type="text/ecmascipt-6"> -->
<script>
import cartcontrol from 'components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default{
	// 购物车有很多状态
	// 基本都和selectFoods有关，
	// 		选商品
	// 				有没到起送价
	// 		没选商品
	props:{
		// 购物车选择的商品，由父组件传进来，由此也决定最终的价格
		selectFoods:{
			type:Array,
			default() {
				return [{
					price: 10,
					count: 2
				}]
			}

		},
		deliveryPrice:{
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:0
		}
	},
	data() {
		return {
			balls: [
				{
					show: false
				}, {
					show: false
				}
			],
			dropBalls: [

			],
			// 购物车是否展开
			fold:true
		}
	},
	computed:{
		totalPrice() {
			return this.selectFoods.reduce((prev, next) => {
				return prev + next.price * next.count
			}, 0)
		},
		// totalPrice() {
		// 	let total = 0
		// 	this.selectFoods.forEach((food) => {
		// 		total += food.price * food.count
		// 	})
		// 	return total
		// },
		totalCount() {
			return this.selectFoods.reduce((prev, next) => {
				return prev + next.count
			}, 0)
		},
		payDesc() {
			if (this.totalPrice === 0) {
				return `¥${this.minPrice}起送`
			}
			if (this.totalPrice < this.minPrice) {
				return `还差¥${this.minPrice - this.totalPrice}元起送`
			}
			return '去结算'
		},
		payClass() {
			return this.totalPrice < this.minPrice ? 'not-enough' : 'enough'
		},
		listShow() {
			if (this.totalCount === 0) {
				this.fold = true
				return false
			}
			let show = !this.fold
			if (show) {
				this.$nextTick(() => {
					if (this.scroll) {
						// 重新计算高度
						this.scroll.refresh()
						return
					}
					this.scroll = new BScroll(this.$refs.listContent, {
						click: true
					})
				})
			}
			return show
		}

	},
	methods: {
		drop(el) {
			console.log(el)
			for (let i = 0; i < this.balls.length; i++) {
				let ball = this.balls[i]
				if (!ball.show) {
					ball.show = true
					ball.el = el
					this.dropBalls.push(ball)
					return
				}
			}
		},
		beforeEnter(el) {
			// el就是小球
			let count = this.balls.length
			while (count--) {
				let ball = this.balls[count]
				if (ball.show) {
					//  Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
					let rect = ball.el.getBoundingClientRect()
					let x = rect.left - 32
					// innerHeight 浏览器高度
					let y = -(window.innerHeight - rect.top - 22)
					el.style.display = ''
					el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
					el.style.transform = `translate3d(0, ${y}px, 0)`
					let inner = el.getElementsByClassName('inner-hook')[0]
					inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
					inner.style.transform = `translate3d(${x}px, 0, 0)`
				}
			}
		},
		enter(el) {
			// 触发浏览器的重绘
			/* eslint-disable no-unused-vars */
			let rf = el.offsetHeight
			this.$nextTick(() => {
				el.style.display = ''
				el.style.webkitTransform = 'translate3d(0, 0, 0)'
				el.style.transform = 'translate3d(0, 0, 0)'
				let inner = el.getElementsByClassName('inner-hook')[0]
				inner.style.webkitTransform = 'translate3d(0, 0, 0)'
				inner.style.transform = 'translate3d(0, 0, 0)'
			})
		},
		afterEnter(el) {
			let ball = this.dropBalls.shift()
			if (ball) {
				ball.show = false
				el.style.display = 'none'
			}
		},
		toggleList() {
			this.totalCount > 0 && (this.fold = !this.fold)
		},
		empty() {
			this.selectFoods.forEach((food) => {
				food.count = 0
			})
		},
		hideList() {
			// 重新计算listShow
			this.fold = true
		},
		pay() {
			if (this.totalPrice < this.minPrice) {
				return
			}
			window.alert(`${this.totalPrice}`)
		}
	},
	components:{
		cartcontrol
	}

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.shopcart
	position fixed
	left 0
	bottom 0
	z-index 3
	width 100%
	height 48px
	.content
		display flex
		background-color #141d27
		// inline-block布局
		font-size 0
		color rgba(255,255,255,.4)
		.content-left
			flex 1
			.logo-wrapper
				display inline-block
				// 善用position relative
				position relative
				top -10px
				margin-left 12px
				padding 6px
				width 56px
				height 56px
				box-sizing border-box
				vertical-align top
				border-radius 100px
				background-color #141d27
				.num
					position absolute
					top 0
					right 0
					width 24px
					height 16px
					line-height 16px
					text-align center
					border-radius 16px
					font-size 9px
					font-weight 700
					color #fff
					background-color rgb(240,20,20)
					box-shadow 0 4px 8px rgba(0,0,0,.4)
				.logo
					width 100%
					height 100%
					border-radius 100px
					background-color #2b343c
					text-align center
					&.highlight
						background-color: rgb(0,160,220)
					.icon-shopping_cart
						line-height 44px
						font-size 24px
						color #80858a
						&.highlight
							color #fff
			.price
				display inline-block
				// 这里考虑到 | 
				line-height 24px
				margin-top 12px
				margin-left 12px
				padding-right 12px
				border-right :1px solid rgba(255,255,255,.1)
				font-size 16px
				font-weight 700
				// color rgba(255,255,255,.4)
				vertical-align top
				box-sizing border-box
				&.highlight
					color #fff
			.desc
				display inline-block
				vertical-align top
				line-height 24px
				margin-left 12px
				margin-top 12px
				// color rgba(255,255,255,.4)
				font-size 10px
		.content-right
			flex 0 0 105px
			width 105px
			.pay
				height 48px
				line-height 48px
				text-align center
				font-size 12px
				// color rgba(255,255,255,.4)
				font-weight 700
				&.not-enough
					background-color #2b333b
				&.enough
					background-color: #00b43c
					color #fff			
	.ball-container
		.ball
			position fixed
			left 32px
			bottom 22px
			z-index 55
			width 20px
			height 20px
			&.drop-enter-active
				transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
				.inner
					width 16px 
					height 16px
					border-radius 50px
					background-color rgb(0,160,220)
					transition all 0.4s linear
	.shopcart-list
		position absolute
		left 0
		// top 0
		z-index -1 
		// position fixed
		bottom 46px
		width 100%
		// max-height 305px
		&.fold-enter-active
			transition all .5s
			transform translate3d(0, 0, 0)
		&.fold-enter
			transform translate3d(0, 100%, 0)
		&.fold-leave-active
			transition all .5s
			transform translate3d(0, 100%, 0)
		.list-header
			height 40px
			line-height 40px
			padding 0 18px
			background-color #f3f6f7
			border-bottom 1px solid rgba(7,17,17,.1)
			.title
				float: left
				font-size 14px
				color rgb(7,17,27)
			.empty
				float: right
				font-size 12px
				color rgb(0,160,220)
		.list-content
			padding 0 18px
			max-height 217px
			overflow hidden
			background-color: #fff
			.food
				position relative
				padding 12px 0
				box-sizing border-box
				border-1px(rgba(7,17,17,.1))
				.name
					line-height 24px
					font-size 14px
					color rgb(7,17,27)
				.price
					position absolute
					right 90px
					bottom 12px
					line-height 24px
					font-size 14px
					font-weight 700
					color rgb(240,20,20)
				.cartcontrol-wrapper
					position absolute
					right 0
					bottom 6px
.list-mask
	position fixed
	top 0
	left 0
	width 100%
	height 100%
	z-index 1
	backdrop-filter blur(10px)
	background-color: rgba(7,17,27,.6)
	&.fade-enter-active,
		transition all ease 0.5s
		opacity 1	
		background-color: rgba(7,17,27,.6)
	&.fade-enter
		opacity 0
		// opacity 0
		background-color: rgba(7,17,27,0)		
	&.fade-leave-active
		transition all ease 0.5s
		opacity 0
	
</style>