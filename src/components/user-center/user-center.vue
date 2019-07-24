<template>
    <transition name="slide">
        <div class="user-center">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="switches-wrapper">
                <switches :currentIndex='currentIndex' :switches='switches' @switch='switchItem'></switches>
            </div>
            <div class="play-btn" @click="random">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="list-wrapper" ref="listWrapper">
                <scroll ref="favoriteList" class="list-scroll" v-if="currentIndex === 0" :data="favoriteList">
                    <div class="list-inner">
                        <song-list :songs="favoriteList" @select="selectSong"></song-list>
                    </div>
                </scroll>
                <scroll ref="playList" class="list-scroll" v-if="currentIndex === 1" :data="playHistory">
                    <div class="list-inner">
                        <song-list :songs="playHistory" @select="selectSong"></song-list>
                    </div>
                </scroll>
            </div>
            <div class="no-result-wrapper">

            </div>
        </div>
    </transition>
</template>

<script>
    import Switches from 'base/switches/switches'
    import Scroll from 'base/scroll/scroll'
    import SongList from 'base/song-list/song-list'
    import Song from 'common/js/song'
    import { playlistmixin } from 'common/js/mixin'
    import { mapGetters, mapActions } from 'vuex'
 
    export default {
        mixins: [playlistmixin],
        data() {
            return {
                currentIndex: 0,
                switches: [
                    {
                        name: '我喜欢的'
                    },
                    {
                        name: '最近听的'
                    }
                ]
            }
        },
        computed: {
            ...mapGetters([
                'favoriteList',
                'playHistory'
            ])
        },
        methods: {
            switchItem(index) {
                this.currentIndex = index
            },
            selectSong(song) {
                this.insertSong(new Song(song))
            },
            handlePlayList(playList) {
                const bottom = playList.length > 0 ? '60px' : ''
                this.$refs.listWrapper.style.bottom = bottom
                this.$refs.favoriteList && this.$refs.favoriteList.refresh()
                this.$refs.playList && this.$refs.playList.refresh()
            },
            random() {
                let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
                if (list.length === 0) {
                    return
                }
                list = list.map((song) => {
                    return new Song(song)
                })
                this.randomPlay({
                    list
                })
            },
            back() {
                this.$router.back()
            },
            ...mapActions([
                'insertSong',
                'randomPlay'
            ])
        },
        components: {
            Switches,
            Scroll,
            SongList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .user-center
        position: fixed
        top: 0
        bottom: 0
        z-index: 100
        width: 100%
        background-color: $color-background
        &.slide-enter-active, &.slide-leave-active
            transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .back
            position: absolute
            top: 0
            left: 6px
            z-index: 50px
            .icon-back
                display: block
                padding: 10px
                color: $color-theme
                font-size: $font-size-large-x
        .switches-wrapper 
            margin: 10px 0 30px 0
        .play-btn 
            box-sizing: border-box
            width: 135px
            padding: 7px 0
            margin: 0 auto
            text-align: center
            color: $color-text-l
            font-size: 0
            border-radius: 100px
            border: 1px solid $color-text-l
            .icon-play
                display: inline-block
                vertical-align: middle
                margin-right: 6px
                font-size: $font-size-medium-x
            .text
                display: inline-block
                vertical-align: middle
                font-size: $font-size-small
        .list-wrapper
            position: absolute
            top: 110px
            bottom: 0
            width: 100%
            .list-scroll
                height: 100%
                overflow: hidden
                .list-inner
                    padding: 20px 30px
</style>    
