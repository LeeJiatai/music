<template>
    <div class="singer" ref="singer">
        <listview @select="selectSinger" :data="singers" ref="list"></listview>
        <router-view></router-view>
    </div>
</template>

<script>
    import Listview from 'base/listview/listview'
    import { getSingerList } from 'api/singer'
    import { ERR_OK } from 'api/config'
    import Singer from 'common/js/singer'
    import { playlistmixin } from 'common/js/mixin'
    import { mapMutations } from 'vuex'

    const HOT_NAME = '热门'
    const HOT_SINGER_LEN = 10

    export default {
        mixins: [playlistmixin],
        data() {
            return {
                singers: []
            }
        }, 
        created() {
            this._getSingerList()
        },
        methods: {
            handlePlayList(playlist) {
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.singer.style.bottom = bottom
                this.$refs.list.refresh()
            },
            _getSingerList() {
                getSingerList().then((res) => {
                    if(res.code == ERR_OK) {
                        this.singers = this._normalizeSinger(res.data.list)
                    }
                })
            },
            _normalizeSinger(list) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                }
                list.forEach((item, index) => {
                    if(index < HOT_SINGER_LEN) {
                        map.hot.items.push(new Singer({
                            name: item.Fsinger_name,
                            id: item.Fsinger_mid
                        }))
                    }
                    const key = item.Findex
                    if( !map[key] ) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new Singer({
                        name: item.Fsinger_name,
                        id: item.Fsinger_mid
                    }))
                });
                //获取有序数组
                let ret = [];
                let hot = [];
                for (let key in map) {
                    let val = map[key]
                    if(val.title.match(/[a-zA-Z]/)) {
                        ret.push(val)
                    } else if(val.title === HOT_NAME) {
                        hot.push(val)
                    }
                }
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                return hot.concat(ret);
            },
            selectSinger(singer) {
                this.$router.push({
                    path: `/singer/${singer.id}`
                });
                this.setSinger(singer)
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        components: {
            Listview
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer 
        position: fixed
        top: 88px
        width: 100%
        bottom: 0
</style>
