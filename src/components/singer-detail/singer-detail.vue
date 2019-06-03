<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import { mapGetters } from 'vuex'
    import { getSingerDetail } from 'api/singer'
    import { ERR_OK } from 'api/config'
    import { createSong } from 'common/js/song'
 
    export default {
        data() {
            return {
                songs: []
            }
        },
        computed: {
            ...mapGetters([
                'singer'
            ]),
            title() {
                return this.singer.name
            },
            bgImage() {
                return this.singer.avatar
            }
        },
        created() {
            this._getDetail()
        },
        methods: {
            _getDetail() {
                if(!this.singer.id) {
                    this.$router.push({
                        path: '/singer'
                    })
                    return
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if(res.code === ERR_OK) {
                        this.songs = this._normallizeSongs(res.data.list);
                    }
                })
            },
            //格式化歌单数据
            _normallizeSongs(list) {
                let ret = [];
                list.forEach((item) => {
                    let {musicData} = item;
                    if(musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData));
                    }
                });
                return ret
            }
        },
        components: {
            MusicList,
        }
    }
</script>

<style scoped lang="stylus" rel="styleshhet/stylus">
    @import '~common/stylus/variable'

    .slide-enter-active, .slide-leave-active 
        transition: all .5s
    .slide-enter, .slide-leave-to 
        transition: translated3d(100%, 0, 0)
</style>

