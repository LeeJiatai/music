<template>
    <transition name="slide">
        <div class="singer-detail">Hello</div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        created() {
            console.log(17, this.singer)
        }
    }
</script>

<style scoped lang="stylus" rel="styleshhet/stylus">
    @import '~common/stylus/variable'

    .slide-enter-active, .slide-leave-active 
        transition: all .5s
    .slide-enter, .slide-leave-to 
        transition: translated3d(100%, 0, 0)
    .singer-detail 
        position: fixed
        z-index: 100
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-color: $color-background
</style>

