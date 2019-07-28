<template>
    <scroll 
        class="suggest"
        ref="suggest" 
        :data='result'
        :pullup='pullup'
        :beforeScroll='beforeScroll'
        @beforeScroll='listScroll'
        @scrollToEnd='searchMore'
    >
        <ul class="suggest-list">
            <li class="suggest-item" @click="selectItem(item)" v-for="item in result"> 
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script>
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import NoResult from 'base/no-result/no-result'
    import { search } from "api/search"
    import { ERR_OK } from "api/config"
    import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
    import Singer from 'common/js/singer'
    import { mapMutations, mapActions } from 'vuex'


    const TYPE_SINGER = 'singer'
    const perpage = 20

 
    export default {
        props: {
            query: {
                type: String,
                default: ''
            },
            showSinger: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                page: 1,
                pullup: true,
                hasMore: true,
                beforeScroll: true,
                result: []
            }
        },
        created() {

        },
        methods: {
            //srcoll初始化
            refresh() {
                this.$refs.suggest.refresh()
            },
            search() {
                this.hasMore = true
                this.$refs.suggest.scrollTo(0, 0)
                search(this.query, this.page, this.showSinger, perpage).then(res => {
                    if( res.code === ERR_OK ) {
                        this._genResult(res.data).then((res) => {
                            this.result = res
                        })
                        console.log(62, res)
                        this._checkMore(res.data)
                    }
                })
            },
            //获取更多
            searchMore() {
                if(!this.hasMore) {
                    return
                }
                this.page++ 
                search(this.query, this.page, this.showSinger, perpage).then(res => {
                    if( res.code === ERR_OK ) {
                        this._genResult(res.data).then((res) => {
                            this.result = this.result.concat(res)
                        })
                        this._checkMore(res.data)
                        console.log(79, this.hasMore)
                    }
                })
            },
            //滚动开始，收起键盘
            listScroll() {
                this.$emit('listScroll');
            },
            getIconCls(item) {
                if(item.type === TYPE_SINGER) {
                    return 'icon-mine'
                } else {
                    return 'icon-music'
                }
            },
            getDisplayName(item) {
                if(item.type === TYPE_SINGER) {
                    return item.singername
                } else {
                    return `${item.name}-${item.singer}`
                }
            },
            selectItem(item) {
                console.log(103, item)
                if(item.type === TYPE_SINGER) {
                    const singer = new Singer({
                        id: item.singermid,
                        name: item.singername
                    })
                    this.$router.push({
                        path: `/search/${singer.id}`
                    })
                    this.setSinger(singer)
                } else {
                    this.insertSong(item)
                }
                this.$emit('select');
            },
            _checkMore(data) {
                const songs = data.song
                if(!songs.list.length || (songs.curnum + (songs.curpage - 1) * perpage) > songs.totalnum) {
                    this.hasMore = false
                }
            },
            _genResult(data) {
                let ret = []
                if(data.zhida && data.zhida.singerid && this.page === 1) {
                    ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                }
                return processSongsUrl(this._normalizeSongs(data.song.list)).then((songs) => {
                    ret = ret.concat(songs)
                    return ret
                })
            },
            _normalizeSongs (list) {
                let ret = []
                list.forEach((musicData) => {
                    if (isValidMusic(musicData)) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            }),
            ...mapActions([
                'insertSong'
            ])
        },
        watch: {
            query() {
                this.search()
            }
        },
        components: {
            Scroll,
            Loading,
            NoResult
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin'

    .suggest    
        height: 100%
        overflow: hidden
        .suggest-list   
            padding: 0 30px
            .suggest-item
                display: flex
                align-items: center
                padding-bottom: 20px
                .icon
                    flex: 0 0 30px
                    width: 30px
                    [class^="icon-"]
                        font-size: 14px
                        color: $color-text-d
                .name 
                    flex: 1
                    font-size: $font-size-medium
                    color: $color-text-d
                    overflow: hidden
                    .text 
                        no-wrap()
        .no-result-wrapper
            position: absolute 
            top: 50%
            width: 100%
            transform: translateX(-50%)
        .no-result-wrapper 
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
