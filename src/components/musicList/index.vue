<template>
  <div id="music">
   <iIScroll ref = "scroll" class="recommend-content" :data="musicData">
    <div>
     
       <div>
            <iItab :tabList="tabList" ></iItab>
            <div class="minBox">
                <div id="AlbumsTab">
                    <div class="catalogs-tab" :class=" isShow ? 'show': '' ">
                        <div class="tab-title">
                            <span class="btn-cancel" @click="selectOrClickCancle()">取消</span>
                            类型选择
                        </div>
                        <div class="tags-row">
                            <span class="tag-item all active" @click="changeList(0)">全部音单</span>
                        </div>
                        <div class="tags-item" v-for="(item,key) in recommendData" >
                            <div class="leftIcon">
                                <i></i>
                                {{key}}
                            </div>
                            <div class="rightIcon" >
                                <span v-for="(its,idx) in item" :data-id="its[0]" @click="changeList(its[0])">
                                    {{its[1]}}
                                </span>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div class="Panel trans" :class=" isShow ? 'fade': 'isFade' ">
                         <div class="panel-head">
                            <div class="panel-title">
                               <div class="callout">{{title}}</div>
                            </div>
                            <div class="panel-nav" @click="showType()">
                               <span class="album-panel-type" >类型</span>
                            </div>
                        </div>
                        <div class="panel-body">
                            <a class="Thumbnail album adjust" v-for="(item,index) in musicData" :href="'/album/'+item.id">
                              <div class="cover" :style="{ backgroundImage: 'url('+item.front_cover+')'}" >
                                <div class="sound-num">
                                    <span>{{item.music_count}}</span>
                                </div>
                              </div>
                              <div class="title">{{item.title}}</div>
                            </a>
                            <button class="btn-text open-app">更多</button>
                        </div>
                    </div>
                </div>
                
            </div>
            <iIFooter @backTop="backTop"></iIFooter>
        </div>
    </div>
    <div class="loading-container" v-show="!musicData.length">
            <iILoading></iILoading>
    </div>
   </iIScroll>
   </div>
</template>
<script>
  import  iIScroll from 'base/scroll/index.vue';
  import  iILoading from 'base/loading/index.vue';
  import  iIFooter from 'base/footer/index.vue';
  import  iItab from 'base/tab/index.vue';
  import  constant from 'common/js/constant';
  export default {
        data() {
            return {
              musicData:[],
              checkLoaded:false,
              isShow:false,
              recommendData:[],
              tabList:constant.recommendTabs,
              tipTitle:[],
              title:"全部歌单"
            }
        },
        created(){
         const id = this.$route.params.id
         if(!id){
            this.musicList(0);
         }else{
            this.musicList(id);
         }  
        //   this.musicList(id);
          this.recommend();
        },
        activated(){
             setTimeout(() => {
                 //this.$refs.slider && this.$refs.slider.refresh()
             }, 20)
        },
        mounted() {
           
            // this.initTitle()
        },
        methods:{
           
            loadImg(){
                if(!this.checkLoaded){
                     this.$refs.scroll.refresh()
                     this.checkLoaded = true;
                }
            },
            musicList(id){
                const that = this;
                this.$ajax('musicList',{
                    order:0,
                    tid:id
                }).then(function(res){
                    
                   that.musicData = res.data.albums;
                })
            },
            recommend(){
                const that = this;
                this.$ajax('recommend').then(function(res){
                   that.recommendData = res.data.info;
                    for(var i = 0 ; i<Object.values(res.data.info).length; i++){
                        // console.log(Object.values(res.data.info)[i])
                        for(var j in Object.values(res.data.info)[i] ){
                             var temp = {
                                 id:Object.values(res.data.info)[i][j][0],
                                 title:Object.values(res.data.info)[i][j][1]
                             }
                             that.tipTitle.push(temp)
                        }
                    
                    }
                    that.tipTitle.unshift({
                         id:0,
                         title:'全部歌单'
                    })
                    that.initTitle()
                    console.log(that.recommendData)
                })
            },
            backTop(){
                this.$refs.scroll.scrollTo(this.$refs.scroll,0)
            },
            showType(){
                  this.isShow = true;
            },
            selectOrClickCancle(){
                  this.isShow = false;
            },
            changeList(id){
             const fullPath = this.$route.fullPath;
              let url = "http://" + location.host + fullPath + "/" + id;
            //   window.location.href= url;
              this.isShow = false;
              this.musicList(id);
              this.$router.push({ name: 'musicList', params: { id:id }});
              this.initTitle()
            //   this.$router.push(url)
            },
       
            initTitle(){
                for( var i = 0; i<this.tipTitle.length;i++){
                           if(this.$route.params.id){
                                if(this.$route.params.id == this.tipTitle[i].id){
                                     this.title = this.tipTitle[i].title
                                }
                           }else{
                                this.title = "全部歌单"
                           }
                }
            }
        },
        components:{
           iIScroll,
           iItab,
           iILoading,
           iIFooter
        }
    }
