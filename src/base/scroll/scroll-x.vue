<template>
   <div ref="wrapper">
     <slot>
      </slot>
   </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default{
        data() {
            return {

            }
        },
        props:{
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
                default: []
            },
            scrollX:{  
              type:Boolean,  
              default:true  
            },  
            listenScroll: {
                type: Boolean,
                default: false
            },
        },
        methods:{
             _initScroll() {
                if (!this.$refs.wrapper) {
                   return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                })

                if(this.listenScroll){
                     this.scroll.on('scroll', (pos) => {
                        this.$emit('scroll', pos)
                    })
                }

             },
             enable(){
                 this.scroll && this.scroll.enable();
             },
             disable(){
                 this.scroll && this.scroll.disable();
             },
             refresh(){
                 this.scroll && this.scroll.refresh();
             },
             scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
             },
             scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
             }
        },
        mounted(){
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        watch: {
            data() {
                setTimeout(() => {
                this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>
<style  lang="scss" rel="stylesheet/scss" scoped >
    
</style>