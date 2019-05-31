<template>
    <scroll 
        class="listview" 
        ref="listview"
        @scroll="scroll"
        :listen-scroll="listenScroll"
        :probeType="probeType"
    >
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item, index) in shortcutList" :data-index="index" class="item" :class="{'current': currentIndex === index}">
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>

<script>
    import Scroll from 'base/scroll/scroll' 
    import { getData } from 'common/js/dom'
    const TITLE_HEIGHT = 30 //标签高度
    const ANCHOR_HEIGHT = 18 //侧边栏单个标签高度

    export default {
        props: {
            data: Array,
            default: []
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        created() {
            this.touch = {};
            this.listenScroll = true //监听滚动
            this.probeType = 3  //限制截流
        },
        computed: {
            shortcutList() {
                return this.data.map((group) => {
                    return group.title.substr(0, 1)
                })
            }
        },
        methods: {
            onShortcutTouchStart(e) {
                let anchorIndex = getData(e.target, 'index');
                let firstTouch = e.touches[0];
                this.touch.y1 = firstTouch.pageY;
                this.touch.anchorIndex = anchorIndex;
                this._ScrollTo(anchorIndex);
            },
            onShortcutTouchMove(e) {
                let firstTouch = e.touches[0];
                this.touch.y2 = firstTouch.pageY;
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
                this._ScrollTo(anchorIndex);
                
            },
            _ScrollTo(index) {
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
            },
            scroll(pos) {
                console.log(74, pos)
                this.scrollY = pos.y
            },
        },
        components: {
            Scroll
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'

    .listview 
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background-color: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                width: 100%
                line-height: 30px
                padding: 0 20px
                font-size: $font-size-small
                color: $color-text-l
                background-color: $color-highlight-background
            .list-group-item
                display: flex 
                align-items: center
                padding: 20px 0 0 30px
                .avatar 
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name 
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-small
        .list-shortcut
            position: absolute 
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background-color: $color-background-d
            font-family: Helvetica
            .item 
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme


</style>

