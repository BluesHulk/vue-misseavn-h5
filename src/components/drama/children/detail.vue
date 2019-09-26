<template>
  <div id="detail"  >
      <div v-show="!isShowAll">
       <div class="Wall drama-wall">
              <div class="wall-body">
                 <span class="drama-title">{{name}}</span>
              </div>
              <div class="wall-warp blur" :style="{backgroundImage: 'url('+cover+')'}"></div>
       </div>
       <div class="drama-avatar" :style="{backgroundImage: 'url('+cover+')'}">
           <span class="view-count">{{view_count}}</span>
       </div>
       <div class="drama-detail complete">
            <p class="detail-author" v-show="author">原创 原作者：{{author}}</p>
            <p class="detail-type">类型：{{type}}</p>
            <p class="detail-type" v-if="integrity == 3">已完结</p>
             <p class="detail-type" v-if="integrity == 1">更新中</p>
       </div>
      <div class="drama-episodes">
          <span class="callout black">
             选集
            <a class="btn-text episode-more" @click="showAll()" >全部</a>
          </span>
          <div class="drama-content">
                <div class="scroll-content">
                    <a class="drama-episode" :href="'/sound/'+item.id" v-for="(item,index) in episodes">
                      <div>{{item.name}}</div>
                    </a>
                </div>
          </div>
      </div>

      <div class="drama-intro fold">
           <span class="callout black">简介</span>
           <div class="intro-content" :class="{isfalg:init}" v-html="abstract">
           </div>
           <button class="btn-text black unfold-btn" @click="isexpend()">展开</button>
           <div class="tags-container" >
                 <span class="intro-tag" v-for="(it,id) in tags">{{it.name}}</span>
           </div>
      </div>
      </div>
        <div class="pop-tit" v-show="isShowAll">
                <div class="sub-header"><span @click="back()">返回</span>五琴录</div>
                <div class="episodes-container">
                    <a class="drama-episode":href="'/sound/'+item.id" v-for="(item,index) in episodes">
                      <div>{{item.name}}</div>
                    </a>
                     <a class="drama-episode":href="'/sound/'+item.id" v-for="(item,index) in episodes">
                      <div>{{item.name}}</div>
                    </a>
                </div>
        </div>
      
   </div>

</template>
<script>
import  iIScroll from 'base/scroll/index.vue'; 
 export default {
    data(){
       return {
          init:false,
          abstract:"",
          tags:[],
          episodes:[],
          author:"",
          integrity:"",
          type:"",
          name:"",
          cover:"",
          view_count:"",
          isShowAll:false
       }
    },
    methods:{
        isexpend(){
            if(!this.init){
              this.init = true
            }else{
              this.init = false
            }
        },
        dramaDetail(id){
            var that = this;
            this.$ajax("dramaDetail",{id:id}).then(function(res){
                  that.abstract = res.data.info.drama.abstract;
                  that.type = res.data.info.drama.type;
                  that.author = res.data.info.drama.author;
                  that.tags =  res.data.info.drama.tags;
                  that.integrity =  res.data.info.drama.integrity;
                  that.name =  res.data.info.drama.name;
                  that.cover =  res.data.info.drama.cover;
                  that.episodes =  res.data.info.episodes.episode;
                  that.view_count = res.data.info.view_count
            })
        },
        showAll(){
            this.isShowAll = true;
        },
        back(){
           this.isShowAll = false;  
        }
    },
    created(){
         let id = this.$route.params.id;
         this.dramaDetail(id)
    },
    components:{
        iIScroll,
    },
 }
