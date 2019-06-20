<template>
    <transition appear name='slider'>
        <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import { getMusicList } from 'api/rank'
    import { ERR_OK } from 'api/config'
    import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                songs: []
            }
        },  
        computed: {
            title() {
                return this.topList.topTitle
            },
            bgImage() {
                if(this.songs.length) {
                    return this.songs[0].image
                }
                return ''
            },
            ...mapGetters([
                'topList'
            ])
        },
        created() {
            console.log(21, this.topList);
            this._getMusicList()
        },
        methods: {
            _getMusicList(){
                if(!this.topList.id) {
                    this.$router.push({
                        path: '/rank'
                    })
                    return 
                }
                getMusicList(this.topList.id).then((res) => {
                    if(res.code === ERR_OK) {
                        processSongsUrl(this._normalizeSongs(res.songlist)).then((songs) => {
                            this.songs = songs
                        })
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    const musicData = item.data
                    if( isValidMusic(musicData)) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
    .slider-enter-active, .slider-leave-active
        transition: all 0.3s
    .slider-enter, .slider-leave-to
        transform: translate3d(100%, 0, 0)
</style>

