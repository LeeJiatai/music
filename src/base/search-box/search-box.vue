<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input ref="query" class="box" v-model="query" type="text" :placeholder="placeholder">
        <i v-show="query" @click="clear" class="icon-dismiss"></i>
    </div>
</template>

<script>
    import { debounce } from 'common/js/util'

    export default {
        props: {
            placeholder: {
                type: String,
                default: '搜索歌曲、歌手'
            }
        },
        data() {
            return {
                query: ''
            }
        },
        created() {
            //watch事件
            this.$watch('query', debounce((newQuery) => {
                this.$emit('query', newQuery)
            }, 200))
        },
        methods: {
            clear() {
                this.query = ''
            },
            setQuery(query) {
                this.query = query
            },
            blur() {
                this.$refs.query.blur()
            }
        }
    }
</script>

<style scoped lang='stylus' rel="stylesheet/stylus"> 
    @import '~common/stylus/variable'

    .search-box
        display: flex
        align-items: center
        width: 100%
        padding: 0 6px
        height: 40px
        background: $color-highlight-background 
        border-radius: 6px
        .icon-search
            font-size: 24px
            color: $color-background
        .box 
            flex: 1
            margin: 0 5px
            line-height 18px
            color: $color-text
            outline: none
            font-size: $font-size-medium
            background: $color-highlight-background 
            &::placeholder
                color: $color-text-d
        .icon-dismiss
            font-size: 16px
            color: $color-background
</style>
