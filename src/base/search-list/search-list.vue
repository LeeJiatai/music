<template>
    <div class="search-list" v-show="searches.length">
        <ul>
            <li class="search-item" v-for="item in searches">
                <span class="text">{{item}}</span>
                <span class="icon">
                    <span class="icon-delete"></span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            searches: {
                type: Array,
                default: []
            }
        },
        created() {
            
        }
    }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin'

    .search-list
        .search-item
            display: flex
            align-items: center
            height: 40px
            overflow: hidden
            .text 
                flex: 1
                color: $color-text-l
            .icon
                extend-click()
                .icon-delete
                    font-size: $font-size-small
                    color: $color-text-d


</style>
