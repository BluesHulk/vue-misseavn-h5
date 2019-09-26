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
              <iItab :tabList="tabList" @watchHash="watchHash()"></iItab>
               <scroll  ref="scroll"
                        class="initList"
                        :data="resultList"
                        :scrollbar="scrollbarObj"
                        :pullDownRefresh="pullDownRefreshObj"
                        :pullUpLoad="pullUpLoadObj"
                        :startY="parseInt(startY)"
                        @pullingDown="onPullingDown"
                        @pullingUp="onPullingUp">
                    <div>
                        <div class="itemList sound" v-if="hash == 'sound' ">
                           <div class="SoundList">
                                <div v-for="item in resultList" class="Thumbnail list-sound large">
                                    <div class="cover">
                                        <img class="cover-img" :src="item.front_cover">
                                    </div>
                                    <a class="detail" v-on:click="goToSoundDetail(item)">
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
                        <div  class="itemList album" v-if="hash == 'album' ">
                           <div class="albumList">
                                <div v-for="item in resultList" class="Thumbnail album">
                                    
                                    <a class="detail" :href="/album/+item.id">
                                             <div class="cover" :style="{backgroundImage:'url(' + item.front_cover + ')'}">
                                                <div class="sound-num"><span>10</span></div>
                                             </div>
                                             <div class="title">{{item.title}}</div>
                                    </a>
                                </div>
                          </div>
                        </div>
                        <div  class="itemList user" v-if="hash == 'user' ">

                            
                           <div class="tab-content" >
                                    <a class="search-user-block"  v-for="item in resultList" :href="'/'+ item.id + '/sound'">
                                        <div class="user-avatar verify" :style="{backgroundImage:'url('+  item.avatar2 +')'}"></div>
                                        <div class="user-info">
                                            <span class="name">{{ item.username }}</span>
                                            <div class="details">
                                                <span><!-- react-text: 180 -->声音  <!-- /react-text --><!-- react-text: 181 -->{{item.soundnumchecked}}<!-- /react-text --></span>
                                                <span><!-- react-text: 183 -->粉丝  <!-- /react-text --><!-- react-text: 184 -->{{item.fansnum}}<!-- /react-text --></span>
                                            </div>
                                            <div class="intro">{{item.userintro}}</div>
                                        </div>
                                    </a>
                                   <div class="thumbnail-404" v-if="resultList.length == 0">
                                        <span class="img-404"></span>
                                        <span class="msg-404">搜索不到喵～</span>
                                   </div> 
                            </div>
                            
                        </div>
                    </div>
             </scroll>
              
         </div>         
    </div>
</template>

