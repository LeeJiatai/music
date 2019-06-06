<template>
	<div class="player" v-show="playList.length > 0">
		<div class="normal-player" v-show="fullScreen">
			播放器
		</div>
		<div class="mini-player" v-show="!fullScreen"></div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		computed: {
			...mapGetters([
				'fullScreen',
				'playList'
			])
		},
		created() {
			console.log(21, this.fullScreen, this.playList)
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable'
	@import '~common/stylus/mixin'

	.player 
		border: 1px solid red
		.normal-player
			position: fixed
			left: 0
			right: 0
			top: 0
			bottom: 0
			z-index: 150
			background-color: $color-background
			border: 1px solid blue
</style>
