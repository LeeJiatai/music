<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle">
            <div class="play-wrapper">
                <div class="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter"></div>
        </div>
        <scroll class="list">
            <div class="song-list-wrapper">

            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from 'base/scroll/scroll'

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
                type: String,
                default: ''
            },
        },
        data() {
            return {

            }
        },
        created() {
            console.log(49, 'here');
        },
        computed: {
            bgStyle() {
                return `background-image: url(${this.bgImage})`
            }
        },
        methods: {
            back() {
                this.$router.back()
            }
        },
        components: {
            Scroll
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
            position: absolute 
            top: 0
            left: 6px
            z-index: 50
            .icon-back
                display: block
                padding: 10px
                color: $color-theme
                font-size: $font-size-large-x
        .title 
            position: absolute
            top: 0
            left: 10%
            z-index: 40
            width: 80%
            no-wrap()
            text-align: center
            line-height: 40px
            fon-size: $font-size-large
            color: $color-text
        .bg-image 
            position: relative
            width: 100%
            height: 0
            padding-top: 70%
            transform-origin: top
            background-size: cover
            .play-wrapper
                position: absolute 
                width: 100%
                bottom: 20px
                z-index: 50
                .play 
                    width: 135px
                    padding: 7px 0
                    margin: 0 auto 
                    text-align: center
                    color: $color-theme
                    border-radius: 100px
                    font-size: 0
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
                background: rgba(7, 17, 27, 0.4)
        .list
            .song-list-wrapper
                padding: 20px 30px
            .loading-container 
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>

