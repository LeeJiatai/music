<template>
    <scroll class="listview">
        <ul>
            <li v-for="group in data" class="list-group" >
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </scroll>
</template>

<script>
    import Scroll from 'base/scroll/scroll' 

    export default {
        props: {
            data: Array,
            default: []
        },
        data() {
            return {

            }
        },
        created() {
            this.ff()
        },
        methods: {
            ff() {
                console.log(27, this.data)
            }
        },
        components: {
            Scroll
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'

    .listview 
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background-color: $color-background
        border: 1px solid red
        .list-group
            padding-bottom: 30px;
            border: 1px solid green 
            .list-group-title
                height: 30px
                width: 100%
                line-height: 30px
                padding: 0 20px
                font-size: $font-size-small
                color: $color-text-l
                background-color: $color-highlight-background
            .list-group-item
                display: flex 
                align-items: center
                padding: 20px 0 0 30px
                .avatar 
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name 
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-small

</style>

