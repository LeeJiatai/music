<template>
    <div class="rank">
       <div class="toplist">
           <ul>
               <li class="item">
                   <div class="icon">
                       <img src="" alt="">
                   </div>
                   <ul class="songlist">
                       <li class="song"></li>
                   </ul>
               </li>
           </ul>
       </div>
    </div>
</template>

<script>
    import { getTopList } from 'api/rank'
    import { ERR_OK } from 'api/config'
 
    export default {
        data() {
            return {
                
            }
        },
        created() {
            this._getTopList();
        },

        methods: {
            _getTopList() {
                getTopList().then((res) => {
                    console.log(21, res);
                    if(res.code === ERR_OK) {

                    }
                })
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .rank
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        border: 1px solid blue
        .toplist
            width: 100%
            height: 100%
            overflow: hidden
            .item 
                display: flex
                height: 100px
                margin: 0 20px
                padding-top: 20px 
                box-sizing: content-box
                border: 1px solid #ffffff
                &:last-child
                    padding-bottom: 20px
                .icon 
                    flex: 0 0 100px
                    width: 100px
                    height: 100px
                    border: 1px solid red
                .songlist   
                    flex: 1
                    display: flex
                    padding: 0 20px
                    height: 100px
                    overflow: hidden
                    background-color: $color-highlight-background
                    flex-direction: column
                    justify-content: center
                    border: 1px solid red
                    .song 
                        no-wrap()
                        line-height: 26px
</style>
