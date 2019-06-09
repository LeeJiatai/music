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
    import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
 
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
                        processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
                            this.songs = songs
                        })
                    }
                })
            },
            //格式化歌单数据
            _normalizeSongs(list) {
                let ret = [];
                list.forEach((item) => {
                    let { musicData } = item;
                    if(isValidMusic(musicData)) {
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
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>

