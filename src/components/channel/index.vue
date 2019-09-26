<template>
  <div id="detail">
    <div class="Wall channel-wall">
          <div class="wall-body">
            <span class="channel-title">{{name}}</span>
            <div class="channel-detail">
                <span class="channel-intro">{{sintro}}</span>
                <button class="channel-btn"></button>
            </div>
          </div>
          <div class="wall-warp" :style="{backgroundImage: 'url('+bigpic+')'}"></div>
    </div>
    <iItab :tabList="tabList"   @tab-click="tabClick" :commentCount="comment_count" :initSelect="tabIndex" ></iItab> 
    <iIScroll  :data="dynamic || comment || adminList" ref = "scroll" class="recommend-content">
        <iIdynamic v-if="tabIndex == 0" :dynamic="dynamic"></iIdynamic>
        <iIcomments v-if="tabIndex == 1" :comment="commentList"></iIcomments>
        <iIadmin v-if="tabIndex == 2" :adminList="adminList"></iIadmin>
    </iIScroll>
   </div>
</template>
<script>
  import { mapState } from 'vuex'; 
  import  iItab from 'base/tab/tab-sound.vue';
  import iIdynamic from './child/dynamic.vue';
  import iIcomments from './child/comments.vue';
  import iIadmin from './child/admin.vue';
  import constant from 'common/js/constant';
  import  iIScroll from 'base/scroll/index.vue';
   export default{
     data(){
        return {
           tabList:constant.channelMenu,
           id:"",
           tabIndex: 0,
           soundId:"",
           detailTab:[],
           comment_count:"",
           name:"",
           sintro:"",
           bigpic:"",
           dynamic:[],
           commentList:[],
           adminList:[],
           pnum:1,
           psize:10
        }
     },
     created(){
         const id = this.$route.params.id;
         this.getChannel(id);
         this.getchanneldetail(3,id);
         this.getCommitList(id,this.pnum,this.psize);
         this.getAdminList(id);
     },
     methods:{
       tabClick(tabIndex) {
        this.tabIndex = tabIndex;
         this.$nextTick(() => {
              this.$refs.scroll._initScroll()
              this.$refs.scroll.scrollTo(this.$refs.scroll,0)
         })
       },
       init(){
          if(this.$route.params.tabName == "sounds"){
            this.tabIndex = 0;
          }else if(this.$route.params.tabName == "comments"){
             this.tabIndex = 1;
          }else if(this.$route.params.tabName == "admin"){
              this.tabIndex = 2;
          }
       },
       getchanneldetail(type,id){
          var that = this ;
          this.$ajax("getchanneldetail",{
             order:type,
             channel_id:id
          }).then(function(res){
              that.dynamic = res.data.info.Datas
            //   console.log(res.data.info.Datas)
          })
       },
       getChannel(id){
          var that = this ;
          this.$ajax("getChannel",{
             channelid:id
          }).then(function(res){
              that.comment_count = res.data.info.channel.comment_count;
              that.name = res.data.info.channel.name;
              that.sintro = res.data.info.channel.sintro;
              that.bigpic =  res.data.info.channel.bigpic
          })
       },
       getAdminList(id){
          var that = this ;
          this.$ajax("getAdminList",{
             channel_id:id
          }).then(function(res){
              that.adminList = res.data.info
              console.log(res.data)
          })
       },
       formatParams(paramsObj) {
            // debugger
            var arr = [];
            for (var key in paramsObj) {
                if (paramsObj.hasOwnProperty(key)) {
                    var val = paramsObj[key];
                    arr.push(key + "=" + val);
                }
            }
            return arr.join("&")
       },
       getCommitList(id,pnum,psize){
          var that = this ;
          let params = this.formatParams({
                type:4,
                eId:id,
                p:pnum,
                pagesize:psize
          })
          this.$ajax("getcommentList",{},params).then(function(res){
              that.commentList = res.data.successVal.comment.Datas
          })
       }
     },
     components:{
       iItab,
       iIdynamic,
       iIadmin,
       iIcomments,
       iIScroll
     },
     mounted(){
       this.init();
     }
  }
</script>
<style lang="scss">
  #detail{
    display: block;
    min-height: -webkit-calc(100vh - 0.4rem);
    min-height: -moz-calc(100vh - 0.4rem);
    min-height: calc(100vh - 0.4rem);
    max-width: 100vw;
    .Wall {
        display: block;
        position: relative;
        left: 0;
        right: 0;
        top: 0;
        overflow: hidden;
       
        .wall-body {
            padding: 10px;
            overflow: hidden;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 1;
            display: block;
            position: absolute;
        }
        .wall-warp {
            left: -20px;
            right: -20px;
            top: -20px;
            bottom: -20px;
            z-index: 0;
            background-position: 50%;
            background-repeat: no-repeat;
            -moz-background-size: 100% 100%;
            -o-background-size: 100% 100%;
            background-size: 100% 100%;
            display: block;
            position: absolute;
        }
    }
    .recommend-content{
        width:100vw;
        height: -webkit-calc(100vh - 3.14rem);
        height: -moz-calc(100vh - 3.14rem);
        height: calc(100vh - 3.14rem);
    }
    .channel-wall {
        height: 2.3rem;
        color: #fff;
        .wall-body {
            background: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.5)),color-stop(transparent),to(rgba(0,0,0,.5)));
            background: -webkit-linear-gradient(top,rgba(0,0,0,.5),transparent,rgba(0,0,0,.5));
            background: -moz-linear-gradient(top,rgba(0,0,0,.5),transparent,rgba(0,0,0,.5));
            background: -o-linear-gradient(top,rgba(0,0,0,.5),transparent,rgba(0,0,0,.5));
            background: linear-gradient(180deg,rgba(0,0,0,.5),transparent,rgba(0,0,0,.5));
        }
        .channel-title {
            display: block;
            position: relative;
            width: 100%;
            text-align: center;
            font-size: 16px;
        }
        .channel-detail {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -moz-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -moz-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 10px;
            height: 28px;
            padding: 0 10px;
            .channel-intro {
                font-size: 12px;
            }
            .channel-btn {
                display: inline-block;
                position: relative;
                height: 24px;
                line-height: 22px;
                width: 60px;
                border: 1px solid #fff;
                -webkit-border-radius: 12px;
                -moz-border-radius: 12px;
                border-radius: 12px;
                background-color: rgba(0,0,0,.8);
                &:after {
                    content: "+ \5173\6CE8";
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    font-size: 11px;
                    color: #fff;
                }
            }
        }
    }
  }

</style>