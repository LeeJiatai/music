<template>
    <transition appear name='slider'>
        <music-list :title="title" :bgImage="bgImage" :songs='songs'></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import { getSongList } from 'api/recommend'
    import { ERR_OK } from 'api/config'
    import { mapGetters } from 'vuex'
    import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'

    export default {
        data() {
            return {
                songs: []
            }
        },
        computed: {
            title() {
                return this.disc.dissname
            },
            bgImage() {
                return this.disc.imgurl
            },
            ...mapGetters([
                'disc'
            ])
        },
        created() {
            console.log(21, this.disc)
            this._getSongList()
        },
        methods: {
            _getSongList() {
                if (!this.disc.dissid) {
                    this.$router.push('/recommend')
                        return
                }
                getSongList(this.disc.dissid).then((res) => {
                    console.log(42, res);
                    if (res.code === ERR_OK) {
                        processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
                            console.log(44, songs)
                            this.songs = songs
                        })
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((musicData) => {
                    if (isValidMusic(musicData)) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        },
        components: {
            MusicList
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slider-enter-active, .slider-leave-active 
        transition: all 0.3s
    .slider-enter, .slider-leave-to
        transform: translate3d(100%, 0, 0)
</style>
