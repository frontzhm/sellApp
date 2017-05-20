<template>
	<div class="title">
	  <!-- 这里用block元素 不然有兼容问题 -->
	  <div class="line"></div>
	  <div class="text">综合评价</div>
	  <div class="line"></div>
	</div>
</template>

<script type="text/ecmascipt-6">
	export default {

	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.title
	  display flex
	  align-items center
	  margin 28px 9.6% 0
	  // margin 30px auto 24px auto
	  .line
	    flex 1
	    height 1px
	    background-color: rgba(255, 255, 255, 0.2)
	    // position relative
	    // top -6px
	    // border-bottom 1px solid rgba(255,255,255,0.2)
	  .text
	    padding-left 12px
	    padding-right 12px
	    font-size 14px
	    font-weight 700
</style>