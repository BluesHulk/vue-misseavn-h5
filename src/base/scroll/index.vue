<template>
   <div ref="wrapper" class="scroll-wrap">  
    <div>  
        <slot></slot>  
    </div>  
  </div>  
   
</template>
<script>
    import BScroll from 'better-scroll'  
export default {  
  props:{  
    probeType:{  
      type:Number,  
      default:1  
    },  
    /**  
     * 点击列表是否派发click事件  
     */  
    click:{  
      type:Boolean,  
      default:true  
    },  
    /**  
     * 是否开启横向滚动  
     */  
    scrollX:{  
      type:Boolean,  
      default:true  
    },  
    /**  
     * 是否派发滚动事件  
     */  
    listenScroll:{  
      type:Boolean,  
      default:false  
    },  
    /**  
     * 列表数据  
     */  
    data:{  
      type:[Object,Array,String],  
      default:null  
    },  
    /**  
     * 是否派发滚动到底部的事件，用于上拉加载  
     */  
    pullup:{  
      type:Boolean,  
      default:false  
    },  
    /**  
     * 是否派发顶部下拉的事件，用于下拉刷新  
     */  
    pulldown:{  
      type:Boolean,  
      default:false  
    },  
    /**  
     * 是否派发列表滚动开始的事件  
     */  
    deforeScroll:{  
      type:Boolean,  
      default:false  
    },  
    /**  
     * 当数据更新后,刷新scroll延时  
     */  
    refreshDelay:{  
      type:Number,  
      default:20  
    },
    scrollbar:{
      type:Boolean,  
      default:false  
    }  
  },  
  data(){  
    return{  
      dragTip:{  
        text:"下拉刷新",  
        translate:-50,  
        showLoding:false  
      },  
      isLoading: false,  
      isDone: false,  
    }  
  },  
  mounted(){  
    setTimeout(() => {  
      this._initScroll()  
    },20)  
  },  
  methods:{  
    _initScroll(){  
      if(!this.$refs.wrapper){  
        return  
      }  
      // better-scroll的初始化  
      this.scroll = new BScroll(this.$refs.wrapper,{  
        probeType:this.probeType,  
        click:this.click,  
        scrollX:this.scrollX,
        scrollbar:this.scrollbar  
      })  
      // 是否派发滚动事件  
      if(this.listenScroll){  
        let me = this  
        this.scroll.on('scroll',(pos) => {  
          if(this.listenScroll){  
            me.$emit('scroll',pos)  
          }  
        })  
      }  
    
      // 是否派发列表滚动开始的事件  
      if(this.beforeScroll){  
        this.scroll.on('beforeScrollStart',() => {  
          this.$emit('beforeScroll')  
        })  
      }  
    },  
    disable(){  
      this.scroll && this.scroll.disable()    
    },  
    enable(){  
      this.scroll && this.scroll.enable()  
    },  
    refresh(){  
      this.scroll && this.scroll.refresh()  
    },  
    scrollTo(){  
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)  
    }, 
     
    scrollToElement() {  
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)   
    }  
  },  
  watch:{  
    data(){  
      setTimeout(() => {  
        this.refresh()  
        
      },this.refreshDelay)  
    }  
  }  
}  
</script>
<style  lang="scss" rel="stylesheet/scss" scoped >
 .scroll-wrap{
    height:100%;  
    overflow:hidden; 
    /* 下拉刷新 */  
    .pulldown,.pullup{
        width:100%;  
        height:0.5rem;
        position:relative;
         div.clear{
            font-size:.14rem;  
            position:absolute;
            left:50%;
            top:5px;
            transform:translate(-50%,0);
        }
        .list-donetip {
        text-align:center;  
        line-height:0.5rem ; 
        font-size:.14rem ; 
      }   
    }  
    
 }  
    

      
   
</style>