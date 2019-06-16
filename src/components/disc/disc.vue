<template>
    <transition appear name='slider'>
        <music-list :title="title" :bgImage="bgImage"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            MusicList
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
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slider-enter-active, .slider-leave-active 
        transition: all 0.3s
    .slider-enter, .slider-leave-to
        transform: translate3d(100%, 0, 0)
</style>
