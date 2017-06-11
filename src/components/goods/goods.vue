<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{current:currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">
						{{item.name}}
					</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img :src="food.icon" width="57" :alt="food.name">
							</div>
							<div class="content">
								<h2 class="name">
									{{food.name}}
								</h2>
								<p v-if="food.description" class="desc">
									{{food.description}}
								</p>
								<div class="extra">
								<!-- 懒得处理空格的时候就这样。。 -->
									<span>月售{{food.sellCount}}</span><span class="rating">好评率{{food.rating}}%</span> 
								</div>
								<div class="price">
									<span class="now">¥{{food.price}}</span><del class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</del> 
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 需要配送费 和起送费 -->
		<shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>

	</div>
</template>

<!-- <script type="text/ecmascipt-6"> -->
<script>
	import BScroll from 'better-scroll'
	import shopcart from 'components/shopcart/shopcart'
	const ERR_OK = 0 
	export default {
		// seller需要从app.vue router-view传进来
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0
			}
		},
		computed:{
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i]
					let height2 = this.listHeight[i + 1]
					// 最后一个是undefined
					if ((!height2) || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i
					}
				}
				return 0
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
			this.$http.get('./api/goods').then((response) => {
				response = response.body
				if (response.errno === ERR_OK) {
					this.goods = response.data
					console.log(this.goods)
					// 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。这里必须等数据渲染完毕之后才能initScroll
					this.$nextTick(() => {
						this._initScroll()
						this._calculateHeight()
					})
				}
			})
		},
		methods: {
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				})
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					// 希望滚动的时候实时告诉我们滚动的值
					probeType: 3
				})
				// 监听滚动事件
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},

			_calculateHeight() {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
				let height = 0
				this.listHeight.push(height)
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			},

			selectMenu(index, event) {
				// 直接用点击事件的话是不行的，因为better-scroll默认阻止了，所以需要在初始化的时候传入click,这里如果切换到网页端的时候发现点击事件执行两次，因为网页端的原生点击事件没有被阻止掉，手机端点击事件实际上是touchstart。于是电脑端就会执行两次
				// 解决方案是加一个event参数,如果是betterscroll派发的话有一个constructed属性,而电脑端原生的是没有这个属性的
				if (!('_constructed' in event)) {
					return
				}
				console.log(index)
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
				let el = foodList[index]
				this.foodsScroll.scrollToElement(el, 300)
			}

		},
		components:{
			shopcart
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin";
	.goods
		// 视口高度，多余的会隐藏
		position absolute
		top 174px
		bottom 46px	
		width 100%
		display flex
		overflow	hidden
		.menu-wrapper
			flex 0 0 80px
			// 兼容安卓的浏览器
			width 80px
			background-color #f3f5f7
			.menu-item
				display	table
				height 54px
				width 56px
				padding 0 12px
				line-height 14px
				&.current
					// 高亮状态 加粗 且盖住上面的border 自己也没有border
					position relative
					z-index 2
					margin-top -1px
					background-color #fff
					font-weight 700
					.text
						border-none()
				.text
					display table-cell
					width 56px
					vertical-align middle
					border-1px(rgba(7,17,27,0.1))
					text-align center
					font-size 12px
					.icon
						display inline-block
						width 12px
						height 12px
						margin-right 2px
						vertical-align top
						background-size: 12px 12px
						background-repeat: no-repeat
						// decrease,discount,guarantee,invoice,special
						&.decrease
							bg-image('decrease_3')
						&.discount
							bg-image('discount_3')
						&.guarantee
							bg-image('guarantee_3')
						&.invoice
							bg-image('invoice_3')
						&.special
							bg-image('special_3')
		.foods-wrapper
			flex 1
			.title
				padding-left 14px
				height 26px
				line-height 26px
				border-left 2px solid #d9dde1
				font-size 12px
				color rgb(142,153,159)
				background-color #f3f5f7
			.food-item
				display flex
				margin 18px
				padding-bottom 18px
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					border-none()
					margin-bottom 0
				.icon
					flex 0 0 57
				.content
					flex 1
					margin-left 10px
					.name
						margin-top 2px
						height 14px
						line-height 14px
						font-size 14px
						color rgb(7,17,27)
						font-weight 700
					.desc,.extra
						margin-top 8px
						font-size 10px
						color rgb(147,153,159)
					.desc
						line-height 12px
					.extra
						height 10px
						line-height 10px
						.rating
							margin-left 12px
					.price
						font-weight 700
						line-height 24px
						.now
							font-size 14px
							color rgb(240,20,20)
						.old
							margin-left 8px
							font-size 10px
							color rgb(147,153,159)
</style>