<script >
  import  Scroll from 'base/scroll/scroll.vue';
  import  constant from 'common/js/constant';
  import searchMinxin from 'common/js/search'
  import { ease } from 'common/js/ease'
  import  iItab from 'base/tab/tab.vue';
  import {
    mapState
  } from 'vuex';
  export default {
    mixins: [searchMinxin],
    data() {
      return {
        scrollbar: true,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt:'没有更多数据了',
        startY: 0,
        scrollToX: 0,
        scrollToY: -200,
        scrollToTime: 700,
        scrollToEasing: 'bounce',
        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
        hotsearchList:[],
        resultList:[],
        tabList:constant.searchTab,
        hash:"sound",
        pageNum:1,
        kind:3,
        hashShow:true,
        scrollbar:true,
        probeType:3
      }
    },
    created() {
     this.hotsearch();
        const txt = this.$route.query.s;
        const kind = this.$route.query.t;
        if(kind == "sound"){
            this.kind = 3;
            this.requestFindList(txt,1,this.kind);
        }else if(kind == "album"){
            this.kind = 2;
            this.requestFindList(txt,1,this.kind);
        }else if(kind == "user"){
            this.kind = 1;
            this.requestFindList(txt,1,this.kind);
        }
        if(this.falgkey != ""){
             this.hashShow = false;
             console.log(this.hashShow)
            this.kind = 3;
            this.requestFindList(this.falgkey,1,this.kind);
        }
    },
    components: {
      Scroll,
      iItab
    },
    watch: {
      scrollbarObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      pullDownRefreshObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      pullUpLoadObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      startY() {
        this.rebuildScroll()
      },
      "isInit" (data) {
          console.log(data)
            if(this.isInit){
              this.hashShow = false;
            }else{
               this.hashShow = true;
            }
        },
      '$route' (to, from) {
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
                // console.log(to.query.s)
                this.$store.dispatch('keyDown', to.query.s); 
            }
        },
        'pageNum':{
            immediate: true,
            handler: function (val, oldVal) {
                // console.log(val,oldVal)
            },
        },
        'hashShow':{
            immediate: true,
            handler: function (val, oldVal) {
            //    console.log(val,oldVal)
            },
        }
    },
    computed: {
      ...mapState([
            'falgkey',
            'searchtList',
            'searchState',
            'isInit'
        ]),
      scrollbarObj: function () {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    methods: {
      scrollTo() {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, ease[this.scrollToEasing])
      },
      onPullingDown() {
        const txt = this.$route.query.s;
        this.pageNum = 1 ;
          if(txt){
              this.requestFindList(txt,this.pageNum,this.kind);
          }
      },
      onPullingUp() {
        // 更新数据
        if(this.pageNum){
            this.pageNum++;
            const txt = this.$route.query.s;
            if(txt){
                this.requestFindList(txt,this.pageNum,this.kind);
            }
        }
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      hotsearch(){
            const that = this ;
            this.$ajax('hotsearch').then(function(res){
                that.hotsearchList = res.data.info;
            })
      },
      clickList(key) {
              this.$store.dispatch('isInit', true); 
              this.$router.replace('/search?s='+key.key+'&t=sound');
             if(this.isInit){
                  this.hashShow = true;
             }else{
                  this.hashShow = !this.$route.query.t
             }
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
               let urlList = ['sound','drama','live','album','user']
               let tabList = res.data.info.navs;a
               console.log(res.data.info.navs)
             
               Object.assign(tabList,that.tabList)
               console.log(that.tabList)
               if(pageNum == 1){
                   if(res.data.info.model){
                     that.resultList = res.data.info.model;
                   }else{
                       that.resultList = []
                   }
               }else{
                    if(res.data.info.model){
                       that.resultList = [...that.resultList, ...res.data.info.model];
                    }else{
                       that.$refs.scroll.forceUpdate()  
                    }
                }
               
            })
      },
      watchHash(val){
             let fullPath = this.$route.fullPath;
             this.pageNum = 1 ;
            
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
                   this.$refs.scroll.scrollTo(this.$refs.scroll,0)
             }
        },
        goToSoundDetail(item) {
            const objectId = item.id;
            const host = this.$route.host;
            let url = "http://" + location.host  + "/sound/" + objectId + "/introduction";
            window.location.href = url;
        },
    },
    mounted(){
         this.$nextTick(function () {
             this.watchHash();
         })
        if(this.$route.query.t){
            this.$store.dispatch('isInit', true); 
        }
        
         this.hashShow = !this.$route.query.t;
        
           
        
     }
  }
</script>

