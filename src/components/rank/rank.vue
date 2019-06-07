<template>
    <div class="rank">
        <button v-on:click="show = !show">
            Toggle
        </button>
        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: true
            }
        },

        methods: {
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .rank   
        height: 200px;
        color: #ffffff
        border: 1px solid blue
        p 
            color: #ffffff;
            font-size: 40px
       .fade-enter-active, .fade-leave-active
            transition: opacity .5s;
        .fade-enter, .fade-leave-to
            opacity: 0;
        button 
            color red
            border: 1px solid #ffffff
</style>
