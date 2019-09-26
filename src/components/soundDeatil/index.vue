<template>
  <div id="detail">
        <div id="SoundPage">
            <div id="SoundPlayer">
                <div class="cover"  :style="{backgroundImage:'url('+ cover_image +')',display:'block'}">
                    <div class="record-disk">
                      <img :src="front_img">
                    </div>
                </div>
                <div class="danmaku-stage-wrap"><div class="danmaku"></div></div>
                <div class="controller" v-if="pay_type == 0">
                   <div class="btn-icon" :class="playIcon" @click="togglePlaying()"></div>
                </div>
                <div class="progress-bar">
                    <iIprogress v-if="pay_type == 0" :percent="percent" @progressPecent="onProgressChange"></iIprogress>
                </div>
                <div class="sound-time">
                   <span class="played-time">{{format(currentTime)}}</span>
                   <span class="duration">{{format(duration)}}</span>
                </div>
                <div v-if="pay_type == 1" class="pay-cover">
                    <span>本音频为付费内容</span>
                    <span>仅支持客户端收听</span>
                    <button class="btn-red">去 APP 付费</button>
                </div>
            </div>
            <div class="sound-action-container">
               <ul class="sound-action">
                  <li class="share"><i></i><span>分享</span></li>
                  <li class="like"><i></i><span>喜欢</span></li>
                  <li class="download"><i></i><span>下载</span></li>
               </ul>
            </div>
           <iItab :tabList="tabList"   @tab-click="tabClick"  :commentCount="comments_count" :initSelect="tabIndex" ></iItab> 
           <iIntroduction v-if="tabIndex == 0"></iIntroduction>
           <iIcomments v-if="tabIndex == 1"></iIcomments>
           <iImage v-if="tabIndex == 2"></iImage>
        </div>
        <audio v-if="pay_type == 0" ref="audio" :src="'https://static.missevan.com/'+ soundSrc" @canplay="ready"  @ended="end"  @error="error" @timeupdate="updataTime" ></audio>
   </div>