</script>
<style lang="scss">

@mixin topStyle($load){
    margin: 0 auto;
	display:block;
    width: 36px;
    height: 36px;
    background-position: 50%;
    background-repeat: no-repeat;
	background-image:url(../../common/image/missevan#{$load}.png) ;	
	background-size:cover;
}
    #music{
          -webkit-flex-grow:1;
          display:-webkit-flex;
          width: 100%;
          height: 100%;
        .recommend-content{
             width: 100%;
             height: 100%;
             -webkit-box-flex:1;
             overflow: hidden;
             .minBox{
                 min-height: calc(100vh - 1.54rem);
                 #AlbumsTab{
                     overflow:auto;
                     .catalogs-tab {
                        display: block;
                        position: absolute;
                        height: -webkit-calc(100vh - 40px);
                        height: -moz-calc(100vh - 40px);
                        height: calc(100vh - 40px);
                        width: 100%;
                        left: 100%;
                        background-color: #f5f5f5;
                        -webkit-transition: left .5s;
                        -o-transition: .5s left;
                        -moz-transition: .5s left;
                        transition: left .5s;
                        z-index: 10;
                        padding-top: 40px;
                        top: 0px;
                        overflow: auto;
                        &.show{
                            left:0;
                        }
                        
                        .tab-title {
                            display: block;
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 40px;
                            border-bottom: 1px solid #eee;
                            text-align: center;
                            font-size: 16px;
                            line-height: 40px;
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                            background-color: #fff;
                            color: #262626;
                            .btn-cancel {
                                    display: block;
                                    position: absolute;
                                    left: 10px;
                                    color: #9e9e9e;
                                }
                        }
                        .tags-row {
                            display: block;
                            position: relative;
                            margin: 0 0 10px;
                            background-color: #fff;
                            color: #3d3d3d;
                            font-size: 14px;
                            overflow: hidden;
                             .tag-item {
                                display: block;
                                position: relative;
                                height: 46px;
                                line-height: 46px;
                                text-align: center;
                                -webkit-box-sizing: border-box;
                                -moz-box-sizing: border-box;
                                box-sizing: border-box;
                                border: 1px solid #e1e1e1;
                                &.all{
                                    margin: 6px auto;
                                    width: -webkit-calc(100% - 20px);
                                    width: -moz-calc(100% - 20px);
                                    width: calc(100% - 20px);
                                }
                            }
                        }
                        
                        .tags-item{
                            width:100%;
                            display:-webkit-box;
                            display:flex;
                            margin-top: 10px;
                            display: table; 
                            .leftIcon{
                               width:1rem;
                               background:#fff;
                               position:relative;
                               display: table-cell;
                               vertical-align: middle;
                               text-align:center;
                               &:after{
                                    content: "";
                                    border-bottom: 1px solid #fff;
                                    display: block;
                                    position: absolute;
                                    bottom: 0;
                                    left: 1.01rem;
                                    width: -webkit-calc((100vw - 1rem)/2 - 2px);
                                    width: -moz-calc((100vw - 1rem)/2 - 2px);
                                    width: calc((100vw - 1rem) / 2 - 2px);
                               }
                              
                            }
                            .rightIcon{
                                -webkit-flex:1;
                                display: -webkit-flex;
                                display: flex;
                                -webkit-flex-wrap: wrap;
                                flex-wrap: wrap;
                                -webkit-align-content: center;
                                align-content: center;
                                background-color: #fff;
                                span{
                                    background-color: #fff;
                                    width: 50%;
                                    height: 0.46rem;
                                    border:1px solid #e1e1e1;
                                    border-top:0;
                                    float:left;
                                    text-align: center;
                                    line-height: 0.46rem;
                                }
                              
                                span:nth-child(even){
                                    border-right: 0;
                                    border-left: 0;
                                   
                                }
                                span:last-child{
                                    border-bottom:0;
                                        // width: calc(50% + 1px);
                                }
                            }
                        }
                        @for $i from 3 through 5 {
                            .tags-item:nth-of-type(#{$i}){
                                    .leftIcon{
                                        i{
                                            @include topStyle($load:$i - 2);
                                        }
                                    }
                            }
                            
                        }
                    
                    }
                 }
                 .Panel {
                    overflow: hidden;
                    padding-bottom: 0;
                    background-color: transparent;
                    border: none;
                    display: block;
                    position: relative;
                    width: 100%;
                    margin: 10px auto;
                    &.isFade{
                            display:block;
                        }
                    &.fade{
                        display:none;
                    }
                    .panel-head {
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -moz-box;
                        display: -ms-flexbox;
                        display: flex;
                        position: relative;
                        -webkit-box-pack: justify;
                        -webkit-justify-content: space-between;
                        -moz-box-pack: justify;
                        -ms-flex-pack: justify;
                        justify-content: space-between;
                        padding: 0 14px;
                        height: 24px;
                        line-height: 24px;
                        margin: 10px 0;
                        .panel-title {
                            font-size: 16px;
                            display: inline-block;
                            .callout {
                                margin: 0;
                                font-size: 16px;
                                display: block;
                                position: relative;
                                padding-left: 10px;
                                &::before {
                                    content: "";
                                    display: block;
                                    position: absolute;
                                    left: 0;
                                    top: 10%;
                                    height: 80%;
                                    background-color: #000;
                                    width: 4px;
                                    -webkit-border-radius: 4px;
                                    -moz-border-radius: 4px;
                                    border-radius: 4px;
                                }
                            }
                        }
                        .panel-nav {
                            font-size: 14px;
                            color: #9e9e9e;
                            .album-panel-type {
                                display: block;
                                position: relative;
                                float: right;
                                background-color: #fff;
                                border: 1px solid #e0e0e0;
                                -webkit-border-radius: 20px;
                                -moz-border-radius: 20px;
                                border-radius: 20px;
                                width: 64px;
                                height: 24px;
                                line-height: 24px;
                                font-size: 13px;
                                text-align: center;
                                color: #757575;
                                &::after {
                                    content: "";
                                    display: block;
                                    position: relative;
                                    float: right;
                                    top: 7px;
                                    right: 12px;
                                    width: 8px;
                                    height: 8px;
                                    -webkit-box-sizing: border-box;
                                    -moz-box-sizing: border-box;
                                    box-sizing: border-box;
                                    border: 1px solid #757575;
                                    border-bottom: none;
                                    border-left: none;
                                    -webkit-transform: rotate(45deg);
                                    -moz-transform: rotate(45deg);
                                    -ms-transform: rotate(45deg);
                                    -o-transform: rotate(45deg);
                                    transform: rotate(45deg);
                                }
                            }
                        }
                    }
                    .panel-body {
                        -webkit-flex-wrap: wrap;
                        -ms-flex-wrap: wrap;
                        flex-wrap: wrap;
                        padding: 10px 0;
                        min-height: 320px;
                        margin: 0 14px;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -moz-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-justify-content: space-around;
                        -ms-flex-pack: distribute;
                        justify-content: space-around;
                        -webkit-box-align: center;
                        -webkit-align-items: center;
                        -moz-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        .Thumbnail {
                            margin-left: 0;
                            margin-right: 0;
                            width: -webkit-calc((100vw - 28px)/2 - 10px);
                            width: -moz-calc((100vw - 28px)/2 - 10px);
                            width: calc((100vw - 28px) / 2 - 10px);
                            margin: 0 0 10px;
                            display: inline-block;
                            padding: 0;
                            .sound-num {
                                bottom: 0;
                                right: 0;
                                left: 0;
                                height: 18px;
                                line-height: 18px;
                                position: absolute;
                                background: -webkit-gradient(linear,left top,right top,from(transparent),color-stop(30%,rgba(0,0,0,.02)),color-stop(30%,rgba(0,0,0,.8)));
                                background: -webkit-linear-gradient(left,transparent,rgba(0,0,0,.02) 30%,rgba(0,0,0,.8));
                                background: -moz-linear-gradient(left,transparent,rgba(0,0,0,.02) 30%,rgba(0,0,0,.8));
                                background: -o-linear-gradient(left,transparent,rgba(0,0,0,.02) 30%,rgba(0,0,0,.8));
                                background: linear-gradient(90deg,transparent,rgba(0,0,0,.02) 30%,rgba(0,0,0,.8));
                                -webkit-border-bottom-right-radius: 4px;
                                -moz-border-radius-bottomright: 4px;
                                border-bottom-right-radius: 4px;
                            }
                            .cover{
                                width: 100%;
                                height: -webkit-calc((100vw - 28px)/2 - 10px);
                                height: -moz-calc((100vw - 28px)/2 - 10px);
                                height: calc((100vw - 28px) / 2 - 10px);
                                border: none;
                                border-radius: 4px;
                                background-color: #fff;
                                overflow: visible;
                                display: block;
                                overflow: hidden;
                                position: relative;
                                -webkit-border-radius: 4px;
                                -moz-border-radius: 4px;
                                border-radius: 4px;
                                background-repeat: no-repeat;
                                background-position: 50%;
                                -moz-background-size: 100%;
                                background-size: 100%;
                                .sound-num {
                                    height: 36px;
                                    line-height: 24px;
                                    background: -webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.26)));
                                    background: -webkit-linear-gradient(top,transparent,rgba(0,0,0,.26));
                                    background: -moz-linear-gradient(top,transparent,rgba(0,0,0,.26));
                                    background: -o-linear-gradient(top,transparent,rgba(0,0,0,.26));
                                    background: linear-gradient(180deg,transparent,rgba(0,0,0,.26));
                                    span {
                                        bottom: 0;
                                        text-shadow: 0.5px 0 1px #000;
                                        display: block;
                                        position: absolute;
                                        right: 5px;
                                        padding-left: 14px;
                                        font-size: 12px;
                                        color: #fff;
                                        &:before {
                                            content: "";
                                            display: block;
                                            position: absolute;
                                            margin: 4px 0 3px;
                                            left: 0;
                                            height: 11px;
                                            width: 13px;
                                            background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                                            background-position: 0 -44px;
                                            -moz-background-size: 56px 55px;
                                            background-size: 56px 55px;
                                            margin-top: 8px;
                                        }
                                    }
                                }
                            }
                            .title {
                                display: block;
                                color: #616161;
                                font-size: 13px;
                                margin: 0;
                                white-space: normal;
                                width: 106px;
                                height: 40px;
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
                                line-height: 20px;
                                 width: 100%;
                            }
                        }
                        .open-app {
                            display: block;
                            width: 80%;
                            height: 30px;
                            margin: 10px auto;
                            border: none;
                            font-size: 14px;
                            position: relative;
                            text-align: center;
                            vertical-align: middle;
                            cursor: pointer;
                            border: 1px solid transparent;
                            -webkit-border-radius: 3px;
                            -moz-border-radius: 3px;
                            border-radius: 3px;
                            margin: 3px;
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                            -webkit-transition: color .2s ease,background-color .2s ease,background .2s ease,border-color .2s ease;
                            -o-transition: color .2s ease,background-color .2s ease,background .2s ease,border-color .2s ease;
                            -moz-transition: color .2s ease,background-color .2s ease,background .2s ease,border-color .2s ease;
                            transition: color .2s ease,background-color .2s ease,background .2s ease,border-color .2s ease;
                         }
                    }
                    
                }
             }
            .loading-container{
                position: absolute;
                width: 100%;
                top: 0.84rem;
                min-height: calc(100vh - 0.84rem);
                box-sizing: border-box;
            }
        }
    }
</style>