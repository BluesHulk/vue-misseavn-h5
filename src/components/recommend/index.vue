<template>
  <div id="home">
   <iIScroll ref = "scroll" class="recommend-content" :data="itemList">
    <div>
     
            <div>
                <iItab :tabList="tabList" ></iItab>
                <div class="slider-wrapper" v-if="sliderData.length">
                    <div class="slider-content">
                        <iISlider ref="slider">
                        <div v-for="item in sliderData">
                            <a :href="item.url">
                            <img @load="loadImg()" :src="item.pic" >
                            </a>
                        </div>
                        </iISlider>
                    </div>
                </div>
                <div class="Panel sounds">
                    <div class="panel-head">
                        <div class="panel-title">
                            <div class="home-panel-title sound">
                            <i></i>
                            人气 M 音
                            </div>
                        </div>
                        <div class="panel-nav">
                        <a class="home-panel-nav" href="/rank">排行榜</a>
                        </div>
                    </div>
                    <div class="panel-body">
                        <a class="Thumbnail sound" v-for="item in sentimentList"  :href="hrefLink(item)">
                            <div class="cover" :style="{backgroundImage:'url(' + item.front_cover + ')'}"></div>
                            <div class="title">{{item.soundstr}}</div>
                            <div class="detail">
                                <span class="item play-times">{{item.view_count_formatted}}</span><span class="item comments">{{item.comment_count}}</span>
                            </div>
                        </a>
                        
                    </div>
                </div>
                <div class="Panel channels">
                    <div class="panel-head">
                        <div class="panel-title">
                            <div class="home-panel-title channel">
                            <i></i>
                             频道
                            </div>
                        </div>
                        <div class="panel-nav">
                        <a class="home-panel-nav" href="/channels/all">更多</a>
                        </div>
                    </div>
                    <div class="panel-body">
                        <a class="Thumbnail channel" v-for="item in channelList"  :href="channelLink(item)">
                            <div class="cover"  :style="{backgroundImage:'url(' + item.smallpic + ')'}">
                                <div class="follow">
                                    <span>{{item.follow_num}}</span>
                                </div>
                            </div>
                        <div class="title">{{item.name}}</div>
                        </a>
                    </div>
                </div>
                <div class="Panel sounds" v-for="item in itemList" >
                    <div class="panel-head">
                        <div class="panel-title">
                            <div class="home-panel-title sound">
                            <i :class="iconName(item)"></i>
                            {{item.title}}
                            </div>
                        </div>
                        <div class="panel-nav">
                        <a class="home-panel-nav" :href="'/catalogs/'+item.id">更多</a>
                        </div>
                    </div>
                    <div class="panel-body">
                        <a class="Thumbnail sound" v-for="items in item.objects_point"  :href="hrefLink(items)">
                            <div class="cover" :style="{backgroundImage:'url('+miniImg(items)+')'}"></div>
                            <div class="title">{{items.soundstr}}</div>
                            <div class="detail">
                                <span class="item play-times">{{items.view_count}}</span><span class="item comments">{{items.comment_count}}</span>
                            </div>
                        </a>
                        
                    </div>
                </div>
                <iIFooter @backTop="backTop"></iIFooter>
            </div>
    </div>
    <div class="loading-container" v-show="!itemList.length">
            <iILoading></iILoading>
    </div>
   </iIScroll>
   </div>
</template>
<script>
  import  iIScroll from 'base/scroll/index.vue';
  import  iISlider from 'base/slider/index.vue';
  import  iILoading from 'base/loading/index.vue';
  import  iIFooter from 'base/footer/index.vue';
  import  iItab from 'base/tab/index.vue';
  import  constant from 'common/js/constant';
  export default {
        data() {
            return {
              sentimentList:[],
              channelList:[],
              sliderData:[],
              itemList:[],
              checkLoaded:false,
              tabList:constant.recommendTabs,
              messagetip:"aaaa"
            }
        },
        created(){
          this.bannerData();
          this.listRecommend()
        },
        activated(){
             setTimeout(() => {
                 //this.$refs.slider && this.$refs.slider.refresh()
             }, 20)
        },
       
        methods:{
           
            loadImg(){
                if(!this.checkLoaded){
                     this.$refs.scroll.refresh()
                     this.checkLoaded = true;
                }
            },
            bannerData(){
                const that = this;
                this.$ajax('banner').then(function(res){
                    that.sliderData = res.data.info.banner;
                    that.sentimentList = res.data.info.sound.slice(0,3);
                    that.channelList =  res.data.info.channel
                })
            },
            listRecommend(){
                const that = this;
                this.$ajax('listRecommend').then(function(res){
    
                   that.itemList = res.data.music
                })
            },
            hrefLink(item){
                return `/sound/${item.id}/introduction`
            },
            channelLink(item){
                return `/channel/${item.id}`
            },
            iconName(item){
                return `catalog-icon-${item.id}`
            },
            getMore(item){
                return `/catalogs/${item.id}`
            },
            miniImg(item){
                return `//static.missevan.com/coversmini/${item.cover_image}`
            },
            backTop(){
                this.$refs.scroll.scrollTo(this.$refs.scroll,0)
            }
        },
        components:{
           iIScroll,
           iISlider,
           iItab,
           iILoading,
           iIFooter
        }
    }
