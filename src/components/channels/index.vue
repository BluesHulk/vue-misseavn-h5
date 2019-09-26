<template>
  <div id="channels">
           <div class="sub-header">频道</div>
           <iItab :tabList="tabList"  @tab-click="tabClick" :initSelect="tabIndex" ></iItab>
           <iIScroll :data="channelData" ref = "scroll" class="recommend-content"> 
              <iIall v-if="tabIndex == 0" :allData="channelData"></iIall>
              <iIsound v-if="tabIndex == 1" :soundData="channelData" ></iIsound>
              <iIring v-if="tabIndex == 2" :ringData="channelData"></iIring>
           </iIScroll>
   </div>
</template>
<script>
  import iItab from 'base/tab/tab-sound.vue';
  import iIall from './child/all.vue';
  import iIsound from './child/sound.vue';
  import iIring from './child/ring.vue';
  import constant from 'common/js/constant';
  import  iIScroll from 'base/scroll/index.vue';
  export default {
    data(){
       return {
          tabIndex: 0,
          tabList:constant.channelsTab,
          channelData:[]
       }
    },
    watch: {
      'tabIndex' (val) {
         if(this.val == 0){
            this.getChannelList(2)
          }else if(this.val == 1){
            this.getChannelList(0)
          }else if(this.val == 2){
            this.getChannelList(1)
          }
         
      }
    },
    methods:{
       tabClick(tabIndex) {
         this.tabIndex = tabIndex;
         if(this.tabIndex == 0){
           this.getChannelList(2)
          }else if(this.tabIndex == 1){
            this.getChannelList(0)
          }else if(this.tabIndex == 2){
           this.getChannelList(1)
          }
       },
       getChannelList(type){
          var that = this ;
          this.$ajax("channelsList",{
             type:type
          }).then(function(res){
              console.log(res)
              that.channelData = res.data.info ;
          })
       },
       init(){
          // this.tabIndex = this.$route.params.tabIndex - 0 || 0;
          if(this.$route.params.isIall == "all"){
            this.tabIndex = 0;
             this.getChannelList(2)
          }else if(this.$route.params.isIall == "Min"){
             this.tabIndex = 1
              this.getChannelList(0)
          }else if(this.$route.params.isIall == "ring"){
              this.tabIndex = 2
              this.getChannelList(1)
          }
       }
    },
    created(){
         
      
    },
     components:{
       iItab,
       iIall,
       iIsound,
       iIring,
       iIScroll
     },
     mounted(){
       this.init();
     }
 }
</script>
<style lang="scss">
   #channels{
      display:-webkit-flex;
      width: 100%;
      height: 100%;
      -webkit-flex-direction: column;
      flex-direction: column;
     .sub-header {
        display: block;
        line-height: 0.4rem;
        background-color: #fff;
        color: #000;
        text-align: center;
        font-size: 0.16rem;
        border-bottom: 1px solid #e0e0e0;
    }
    .recommend-content{
             width: 100%;
             height: 100%;
             -webkit-box-flex:1;
             overflow: hidden;
    }
   }
</style>