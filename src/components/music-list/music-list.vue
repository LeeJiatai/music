<template>
   	<div class="music-list">
		<div class="back" @click="back">
			<i class="icon-back"></i>
		</div>
		<h1 class="title" v-html="title"></h1>
		<div class="bg-image" :style="bgStyle" ref="bgImage">
			<div class="paly-wrapper">
				<div class="play">
				<i class="icon-play"></i>
				<span class="text">随机播放全部</span>
				</div>
			</div>
			<div class="filter"></div>
		</div>
			<div class="bg-layer"></div>
		<scroll 
			:data="songs"
			:listenScroll="listenScroll" 
			:probe-type="probeType"
			@scroll="scroll"
			class="list" 
			ref="list"
		>
			<div class="song-list-wrapper">
				<song-list :songs="songs"></song-list>
			</div>
			<div class="loading-container" v-show="!songs.length">
				<loading></loading>
			</div>
		</scroll>
   </div>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import SongList from 'base/song-list/song-list'
	import Loading from 'base/loading/loading'
		
	const RESERVED_HEIGHT = 40

	export default {
		props: {
			bgImage: {
				type: String,
				default: ''
			},
			songs: {
				type: Array,
				default: []
			}, 
			title: {
				tyep: String,
				default: ''
			}
		},
		data() {
			return {
				scrollY: 0
			}
		},
		mounted() {
			this.imageHeight = this.$refs.bgImage.clientHeight
			this.$refs.list.$el.style.top = `${this.imageHeight}px`
		},
		created() {
			this.probeType = 3
			this.listenScroll = true
		},
		computed: {
			bgStyle() {
				return `background-image:url(${this.bgImage})`
			}
		},
		methods: {
			back() {
				this.$router.back()
			},
			scroll(pos) {
				console.log(79, pos)
				this.scrollY = pos.y   
			}
		},
		components: {
			Scroll, 
			SongList, 
			Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin'

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 150
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image 
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .paly-wrapper
        position: absolute 
        bottom: 20px
        z-index: 50
        width: 100%
        .play 
          width: 135px
          padding: 7px 0
          margin: 0 auto;
          text-align: center
          border-radius: 100px
          fonst-size: 0
          color: $color-theme
          border: 1px solid $color-theme
          .icon-play  
            display: inline-block  
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text 
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
        .filter 
          position: absolute  
          top: 0
          left: 0
          width: 100%
          height: 100%
          border: 1px solid red 
          background: rgba(7, 17, 27, 0.4)
    .bg-layer 
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      overflow: hidden
      background: $color-background
      border: 1px solid #ffffff
      .song-list-wrapper
        padding: 20px 30px
        border: 1px solid red
      .loading-container
        position: absolute 
        width: 100%
        top: 50%
        transform: translateY(-50%)

      
      



</style>

