<template>
    <header id="header">
       <div class="content">
            <a alt="MissEvan"  v-if="searchState" href="/">
                <i class="logo"></i>
            </a>
      
            <div class="actions">
                <span class="search-input"  v-if="!searchState"  >
                    <span></span>
                    <input type="search" v-model="searchText" @keyup.13="initFind">
                </span>
                <span  v-if="!searchState" @click="cancleBack()" class="btn-text">取消</span>
                <a href="/search"  v-if="searchState" >
                   <i class="search"></i>
                </a>
                <i class="menu" @click="show = !show"></i>
            </div>
        </div>
        <transition name="slide-fade">
        <div v-if="!show" id="UserBar" class="active">
            <a href="http://www.missevan.com/3527419" class="row user">
                <div class="avatar" style="background-image: url(&quot;//static.missevan.com/avatars/icon01.png&quot;);"></div>
                <div class="details">
                <span class="username">Yolo_is</span>
                <span class="info"> 小鱼干:  50 </span>
                </div>
            </a>
            <a class="row icon home" href="/">M-主站</a>
            <a class="row icon news" href="//news.missevan.com" target="_blank">M-新闻</a>
            <a class="row icon audio" href="https://fm.missevan.com" target="_blank">M-直播</a>
            <a class="row center" href="/exam">答题升级</a>
            <span class="row center last">退出登录</span>
        </div> 
        </transition>
    </header>
</template>
<script>
   import {
    mapState
  } from 'vuex';
  export default{
      data(){
          return{
              show: true,
              objectId:"",
              objectType:"",
              searchText:""
          }
      },
      computed: {
        ...mapState([
            'searchState',
            'falgkey',
            'searchtList'
        ])
      },
      watch: {
      '$route' (to, from) {
          if (to.name == "search") {
             this.$store.dispatch('searchState', false);
          }else{
             this.$store.dispatch('searchState', true); 
          } 
          this.searchText = to.query.s
       }
     },
     methods:{
        initFind() {
             if(this.searchText == ""){

             }else{
               this.$router.replace('/search?s='+this.searchText+'&t=sound');
               this.$store.dispatch('isInit', true); 
              
             }
              this.$store.dispatch('keyDown', this.searchText); 
            // this.requestFindList();
        },
        requestFindList(){
            const that = this ;
            this.$ajax('searchList', {
                "s":that.searchText,
                "kind":3,
                "pagesize":10,
                "p":1,
            }).then(function(res){
                // that.resultList = res.data.info;
               // that.$store.dispatch('searchtList', res.data.info);
            })
        },
        cancleBack(){
  
             if(this.$route.fullPath == "/search"){
                this.$router.go(-1)
                //this.$router.replace('/recommend')
             }else{
                 this.$router.replace('/search');
                 this.$store.dispatch('isInit', false); 
             }
           //  console.log(this.$route.fullPath)
        }
     }
  }
