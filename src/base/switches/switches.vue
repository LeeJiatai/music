<template>
    <ul class="swiches">
        <li class="switch-item" v-for="(item, index) in switches" :class="{'active': currentIndex === index}" :key="index" @click="switcheItem(index)">
            <span>{{item.name}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            switches: {
                type: Array,
                default() {
                    return []
                }
            },
            currentIndex: {
                type: Number,
                default: 0
            }
        },
        methods: {
            switcheItem(index) {
                this.$emit('switch', index);
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'

    .swiches
        display: flex
        align-items: center
        width: 240px
        margin: 0 auto
        border-radius: 5px
        border: 1px solid $color-highlight-background
        .switch-item 
            flex: 1
            padding: 8px 0
            text-align: center
            font-size: $font-size-medium
            color: $color-text-d
            &.active
                color: $color-text
                background-color: $color-highlight-background

</style>