</template>
<script>
  import { mapState } from 'vuex'; 
  import  iIprogress from 'base/progress/progress-bar';
  import  iItab from 'base/tab/tab-sound.vue';
  import iIntroduction from './child/index.vue';
  import iIcomments from './child/comments.vue';
  import iImage from './child/images.vue';
  import  constant from 'common/js/constant';
  export default{
     data(){
        return {
           soundSrc:"",
           front_img:'',
           cover_image:'',
           songReady:false,
           currentTime:0,
           pay_type:"",
           percent:0,
           duration:0,
           tabList:constant.soundTab,
           id:"",
           tabIndex: 0,
           soundId:"",
           comments_count:''
        }
     },
     computed:{
        ...mapState([
          'playing'
        ]),
       playIcon(){
          return this.playing ? 'btn-pause' : 'btn-play'
       },
     },
     created(){
        const id = this.$route.params.soundId
        console.log(this.$route.params)
         this.audioSrc(id);
     },
     watch:{
        '$route' (to, from) {
            console.log(to,from)
         },
         playing(val){
            const audio = this.$refs.audio;
            console.log(audio)
            this.$nextTick(()=>{
              // console.log(val)
              val ? audio.play() : audio.pause();
            })
          
        },
        
     },
     methods:{
       tabClick(tabIndex) {
        this.tabIndex = tabIndex;
       },
       audioSrc(id){  //歌曲地址
           var that = this ;
           this.$ajax('soundDeatil', {
                "soundid":id,
            }).then(function(res){
               that.soundSrc = res.data.info.sound.soundurl_64;
               that.pay_type = res.data.info.sound.pay_type;
               that.front_img = res.data.info.sound.front_cover;
               that.cover_image = '//static.missevan.com/mosaic/'+res.data.info.sound.cover_image;
               that.comments_count = res.data.info.sound.comments_count;
            })
       
      },
      _pad(num, n = 2) {  //格式化时间分钟
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      togglePlaying(){ //播放状态
      console.log("///")
         this.$store.dispatch("setPlayingState",!this.playing)
      },
      ready(){
         this.songReady = true
      },
      end(){
        // if(this.mode === playMode.loop){
        //   this.loop()
        // }else{
        //   this.next()
        // }
      },
      updataTime(e){
         this.currentTime =  e.target.currentTime
      },
      error(){
        this.songReady = true
      },
      loop(){
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play()
      },
      onProgressChange(percent){
         const audio = this.$refs.audio;
         this.$refs.audio.currentTime = this.$refs.audio.duration * percent ;
         
          if(!this.playing){
            this.togglePlaying();
          }
      },
      addEventListeners() {  
        this.$refs.audio.addEventListener('timeupdate', this._currentTime)
        this.$refs.audio.addEventListener('canplay', this._durationTime)  
      },  
      removeEventListeners() {  
        this.$refs.audio.removeEventListener('timeupdate', this._currentTime)  
        this.$refs.audio.removeEventListener('canplay', this._durationTime)  
      },  
      _currentTime() {  
       this.timeNow = parseInt(this.$refs.audio.currentTime)
        // console.log(this.duration,this.timeNow)  
        this.percent =  this.currentTime / this.duration; 
      },  
      _durationTime() {  
        this.duration = parseInt(this.$refs.audio.duration) ;
         console.log(this.duration,this.currentTime) 
         
      },
      init(){
         this.soundId = this.$route.params.soundId 
          if(this.$route.params.tabIndex == "introduction"){
            this.tabIndex = 0;
          }else if(this.$route.params.tabIndex == "discuss"){
             this.tabIndex = 1
          }else if(this.$route.params.tabIndex == "images"){
              this.tabIndex = 2
          }
      }  
     },
     components:{
       iIprogress,
       iItab,
       iIntroduction,
       iImage,
       iIcomments
     },
     mounted(){
      this.addEventListeners();
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
    #SoundPage{
      display: block;
      position: relative;
      height: 100%;
      width: 100%;
      #SoundPlayer{
        position: relative;
        height: 3.25rem;
        .cover{
              display: -webkit-box;
              display: -webkit-flex;
              display: -moz-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: center;
              -webkit-justify-content: center;
              -moz-box-pack: center;
              -ms-flex-pack: center;
              justify-content: center;
              background-repeat: no-repeat;
              background-position: 50%;
              -moz-background-size: cover;
              -o-background-size: cover;
              background-size: cover;
              z-index: 0;
              position: absolute;
              top: 0;
              width: 100%;
              height: 3.25rem;
              overflow: hidden;
              .record-disk {
                  position: absolute;
                  z-index: 1;
                  top: 0.3rem;
                  left: 0;
                  right: 0;
                  height: 2.2rem;
                  text-align: center;
                  overflow: hidden;
                  img {
                      width: 2.2rem;
                      height: 2.2rem;
                      -webkit-border-radius: 50%;
                      -moz-border-radius: 50%;
                      border-radius: 50%;
                      border: 1px solid rgba(0,0,0,.3);
                      overflow: hidden;
                  }
              }
        }
        .controller {
            position: absolute;
            z-index: 99;
            right: 0.1rem;
            bottom: 0.2rem;
            width: 0.48rem;
            height: 0.3rem;
            background-color: hsla(0,0%,84%,.4);
            -webkit-box-shadow: 0 0 5px 0 rgba(0,0,0,.4);
            -moz-box-shadow: 0 0 5px 0 rgba(0,0,0,.4);
            box-shadow: 0 0 5px 0 rgba(0,0,0,.4);
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            cursor: pointer;
            text-align: center;
            -webkit-transition: bottom .5s ease;
            -o-transition: bottom .5s ease;
            -moz-transition: bottom .5s ease;
            transition: bottom .5s ease;
            .btn-icon {
                display: inline-block;
                width: 0.28rem;
                height: 0.28rem;
                margin-top: 1px;
                background-repeat: no-repeat;
                margin-left: 1px;
                -moz-background-size: 1.02rem 0.76rem;
                -o-background-size: 1.02rem 0.76rem;
                background-size: 1.02rem 0.76rem;
                background-image: url(../../common/image/sprite-icons-sound.png);
                &.btn-play {
                    background-position: 0 0;
                   
                }
                &.btn-pause {
                    background-position: -0.3rem 0;
                }
            }
        }
        .progress-bar{
          position: absolute;
          bottom: 6px;
          width: 100%;
          height: 4px;
          padding: 1px 0;
          z-index: 4;
        }
        .sound-time{
          position: absolute;
          bottom: -18px;
          left: 0;
          width: 100%;
          font-size: 9px;
          color: #a6a6a6;
          height: 14px;
          line-height: 12px;
          padding: 1px 5px;
          .duration{
             float:right;
          }
        }
      }
      .sound-action-container {
          -webkit-box-align: center;
          -webkit-align-items: center;
          -moz-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding: 16px 12px 10px;
          border-bottom: 1px solid rgba(0,0,0,.2);
          background-color: #fff;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          .sound-action {
            -webkit-box-flex: 1;
            -webkit-flex-grow: 1;
            -moz-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            -webkit-justify-content: space-around;
            -ms-flex-pack: distribute;
            justify-content: space-around;
            list-style-type: none;
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            li{
              padding: 0 2px;
              text-align: center;
              cursor: pointer;
              i{
                    display: block;
                    width: 0.36rem;
                    height: 0.36rem;
                    padding: 0.08rem;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    background-color: #f5f5f5;
                    &:after{
                        content: "";
                        display: block;
                        height: 100%;
                        background-repeat: no-repeat;
                    }
                 
              }
              &.share{
                   i:after {
                        -moz-background-size: 102px 76px;
                        -o-background-size: 102px 76px;
                        background-size: 102px 76px;
                        background-image: url(../../common/image/sprite-icons-sound.png);
                        background-position: -60px 0;
                   }
              }
              &.like{
                i:after {
                        -moz-background-size: 102px 76px;
                        -o-background-size: 102px 76px;
                        background-size: 102px 76px;
                        background-image: url(../../common/image/sprite-icons-sound.png);
                        background-position: -82px -22px;
                    }
              }
              &.download{
                i:after {
                        -moz-background-size: 102px 76px;
                        -o-background-size: 102px 76px;
                        background-size: 102px 76px;
                        background-image: url(../../common/image/sprite-icons-sound.png);
                        background-position: -22px -56px;
                    }
              }
              span{
                display: block;
                font-size: 10px;
              }
            }
        }
      }
      // .tab{
      //     width:100%;
      //     display: flex;
      //     height: 0.44rem;
      //     line-height: 0.44rem;
      //     font-size: 0.14rem;
      //     background-color:#fff;
      //     .tab-item{
      //         flex: 1;
      //         text-align: center;
      //         .tab-link{
      //             padding-bottom: 5px;
      //             color: #9e9e9e;
      //         }
      //         &.router-link-active{
      //                 .tab-link{
      //                   color:#222;
      //                   border-bottom: 2px solid#222;
      //                 }
      //             }
      //     }
      // }
    }
  }
</style>