</script>
<style lang="scss">
    #home{
          -webkit-flex-grow:1;
          display:-webkit-flex;
          width: 100%;
          height: 100%;
        .recommend-content{
             width: 100%;
             height: 100%;
             -webkit-box-flex:1;
             overflow: hidden;
             .slider-wrapper{
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 1.25rem;
                overflow: hidden;
                .slider-content{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            .Panel{
                display: block;
                position: relative;
                width: 100%;
                background-color: whitesmoke;
                padding-bottom: 0.16rem;
                margin: 0.1rem auto;
                border: 1px solid #eee;
                border-left: none;
                border-right: none;
                &.channels{
                     .panel-body {
                        -webkit-flex-wrap: wrap;
                        -ms-flex-wrap: wrap;
                        flex-wrap: wrap;
                    }
                }
                .panel-head {
                    height: 0.4rem;
                    line-height: 0.4rem;
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
                    padding: 0 0.14rem;
                    .panel-title {
                        font-size: 0.16rem;
                        display: inline-block;
                         .home-panel-title {
                            font-size: 0.16rem;
                            color: #000;
                            i{
                                position: relative;
                                top: 0.04rem;
                                margin-right: 0.05rem;
                                height: 0.2rem;
                                width: 0.2rem;
                                display: inline-block;
                                background-position: 50%;
                                background-repeat: no-repeat;
                                -moz-background-size: 100%;
                                background-size: 100%;
                            }
                        }
                         .home-panel-title{
                              &.sound{
                                    width: 1rem;
                                    i{
                                        background-image: url(../../common/image/sprite-icons-catalog@2x.png);
                                        -moz-background-size: 0.86rem 0.86rem;
                                        background-size: 0.86rem 0.86rem;
                                        background-position: -0.22rem 0;
                                        &.catalog-icon-46{
                                             background-position: -0.66rem -0.44rem;
                                        }
                                        &.catalog-icon-5{
                                             background-position: -0.44rem -0.22rem;
                                        }
                                        &.catalog-icon-8{
                                             background-position: -0.22rem -0.44rem;
                                              background-size: 0.41rem 0.86rem;
                                        }
                                        &.catalog-icon-54{
                                             background-position: -0.22rem -0.66rem;
                                        }
                                        &.catalog-icon-26{
                                             background-position: -0.66rem 0;
                                        }
                                        &.catalog-icon-41{
                                             background-position: -0.66rem -0.22rem;
                                        }
                                        &.catalog-icon-52{
                                             background-position:  0 -0.66rem;
                                        } 
                                        &.catalog-icon-65{
                                             background-position:  -0.66rem -0.66rem;
                                        }
                                    }
                                }
                             &.channel{
                                    width: 1rem;
                                    i{
                                        background-image: url(../../common/image/sprite-icons-catalog@2x.png);
                                        -moz-background-size: 0.86rem 0.86rem;
                                        background-size: 0.86rem 0.86rem;
                                        background-position: -0.44rem -0.44rem;
                                }
                              }
                         }
                        
                    }
                    .panel-nav {
                        font-size: 0.14rem;
                        color: #9e9e9e;
                        display: inline-block;
                        .home-panel-nav {
                            display: inline-block;
                            max-width: 0.66rem;
                            text-align: center;
                            font-size: 0.13rem;
                            color: #9e9e9e;
                            &:after{
                                content: "";
                                height: 0.16rem;
                                width: 0.16rem;
                                display: inline-block;
                                position: relative;
                                top: 0.03rem;
                                right: -0.03rem;
                                background-image: url(../../common/image/sprite-icons@2x.png);
                                background-position: -0.44rem -0.93rem;
                                -moz-background-size: 1.51rem 1.29rem;
                                background-size: 1.51rem 1.29rem;
                            }
                        }
                    }
                }
                .panel-body {
                    min-height: 1.7rem;
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
                    overflow-x: auto;
                    margin: 0 0.14rem;
                    .Thumbnail {
                        display: inline-block;
                        margin: 0.05rem;
                        padding: 0;
                        margin-left: 0;
                        margin-right: 0;
                        &.sound{
                               width: 1.06rem;
                               height: 1.63rem;
                               .cover {
                                    width: 1.06rem;
                                    height: 1.06rem;
                               }
                               .title {
                                    width: 100%;
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
                                    margin: 0.04rem 0;
                                }
                                .detail {
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
                                    .item {
                                        position: relative;
                                        padding-left: 0.14rem;
                                        font-size: 0.11rem;
                                        line-height: 0.11rem;
                                        color: #bdbdbd;
                                        &:before {
                                            content: "";
                                            display: block;
                                            position: absolute;
                                            left: 0;
                                            height: 10px;
                                            width: 0.12rem;
                                        }
                                        &.play-times:before {
                                            background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                                            -moz-background-size: 0.56rem 0.55rem;
                                            background-size: 0.56rem 0.55rem;
                                            background-position: -0.44rem -0.14rem;
                                        }
                                        &.comments:before {
                                            background-position: -0.44rem -0.26rem;
                                            background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                                            -moz-background-size: 0.56rem 0.55rem;
                                            background-size: 0.56rem 0.55rem;
                                        }
                                    }
                                }
                        }
                        &.channel {
                            width: -webkit-calc(50vw - 0.28rem);
                            width: -moz-calc(50vw - 0.28rem);
                            width: calc(50vw - 0.28rem);
                            margin: 0.03rem;
                            .cover {
                                width: 100%;
                                height: -webkit-calc((50vw - 0.28rem)/1.5);
                                height: -moz-calc((50vw - 0.28rem)/1.5);
                                height: calc((50vw - 0.28rem) / 1.5);
                                .follow {
                                    position: absolute;
                                    top: 0;
                                    right: 0;
                                    background-image: -webkit-gradient(linear,left top,right top,from(transparent),to(rgba(0,0,0,.2)));
                                    background-image: -webkit-linear-gradient(left,transparent,rgba(0,0,0,.2));
                                    background-image: -moz-linear-gradient(left,transparent,rgba(0,0,0,.2));
                                    background-image: -o-linear-gradient(left,transparent,rgba(0,0,0,.2));
                                    background-image: linear-gradient(90deg,transparent,rgba(0,0,0,.2));
                                    width: 0.8rem;
                                    height: 0.2rem;
                                    padding: 0 0.05rem;
                                    text-align: right;
                                    -webkit-border-top-right-radius: 0.04rem;
                                    -moz-border-radius-topright: 0.04rem;
                                    border-top-right-radius: 0.04rem;
                                    span {
                                        float: right;
                                        display: inline-block;
                                        position: relative;
                                        height: 0.2rem;
                                        line-height: 0.2rem;
                                        padding-left: 0.18rem;
                                        color: #fff;
                                        font-size: 0.12rem;
                                        text-shadow: 0 1px 1px rgba(0,0,0,.7);
                                      &:before{
                                            content: "";
                                            position: absolute;
                                            top: 0.04rem;
                                            left: 0;
                                            width: 0.15rem;
                                            height: 0.13rem;
                                            background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                                            background-position: -0.18rem -0.26rem;
                                            -moz-background-size: 0.56rem 0.55rem;
                                            background-size: 0.56rem 0.55rem;
                                      }
                                    }
                                }
                            }
                            .title {
                                margin-top: 0.03rem;
                                width: 100%;
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
                            }
                        }
                        .title {
                            display: block;
                            color: #616161;
                            font-size: 0.13rem;
                        }
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
                            background-size: 100%;
                            &:before {
                                -moz-background-size: 0.56rem 0.55rem;
                                -o-background-size: 0.56rem 0.55rem;
                                background-size: 0.56rem 0.55rem;
                                background-position: 0 0;
                                content: "";
                                display: block;
                                position: absolute;
                                right: 0.08rem;
                                bottom: 0.08rem;
                                height: 0.24rem;
                                width: 0.24rem;
                                background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                            }
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