<style scoped lang="scss" >
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
                            &.album {
                                width: 1.06rem;
                                margin: 0.05rem 0.03rem;
                                z-index: 0;
                                .cover{
                                    width: 1.06rem;
                                    height: 1.06rem;
                                    border: 1px solid #bdbdbd;
                                    -webkit-border-radius: 0.04rem;
                                    -moz-border-radius: 0.04rem;
                                    border-radius: 0.04rem;
                                    background-color: #fff;
                                    overflow: visible;
                                    &:before {
                                        bottom: 0;
                                        left: 0;
                                        z-index: -1;
                                        content: "";
                                        display: block;
                                        position: absolute;
                                         width: 1.06rem;
                                        height: 1.06rem;
                                        border: 1px solid #bdbdbd;
                                        -webkit-border-radius: 0.04rem;
                                        -moz-border-radius: 0.04rem;
                                        border-radius: 0.04rem;
                                        background-color: #fff;
                                    }
                                    &:after {
                                        bottom: 0.03rem;
                                        left: 0.03rem;
                                        z-index: -2;
                                        content: "";
                                        display: block;
                                        position: absolute;
                                        width: 1.06rem;
                                        height: 1.06rem;
                                        border: 1px solid #bdbdbd;
                                        -webkit-border-radius: 0.04rem;
                                        -moz-border-radius: 0.04rem;
                                        border-radius: 0.04rem;
                                        background-color: #fff;
                                    }
                                }
                                .sound-num {
                                    bottom: 0;
                                    right: 0;
                                    left: 0;
                                    height: 0.18rem;
                                    line-height: 0.18rem;
                                    position: absolute;
                                    background: -webkit-gradient(linear,left top,right top,from(transparent),color-stop(30%,rgba(0,0,0,.02)),color-stop(30%,rgba(0,0,0,.8)));
                                    background: -webkit-linear-gradient(left,transparent,rgba(0,0,0,.02) 30%,rgba(0,0,0,.8));
                                    background: -moz-linear-gradient(left,transparent,rgba(0,0,0,.02) 30%,rgba(0,0,0,.8));
                                    background: -o-linear-gradient(left,transparent,rgba(0,0,0,.02) 30%,rgba(0,0,0,.8));
                                    background: linear-gradient(90deg,transparent,rgba(0,0,0,.02) 30%,rgba(0,0,0,.8));
                                    -webkit-border-bottom-right-radius: 0.04rem;
                                    -moz-border-radius-bottomright: 0.04rem;
                                    border-bottom-right-radius: 0.04rem;
                                    span {
                                        display: block;
                                        position: absolute;
                                        right: 0.05rem;
                                        padding-left: 0.14rem;
                                        font-size: 0.12rem;
                                        color: #fff;
                                        &:before {
                                            -moz-background-size: 0.56rem 0.55rem;
                                            -o-background-size: 0.56rem 0.55rem;
                                            background-size: 0.56rem 0.55rem;
                                            background-position: 0 -0.44rem;
                                            content: "";
                                            display: block;
                                            position: absolute;
                                            margin: 0.04rem 0 0.03rem;
                                            left: 0;
                                            height: 0.11rem;
                                            width: 0.13rem;
                                            background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                                        }
                                    }
                                }
                                .title {
                                    margin: 0;
                                    white-space: normal;
                                    width: 1.06rem;
                                    height: 0.4rem;
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
                                    line-height: 0.2rem;
                                    color: #616161;
                                    font-size: 0.13rem;
                                }
                            }
                        }
                        .tab-content {
                            padding: 0.12rem;
                            position: relative;
                            min-height: -webkit-calc(100vh - 0.88rem);
                            min-height: -moz-calc(100vh - 0.88rem);
                            min-height: calc(100vh - 0.88rem);
                            .thumbnail-404 {
                                display: block;
                                height: 2.5rem;
                                width: 3.1rem;
                                margin: 0.5rem auto;
                                text-align: center;
                                .img-404 {
                                    background: url(../../common/image/miao.png) no-repeat;
                                    height: 2rem;
                                    width: 3.08rem;
                                    display: block;
                                }
                                .msg-404 {
                                    display: block;
                                    margin: 0.05rem auto;
                                    color: #9e9e9e;
                                    font-size: 0.16rem;
                                }
                            }
                            &:after {
                                content: "";
                                display: block;
                                position: relative;
                                clear: both;
                            }
                            .search-user-block {
                                display: -webkit-box;
                                display: -webkit-flex;
                                display: -moz-box;
                                display: -ms-flexbox;
                                display: flex;
                                position: relative;
                                width: 100%;
                                height: 0.8rem;
                                .user-avatar {
                                    position: relative;
                                    width: 0.6rem;
                                    background-position: 50%;
                                    background-repeat: no-repeat;
                                    -moz-background-size: 100%;
                                    background-size: 100%;
                                    -webkit-border-radius: 50%;
                                    -moz-border-radius: 50%;
                                    border-radius: 50%;
                                    display: block;
                                    height: 0.6rem;
                                    &.verify:after {
                                        background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons@2x.960cf225.png);
                                        -moz-background-size: 1.68rem 1.35rem;
                                        background-size: 1.68rem 1.35rem;
                                    }
                                }
                                .user-info {
                                    margin-left: 0.1rem;
                                    width: -webkit-calc(100% - 0.7rem);
                                    width: -moz-calc(100% - 0.7rem);
                                    width: calc(100% - 0.7rem);
                                    .name {
                                        display: block;
                                        color: #000;
                                        font-size: 0.15rem;
                                        height: 0.22rem;
                                        line-height: 0.22rem;
                                        margin-bottom: 0.02rem;
                                        width: 100%;
                                        white-space: nowrap;
                                        -o-text-overflow: ellipsis;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                    }
                                    .details {
                                        height: 0.18rem;
                                        line-height: 0.18rem;
                                        width: 170px;
                                        clear: both;
                                        span {
                                            float: left;
                                            width: 0.85rem;
                                            font-size: 0.12rem;
                                            color: #9e9e9e;
                                        }
                                    }
                                    .intro {
                                        font-size: 0.12rem;
                                        height: 0.18rem;
                                        line-height: 0.18rem;
                                        color: #9e9e9e;
                                        width: 100%;
                                        white-space: nowrap;
                                        -o-text-overflow: ellipsis;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                    }
                                }
                            }
                        }
                        
                    }
                   
                }
                
            }
            
    }
</style>
