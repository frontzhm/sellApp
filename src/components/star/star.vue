<template>
<!-- starType是尺寸大小 -->
	<div class="star" :class="starType">
		<!--star-item是指一颗星星 总共五颗星  每颗星的状态由数组里面的值决定 -->
		<span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>

<!-- <script type="text/ecmascipt-6"> -->
<script>
	const LENGTH = 5
	// 常用技巧 可能改变的常量可以定义 这样后期改动的时候改这里即可
	const CLS_ON = 'on'
	const CLS_HALF = 'half'
	const CLS_OFF = 'off'

	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed:{
			starType() {
				return 'star-' + this.size
			},
			itemClasses() {
				let result = []
				// 很机智的方法，算有没有0.5以上的
				let score = Math.floor(this.score * 2) / 2
				let hasDecimal = score % 1 !== 0
				let integer = Math.floor(score)
				for (let i = 0; i < integer; i++) {
					result.push(CLS_ON)
				}
				if (hasDecimal) {
					result.push(CLS_HALF)
				}
				// 接下来 只要是长度小于5 都要加off
				while (result.length < LENGTH) {
					result.push(CLS_OFF)
				}
				return result
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.star
		font-size 0
		.star-item
			display inline-block
			background-repeat no-repeat
		&.star-48
			.star-item
				width 20px
				height 20px
				margin-right 22px
				background-size 20px 20px
				&:last-child
					margin-right 0 
				&.on
					bg-image('star48_on')
				&.half
					bg-image('star48_half')
				&.off
					bg-image('star48_off')
		&.star-36
			.star-item
				width 15px
				height 15px
				margin-right 6px
				background-size 15px 15px
				&:last-child
					margin-right 0 
				&.on
					bg-image('star36_on')
				&.half
					bg-image('star36_half')
				&.off
					bg-image('star36_off')
		&.star-24
			.star-item
				width 10px
				height 10px
				margin-right 3px
				background-size 10px 10px
				&:last-child
					margin-right 0 
				&.on
					bg-image('star24_on')
				&.half
					bg-image('star24_half')
				&.off
					bg-image('star24_off')
			
</style>