</script>
<style lang="scss">
  #detail{
      position: relative;
      overflow-y:auto;
      height: 100%;
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
              background-size: 100% 100%;
              display: block;
              position: absolute;
              &.blur {
                  -webkit-filter: blur(20px);
                  filter: blur(20px);
              }
          }
          &.drama-wall {
              height: 216px;
              background-color: rgba(0,0,0,.5);
              .wall-body {
                  padding: 22px 10px;
                  display: block;
                  .drama-title {
                      display: block;
                      position: relative;
                      font-size: 16px;
                      width: 100%;
                      height: 42px;
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
                      line-height: 21px;
                      text-align: center;
                      color: #fff;
                  }
              }
          }
      }
      .drama-avatar {
          display: block;
          position: absolute;
          height: 184px;
          width: 184px;
          border: 2px solid #fff;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          top: 64px;
          left: -webkit-calc(50vw - 92px);
          left: -moz-calc(50vw - 92px);
          left: calc(50vw - 92px);
          background-position: 50%;
          background-repeat: no-repeat;
          -moz-background-size: cover;
          background-size: cover;
          z-index: 0;
          .view-count {
              display: block;
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 38px;
              font-size: 12px;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
              color: #fff;
              padding: 20px 10px 20px 30px;
              background-image: -webkit-gradient(linear,left top,left bottom,from(transparent),color-stop(55%,rgba(0,0,0,.2)),color-stop(55%,rgba(0,0,0,.28)));
              background-image: -webkit-linear-gradient(top,transparent,rgba(0,0,0,.2) 55%,rgba(0,0,0,.28));
              background-image: -moz-linear-gradient(top,transparent,rgba(0,0,0,.2) 55%,rgba(0,0,0,.28));
              background-image: -o-linear-gradient(top,transparent,rgba(0,0,0,.2) 55%,rgba(0,0,0,.28));
              background-image: linear-gradient(-180deg,transparent,rgba(0,0,0,.2) 55%,rgba(0,0,0,.28));
              &:before {
                  content: "";
                  display: block;
                  position: absolute;
                  left: 10px;
                  top: 20px;
                  height: 11px;
                  width: 14px;
                  background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons@2x.960cf225.png);
                  background-position: -153px -33px;
                  -moz-background-size: 168px 135px;
                  background-size: 168px 135px;
              }
              &:after {
                  content: "";
                  display: block;
                  position: absolute;
                  bottom: 0;
                  width: 92px;
                  left: 46px;
                  z-index: -1;
                  -webkit-box-shadow: 0 0 6px rgba(0,0,0,.8);
                  -moz-box-shadow: 0 0 6px rgba(0,0,0,.8);
                  box-shadow: 0 0 6px rgba(0,0,0,.8);
              }
          }
      }
      .drama-detail {
          display: block;
          position: relative;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          height: 100%;
          text-align: center;
          margin-top: 46px;
          color: #757575;
          font-size: 12px;
          p{
             margin-bottom: 4px;
          }
      }
      .drama-intro{
          display: block;
          position: relative;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: 10px 18px;
          &.fold .intro-content {
                width: 100%;
                height: 54px;
                word-break: break-all;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -moz-box;
                -moz-box-orient: vertical;
                -moz-line-clamp: 3;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                box-orient: vertical;
                line-clamp: 3;
                line-height: 18px;
                margin-bottom: 5px;
                display: block;
                position: relative;
                font-size: 14px;
                margin-bottom: 10px;
                color: #616161;
                white-space: pre-line;
          }
          .unfold-btn {
              display: block;
              position: relative;
              width: 100%;
              text-align: center;
              background-color: transparent;
              margin: 0;
              margin-bottom: 10px;
              color: #9e9e9e;
              border: none;
              font-size: 14px;
              &:after{
                    content: "";
                  height: 4px;
                  width: 7px;
                  top: 7px;
                  left: -webkit-calc(50% + 14px);
                  left: -moz-calc(50% + 14px);
                  left: calc(50% + 14px);
                  display: block;
                  position: absolute;
                  background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons@2x.960cf225.png);
                  background-position: -153px -111px;
                  -moz-background-size: 168px 135px;
                  background-size: 168px 135px;
              }
          }
          .tags-container {
              display: block;
              position: relative;
              .intro-tag {
                  display: inline-block;
                  position: relative;
                  height: 26px;
                  -webkit-box-sizing: border-box;
                  -moz-box-sizing: border-box;
                  box-sizing: border-box;
                  font-size: 12px;
                  line-height: 16px;
                  background-color: #fff;
                  -webkit-border-radius: 100px;
                  -moz-border-radius: 100px;
                  border-radius: 100px;
                  border: 1px solid #e0e0e0;
                  color: #616161;
                  padding: 4px 10px;
                  margin-right: 10px;
              }
          }
      }
      .drama-episodes {
          display: block;
          position: relative;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: 10px 18px;
          .episode-more {
              display: block;
              position: absolute;
              font-size: 12px;
              color: #757575;
              top: 0;
              right: 0;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
              padding-right: 10px;
          }
          .drama-content {
              display: block;
              position: relative;
              overflow-x: auto;
              height: 56px;
              width: -webkit-calc(100vw - 36px);
              width: -moz-calc(100vw - 36px);
              width: calc(100vw - 36px);
              .scroll-content {
                  display: -webkit-box;
                  display: -webkit-flex;
                  display: -moz-box;
                  display: -ms-flexbox;
                  display: flex;
                  position: relative;
                  height: 56px;
                  white-space: nowrap;
                  .drama-episode {
                      display: -webkit-box;
                      display: -webkit-flex;
                      display: -moz-box;
                      display: -ms-flexbox;
                      display: flex;
                      -webkit-box-align: center;
                      -webkit-align-items: center;
                      -moz-box-align: center;
                      -ms-flex-align: center;
                      align-items: center;
                      -webkit-box-flex: 0;
                      -webkit-flex: 0 0 auto;
                      -moz-box-flex: 0;
                      -ms-flex: 0 0 auto;
                      flex: 0 0 auto;
                      position: relative;
                      background-color: #fff;
                      border: 1px solid #e0e0e0;
                      color: #616161;
                      font-size: 13px;
                      -webkit-box-sizing: border-box;
                      -moz-box-sizing: border-box;
                      box-sizing: border-box;
                      height: 56px;
                      width: 106px;
                      padding: 6px;
                      -webkit-border-radius: 4px;
                      -moz-border-radius: 4px;
                      border-radius: 4px;
                      margin-left: 10px;
                      &:first-child {
                          margin-left: 0;
                      }
                      div {
                          display: block;
                          position: relative;
                          width: 100%;
                          white-space: nowrap;
                          word-wrap: break-word;
                          word-break: break-all;
                          -o-text-overflow: ellipsis;
                          text-overflow: ellipsis;
                          overflow: hidden;
                          text-align: center;
                      }
                  }
              }
          }
      }
      .callout {
          display: block;
          position: relative;
          margin: 10px 0;
          padding-left: 10px;
          font-size: 15px;
          &:before {
              content: "";
              display: block;
              position: absolute;
              left: 0;
              top: 8%;
              height: 80%;
              background-color: #000;
              width: 4px;
              -webkit-border-radius: 4px;
              -moz-border-radius: 4px;
              border-radius: 4px;
          }
           .btn-text{
               
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
                border: none;
                &:after {
                    content: "";
                    display: block;
                    position: absolute;
                    right: 0;
                    top: 2px;
                    height: 6px;
                    width: 6px;
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    transform: rotate(45deg);
                    border-right: 1px solid #757575;
                    border-top: 1px solid #757575;
                }
            }
      }
      .isfalg{
          height:auto !important;
      }
      .pop-tit{
          position:absolute;
          left:0;
          top:0;
          width:100%;
          height:calc(100vh - 0.4rem);
          .sub-header {
                display: block;
                width: 100%;
                line-height: 0.4rem;
                background-color: #fff;
                color: #000;
                text-align: center;
                font-size: 0.16rem;
                border-bottom: 1px solid #e0e0e0;
                span{
                    position:absolute;
                    right:0.1rem;
                    width:0.4rem;
                    height:0.4rem;
                }
          }
          .episodes-container{
                -webkit-flex-wrap: wrap;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                display: -webkit-box;
                display: -webkit-flex;
                display: -moz-box;
                display: -ms-flexbox;
                display: flex;
                .drama-episode {
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -moz-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    -moz-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    position: relative;
                    background-color: #fff;
                    border: 1px solid #e0e0e0;
                    color: #616161;
                    font-size: 0.13rem;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    height: 0.56rem;
                    width: -webkit-calc(50vw - 0.15rem);
                    width: -moz-calc(50vw - 0.15rem);
                    width: calc(50vw - 0.15rem);
                    padding: 0.06rem;
                    -webkit-border-radius: 0.04rem;
                    -moz-border-radius: 0.04rem;
                    border-radius: 0.04rem;
                    margin: 0.05rem 0.1rem;
                    div {
                        display: block;
                        position: relative;
                        width: 100%;
                        white-space: nowrap;
                        word-wrap: break-word;
                        word-break: break-all;
                        -o-text-overflow: ellipsis;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        text-align: center;
                        span{
                            height: 0.4rem;
                            position: absolute;
                            right: 0.1rem;
                            width: 0.4rem;
                        }
                    }
                    &:first-child{
                        margin-top: 0.1rem;
                    }
                    &:nth-child(2) {
                        margin-top: 0.1rem;
                    }
                    &:nth-child(odd) {
                        margin-right: 0.05rem;
                    }
                    &:nth-child(2) {
                        margin-top: 0.1rem;
                    }
                    &:nth-child(2n) {
                        margin-left: 0.05rem;
                    }
                   
                }
          }
      }
  }
</style>