</script>
<style lang="scss">
@import "../../common/style/variable";
    #header{
         width:100%;
         height:0.4rem;
         line-height:0.4rem;
         color: $color-text-l;
         .content{
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
            padding: 0.1rem;
            line-height: 0.2rem;
            background-color: #000;
            position: relative;
            height: 0.4rem;
            top: 0;
            left: 0;
            right: 0;
            a{
              .logo{
                width: 1.09rem;
                height: 0.2rem;
                margin: 0;
                background-image: url(../../common/image/missevan.png);
                display: inline-block;
                background-position: 50%;
                background-repeat: no-repeat;
                -moz-background-size: 100%;
                background-size: 100%;
              }
            }
            .actions{
                width: 100%;
                display: -webkit-box;
                display: -webkit-flex;
                display: -moz-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: end;
                -webkit-justify-content: flex-end;
                -moz-box-pack: end;
                -ms-flex-pack: end;
                justify-content: flex-end;
                -webkit-box-align: center;
                -webkit-align-items: center;
                -moz-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                 .btn-text {
                    color: #fff;
                    margin: 0 15px;
                    -webkit-box-flex: 0;
                    -webkit-flex: 0 1 auto;
                    -moz-box-flex: 0;
                    -ms-flex: 0 1 auto;
                    flex: 0 1 auto;
                 }
                 a i.search{
                    width: 0.22rem;
                    height: 0.2rem;
                    background-image: url(../../common/image/sprite-icons@2x.png);
                    -moz-background-size: 151px 129px;
                    background-size: 151px 129px;
                    background-position: -93px -20px;
                    display: inline-block;
                    background-repeat: no-repeat;
                    -moz-background-size: 100%;
                 }
                 i.menu {
                    margin: 0;
                    background-position: -93px -42px;
                    -webkit-box-flex: 0;
                    -webkit-flex: 0 1 auto;
                    -moz-box-flex: 0;
                    -ms-flex: 0 1 auto;
                    flex: 0 1 auto;
                    width: 0.22rem;
                    height: 0.2rem;
                    background-image: url(../../common/image/sprite-icons@2x.png);
                    -moz-background-size: 151px 129px;
                    background-size: 151px 129px;
                    display: inline-block;
                    background-repeat: no-repeat;
                }
            }
            
         }
         a{
             height:0.2rem;
         }
         i{
             margin: 0 0.2rem;
         }
         .search-input {
            -webkit-box-flex: 1;
            -webkit-flex: 1 1 auto;
            -moz-box-flex: 1;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            span{
                display: block;
                position: absolute;
                top: 0.15rem;
                left: 0.15rem;
                width: 0.14rem;
                height: 0.14rem;
                background-image: url(../../common/image/sprite-icons@2x.png);
                background-position: -1.22rem -0.83rem;
                -moz-background-size: 1.51rem 1.29rem;
                background-size: 1.51rem 1.29rem;
                opacity: .3;
            }
            input{
                padding-left: 30px;
                margin: 0;
                width: 100%;
                white-space: nowrap;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                overflow: hidden;
                height: 0.3rem;
                background-color: #fff;
                color: #000;
                border: none;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
                padding: 0;
                border-radius: 2px;
                text-indent: 0.3rem;
            }
         }
         #UserBar{
            position: fixed;
            z-index: 100;
            width: 100%;
            height: calc(100% - 0.4rem);
            top: 0.4rem;
            background-color: #000;
             .row{
                 color:#fff;
                 display: block;
                 position: relative;
                 height: 0.38rem;
                 width: 100%;
                 background-color: #3d3d3d;
                 margin-bottom: 1px;
                 box-sizing:border-box;
                &:after{
                        content: "";
                        display: block;
                        position: absolute;
                        top: -webkit-calc((100% - 0.14rem)/2);
                        top: -moz-calc((100% - 0.14rem)/2);
                        top: calc((100% - 0.14rem) / 2);
                        right: 0.1rem;
                        height: 0.14rem;
                        width: 0.08rem;
                        background-image: url(../../common/image/sprite-icons@2x.png);
                        background-position: 0 -1.15rem;
                        -moz-background-size: 1.15rem 1.29rem;
                        background-size: 1.15rem 1.29rem;
                }
                &.center:after {
                    display: none;
                }
                &.center{
                    text-align: center;
                    line-height: 38px;
                    margin-top: 30px;
                }
                &.last{
                    text-align: center;
                    line-height: 38px;
                    margin-top: 0px;
                }
                &.user {
                    height: 1.1rem;
                    padding: 0.2rem 0.3rem;
                    margin-bottom:0.2rem;
                    box-sizing: border-box;
                    .avatar {
                        position: relative;
                        float: left;
                        width: 0.7rem;
                        height:  0.7rem;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        background-position: 50%;
                        background-repeat: no-repeat;
                        -moz-background-size: cover;
                        background-size: cover;
                       &:after {
                            display: block;
                            position: absolute;
                            height: 0.25rem;
                            width: 0.25rem;
                            bottom: 0;
                            right: 0;
                        }
                    }
                    .details {
                            float: left;
                            height: 100%;
                            width: -webkit-calc(100% - 1.5rem);
                            width: -moz-calc(100% - 1.5rem);
                            width: calc(100% - 1.5rem);
                            padding: 10px 20px;
                            display: -webkit-box;
                            display: -webkit-flex;
                            display: -moz-box;
                            display: -ms-flexbox;
                            display: flex;
                            -webkit-box-orient: vertical;
                            -webkit-box-direction: normal;
                            -webkit-flex-direction: column;
                            -moz-box-orient: vertical;
                            -moz-box-direction: normal;
                            -ms-flex-direction: column;
                            flex-direction: column;
                            -webkit-box-pack: center;
                            -webkit-justify-content: center;
                            -moz-box-pack: center;
                            -ms-flex-pack: center;
                            justify-content: center;
                            box-sizing: border-box;
                        .username {
                            font-size: 0.16rem;
                        }
                        .info {
                            font-size: 0.14rem;
                        }
                    }
                }
             }
             .active .row.user .details {
                -webkit-box-pack: justify;
                -webkit-justify-content: space-between;
                -moz-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
            }
         }
    }
    #UserBar .row.icon {
        line-height: 0.38rem;
        font-size: 0.16rem;
        padding: 0 0.1rem;
        padding-left: 0.36rem;
    }
    #UserBar .row.icon:before {
        content: "";
        display: block;
        position: absolute;
        top: 11px;
        left: 10px;
        height: 16px;
        width: 16px;
        background-repeat: no-repeat;
    }
    #UserBar .row.icon.audio:before {
        background: url(//static.missevan.com/assets/m/images/build/sprite-svg.33256674.svg) -22px -2px/40px 20px;
    }
    #UserBar .row.icon.news:before {
        background: url(//static.missevan.com/assets/m/images/build/sprite-svg.33256674.svg) -2px -2px/40px 20px;
    }
    #UserBar .row.icon.home:before {
        background: url(//static.missevan.com/assets/m/images/build/sprite-svg.33256674.svg) -22px -2px/40px 20px;
    }
    .slide-fade-enter-active {
      transition: all .5s ease;
    }
    .slide-fade-leave-active {
      transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
       transform: translate3d(100%,0,0);
       opacity: 0;
    }

  
</style>