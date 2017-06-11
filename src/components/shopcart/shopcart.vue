<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo">
						<i class="icon-shopping_cart"></i>
					</div>
				</div>
				<div class="price">89</div>
				<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right"></div>
		</div>
	</div>
</template>

<!-- <script type="text/ecmascipt-6"> -->
<script>
export default{
	props:{
		deliveryPrice:{
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:0
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
				.logo
					width 100%
					height 100%
					border-radius 100px
					background-color #2b343c
					text-align center
					.icon-shopping_cart
						line-height 44px
						font-size 24px
						color #80858a
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
				color rgba(255,255,255,.4)
				vertical-align top
				box-sizing border-box
			.desc
				display inline-block
				vertical-align top
				line-height 24px
				margin-left 12px
				margin-top 12px
				color rgba(255,255,255,.4)
				font-size 10px
		.content-right
			flex 0 0 105px
			width 105px
			background-color: #ddd
			
</style>