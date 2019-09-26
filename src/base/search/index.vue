<template>
    <div id="search">
         <div v-if="hashShow">
            <div class="search-header">热门搜索</div>
            <div class="search-content">
                <span class="search-tag" v-for="(item,index) in hotsearchList" @click="clickList(item)">
                    {{item.key}}
                </span>
            </div>
         </div>
         <div class="container" v-else>
              <iItab :tabList="tabList" @hashChange="watchHash()"></iItab>
              <iIScroll
                 class="initList" 
                 :data="resultList"
                 ref="pullrefresh"  
                :pullup="isShow"
                :probeType="probeType"  
                :pulldown="isShow"
                :scrollbar="scrollbar"  
                @pulldown="inrefresh()"  
                @scrollToEnd="infinite()"
               >
                    <div>
                        <div class="itemList sound" v-if="hash == 'sound' ">
                           <div class="SoundList">
                                <div v-for="item in resultList" class="Thumbnail list-sound large">
                                    <div class="cover">
                                        <img class="cover-img" :src="item.front_cover">
                                    </div>
                                    <a class="detail" :href="/sound/+item.id">
                                            <div class="title">{{item.soundstr}}</div>
                                            <div class="username">
                                            <!-- react-text: 419 -->UP主：<!-- /react-text --><!-- react-text: 420 -->{{item.username}}<!-- /react-text -->
                                            </div>
                                            <div class="statistics">
                                                <div class="item play-times">{{item.view_count}}</div>
                                                <div class="item duration">30:30</div>
                                            </div>
                                    </a>
                                </div>
                          </div>
                        </div>
                        <div  class="itemList album" v-if="hash == 'album' ">2</div>
                        <div  class="itemList user" v-if="hash == 'user' ">3</div>
                    </div>
              </iIScroll>
              
         </div>         
    </div>
</template>
<script>
  import {
    mapState
  } from 'vuex';
  import  iItab from 'base/tab/tab.vue';
  import  iIScroll from 'base/scroll/index.vue';
  import  constant from 'common/js/constant';

  export default{
      data(){
          return{
              hotsearchList:[],
              resultList:[],
              init:true,
              tabList:constant.searchTab,
              hash:"sound",
              pulldown: true,
              pullup:true,
              pageNum:1,
              isShow: true,
              kind:3,
              hashShow:true,
              scrollbar:true,
              probeType:3
          }
      },
      computed: {
        ...mapState([
            'searchState',
            'searchData'
        ])
      },
     watch: {
        '$route' (to, from) {
           
            console.log(to,from)
            if(to.query.t == "sound"){
                this.hash = "sound";
                 this.kind = 3;
            }
            if(to.query.t == "album"){
                this.hash = "album";
                 this.kind = 2;
            }
            if(to.query.t == "user"){
                this.hash = "user";
                 this.kind = 1;
            }
            if(to.query.s){
                this.requestFindList(to.query.s,1,this.kind);
            }
        },
        'hash':{
            immediate: true,
            handler: function (val, oldVal) {
                // console.log(val,oldVal)
            },
        
        }
     },
     created(){
        this.hotsearch();
        const txt = this.$route.query.s;
        const kind = this.$route.query.t;
        if(kind == "sound"){
            this.kind = 3;
        }else if(kind == "album"){
            this.kind = 2;
        }else if(kind == "user"){
            this.kind = 1;
        }
        if(txt){
             this.requestFindList(txt,1,this.kind);
        }
     },
     methods:{
        hotsearch(){
            const that = this ;
            this.$ajax('hotsearch').then(function(res){
                that.hotsearchList = res.data.info;
            })
        },
        infinite(){
          if(this.pageNum){
            this.pageNum++;
            const txt = this.$route.query.s;
            if(txt){
                this.requestFindList(txt,this.pageNum,this.kind);
                this.$refs.pullrefresh.$emit('infinitescroll.reInit'); 
                
            }
          }
          

        },
        inrefresh(){
           const txt = this.$route.query.s;
           this.pageNum = 1 ;
            if(txt){
                this.requestFindList(txt,this.pageNum,this.kind);
                this.$refs.pullrefresh.$emit('pullrefresh.finishLoad');  
            }

        },
        clickList(key) {
              this.init = false;
              this.$router.replace('/search?s='+key.key+'&t=sound');
               this.hashShow = !this.$route.query.t
              if(key.key !=  this.$route.query.s){
                  this.requestFindList(key.key,1,this.kind);
              }
        },
        requestFindList(key,pageNum,kind){
            const that = this ;
            this.$ajax('searchList', {
                "s":key,
                "type":kind,
                "page_size":10,
                "p":pageNum,
            }).then(function(res){
                // that.resultList = res.data.info.model;
               if(pageNum == 1){
                   that.resultList = res.data.info.model;
               }else{
                    if(res.data.info.model){
                            
                            if(res.data.info.model.length >= 10){  
                                that.resultList = [...that.resultList, ...res.data.info.model]  
                            // that.resultList = that.resultList.push(res.data.info.model)  
                                //单次请求数据加载完毕后  
                            // console.log( that.$refs)
                            // that.$refs.pullrefresh.$emit('infinitescroll.finishLoad');  
                                that.$nextTick(()=>{
                                  that.$refs.pullrefresh.$emit('infinitescroll.finishLoad');                   
                                })  
                            }else{
                                that.resultList = [...that.resultList, ...res.data.info.model]   
                                //把page设置成false 数据已经加载完毕了 不用在加载了  
                                that.pageNum = false  
                                //所有数据加载完毕后  
                                that.$refs.pullrefresh.$emit('infinitescroll.loadedDone');  
                            }  
                    }
                }
            })
        },
        watchHash(){
          let fullPath = this.$route.fullPath;
             if(fullPath.indexOf("&t") == -1){
                 this.hash = "sound";
                 this.kind = 3 ;
             }else{
                  let urlHash = fullPath.split("&")[1].split("=")[1];
                  if(urlHash == "sound"){
                        this.hash = "sound";
                        this.kind = 3;
                  }else if(urlHash == "album"){
                        this.hash = "album";
                        this.kind = 2;
                  }else if(urlHash == "user"){
                        this.hash = "user";
                        this.kind = 1;
                  }
             }
        },
        
     },
     components:{
           iItab,
           iIScroll,
     },
     mounted(){
         this.watchHash();
         this.hashShow = !this.$route.query.t
     }
  
  }
