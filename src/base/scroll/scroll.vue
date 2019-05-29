<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            },
            listenScroll: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }

                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
                console.log(44, this.listenScroll)
                if(this.listenScroll) {
                    console.log(46)
                    let me = this;
                    this.scroll.on('scroll', (pos) => {
                        console.log(49)
                        me.$emit('scroll', pos);
                        console.log(51)
                    })
                }
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                   this.refresh();
                }, 20)
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