</script>
</script>
<style lang="scss">
    @import "../../common/style/variable";
    #search{
          -webkit-flex-grow:1;
          width: 100%;
          height: 100%;
           .search-header {
                width: 100%;
                display: block;
                position: relative;
                left: 0;
                right: 0;
                top: 0;
                height: 0.4rem;
                padding: 0.1rem;
                font-size: 0.14rem;
                color: #424242;
                &:after{
                    content: "";
                    display: block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: 0 10px;
                    border-bottom: 1px solid #e0e0e0;
                }
            }
            .search-content {
                display: block;
                position: relative;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                padding: 0.1rem;
                .search-tag {
                    display: inline-block;
                    position: relative;
                    padding: 0.04rem 0.1rem;
                    margin: 0.05rem 0.06rem;
                    color: #9e9e9e;
                    border: 1px solid #9e9e9e;
                    -webkit-border-radius: 0.2rem;
                    -moz-border-radius: 0.2rem;
                    border-radius: 0.2rem;
                    background-color: #fff;
                    font-size: 0.12rem;
                }
            }
            .container{
                height:calc(100vh - 0.44rem);
                //height:100%;
                .initList{
                    width: 100%;
                    // height:calc(100vh - 0.88rem);
                    overflow: hidden;
                    .itemList{
                            padding: 0.12rem;
                            position: relative;
                            min-height:calc(100vh - 0.88rem);
                        .Thumbnail {
                            display: inline-block;
                            margin: 0.05rem;
                            padding: 0;
                            .cover{
                                    display: block;
                                    overflow: hidden;
                                    position: relative;
                                    -webkit-border-radius: 0.04rem;
                                    -moz-border-radius: 0.04rem;
                                    border-radius: 0.04rem;
                                    background-repeat: no-repeat;
                                    background-position: 50%;
                                    -moz-background-size: 100%;
                                    -o-background-size: 100%;
                                    background-size: 100%;
                            }
                            &.list-sound {
                                display: block;
                                position: relative;
                                height: 0.7rem;
                                line-height: 0.7rem;
                                width: 100%;
                                margin: 0;
                                .cover{
                                    -webkit-border-radius: 0.04rem;
                                    -moz-border-radius: 0.04rem;
                                    border-radius: 0.04rem;
                                    height: 0.5rem;
                                    width: 0.5rem;
                                    margin: 0.1rem;
                                    float: left;
                                    overflow: hidden;
                                    position: relative;
                                    .cover-img {
                                        z-index: 0;
                                        display: block;
                                        position: absolute;
                                        -webkit-border-radius:  0.04rem;
                                        -moz-border-radius:  0.04rem;
                                        border-radius:  0.04rem;
                                        height: 0.5rem;
                                        width: 0.5rem;
                                    }
                                }
                                .detail {
                                    float: right;
                                    padding: 0.1rem 0;
                                    height: 100%;
                                    width: -webkit-calc(100% - 0.7rem);
                                    width: -moz-calc(100% - 0.7rem);
                                    width: calc(100% - 0.7rem);
                                    color: #424242;
                                    overflow: hidden;
                                    position: relative;
                                    .title {
                                        width: 94%;
                                        height: 0.36rem;
                                        word-break: break-all;
                                        -o-text-overflow: ellipsis;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                        display: -moz-box;
                                        -moz-box-orient: vertical;
                                        -moz-line-clamp: 2;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 2;
                                        box-orient: vertical;
                                        line-clamp: 2;
                                        line-height: 0.18rem;
                                        font-size: 0.12rem;
                                    }
                                    .username {
                                        width: 86%;
                                        white-space: nowrap;
                                        -o-text-overflow: ellipsis;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                        font-size: 0.12rem;
                                        height: 0.2rem;
                                        line-height: 0.2rem;
                                        color: #9e9e9e;
                                    }
                                    .statistics {
                                        display: block;
                                        position: absolute;
                                        left: 0;
                                        right: 0;
                                        bottom: 11px;
                                        height: 12px;
                                        line-height: 12px;
                                        .item {
                                            font-size: 12px;
                                            color: #9e9e9e;
                                            margin-right: 20px;
                                            padding-left: 18px;
                                            width: 66px;
                                            white-space: nowrap;
                                            -o-text-overflow: ellipsis;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                            display: inline-block;
                                            position: relative;
                                            &:before {
                                                content: "";
                                                display: block;
                                                position: absolute;
                                                left: 2px;
                                                top: 1px;
                                                width: 12px;
                                                height: 12px;
                                                line-height: 12px;
                                            }
                                            &.play-times:before {
                                                background-position: -44px -14px;
                                                -moz-background-size: 56px 55px;
                                                -o-background-size: 56px 55px;
                                                background-size: 56px 55px;
                                                background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                                            }
                                            &.duration:before {
                                                -moz-background-size: 56px 55px;
                                                -o-background-size: 56px 55px;
                                                background-size: 56px 55px;
                                                background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                                                background-position: -15px -44px;
                                            }
                                        }
                                    }
                                }
                                &.large {
                                    height: 0.9rem;
                                    line-height: 0.9rem;
                                    .cover{
                                        height: 0.7rem;
                                        width: 0.7rem;
                                        .cover-img {
                                           height: 0.7rem;
                                           width: 0.7rem;
                                        }
                                    }
                                    .detail {
                                        width: -webkit-calc(100% - 0.9rem);
                                        width: -moz-calc(100% - 0.9rem);
                                        width: calc(100% - 0.9rem);
                                        .title {
                                            font-size: 0.16rem;
                                        }
                                    }
                                }
                                &:after {
                                    content: "";
                                    display: block;
                                    position: absolute;
                                    right: 0;
                                    bottom: 0;
                                    left: 10px;
                                    border-bottom: 1px solid #e0e0e0;
                                }
                            }
                        }
                    }
                }
                .pulldown-wrapper{
                    position: absolute;
                    width: 100%;
                    left: 0;
                    display: flex;
                    justify-content :center;
                    align-items: center;
                    transition: all;
                }


                .pullup-wrapper{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 16px 0;
                }


                .pullDown{
                
                }

                .pullDown-enter-active{
                   transition:all 0.2s;
                }

                .pullDown-enter, .pullDown-leave-active{
                    transform:translateY(-100%);
                    transition:all 0.2s;
                }
            }
            
    }
</style>