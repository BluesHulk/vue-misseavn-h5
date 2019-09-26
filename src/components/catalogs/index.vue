<template>
  <div id="catalogs">
     <div class="sub-header">{{title}}</div>
        <div class="sub-nav" ref="subScroll">
            
                <ul class="sub-catalogs" ref="tabcontent">
                    <li class="li-cat" v-for="(val,item,key) in newTab"  @click="tabclick(key,$event)" :data-index="key" :class="{active:key == currentIndex}">
                        <a href="javascript:;" :data-index="key" >{{ val.catalog_name}}</a>
                    </li>
                </ul>
         </div>
    <iIScroll   ref = "listview"   
        @scroll="scroll" 
        :listen-scroll="listenScroll"
        :probe-type="probeType" class="recommend-content">
        <div >
            <div class="Panel trans" ref="listGroup"  v-for="(val,item,key) in newTab">
                    <div class="panel-head">
                    <div class="panel-title">
                        <div class="callout">{{ val.catalog_name}}</div>
                    </div>
                    </div>
                    <div class="panel-body">
                        <div class="SoundList">
                        <div class="Thumbnail list-sound large" v-for="(value,its) in val.result">
                            <div class="cover">
                            <img class="cover-img" :src="value.front_cover">
                            </div>
                            <a class="detail" :href="'/sound/'+value.id">
                                <div class="title">{{value.soundstr}}</div>
                                <div class="username">UP主：{{value.username}}</div>
                                <div class="statistics">
                                <div class="item play-times">{{value.view_count}}</div>
                                <div class="item duration">{{format(value.duration)}}</div>
                                </div>
                            </a>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    </iIScroll>
   </div>
</template>
<script>
 import  iIScroll from 'base/scroll/index.vue';
 import {getData} from 'common/js/dom';
  const TITLE_HEIGHT = 30;
 export default {
    data(){
       return {
          newTab:{},
          keyId:[],
          catalogmenu:[],
          catalogmenuTwo:[],
          catalogrank:[],
          currentIndex: 0,
          scrollY:-1,
          diff:-1,
          isEnd:false,
          title:""
       }
    },
    watch:{
       '$route' (to, from) {
         console.log()
        },
        'newTab'(val){
            setTimeout(() => {
              this._calculateHeight()
            }, 20)
        },
    
        scrollY(newY){
            const listHeight = this.listHeight
            // 当滚动到顶部，newY>0
            if (newY > 0) {
              this.currentIndex = 0
              return
            }
            // 在中间部分滚动
            for (let i = 0; i < listHeight.length - 1; i++) {
              let height1 = listHeight[i];
              let height2 = listHeight[i + 1];
              if (-newY >= height1 && -newY < height2) {
                this.currentIndex = i
                this.diff = height2 + newY
                return
              }
            }
            // 当滚动到底部，且-newY大于最后一个元素的上限
            this.currentIndex = listHeight.length - 2
        },
    },
    props:[''],
    components:{
       iIScroll,
    },
    methods:{
       catalogsList(){
         var that = this ;
         let first = {
                      "0":{
                        id: "1", 
                        parent_id: "46",
                        catalog_name: "全部动态",
                        catalog_name_second: "", 
                      }
             }
          this.$ajax('catalogsList').then(function(res){
             let arr = res.data.info;
             let id = that.$route.params.id;
              for (var key in arr){
                  if(key == id){
                       that.newTab =  Object.assign(arr[key].son,first)
                       that.keyId = Object.keys(arr[key].son)
                  }
              }
              that.title =  arr[id].catalog_name
              that.catalogrankList()
              that.keyId.slice(1,that.keyId.length).forEach(function(value,i){
                  that.catalogmenuList(value)
              })
          })
       },
       catalogrankList(){
         let id = this.$route.params.id;
         var that = this;
          this.$ajax('catalogrank',{
            cid:id
          }).then(function(res){
            that.catalogrank = res.data.info;
            // that.newTab[0].result = res.data.info;
            that.$set(that.newTab[0],"result",res.data.info)
          })
       },
       catalogmenuList(id){
         var that = this;
          this.$ajax('catalogmenu',{
            cid:id,
            order:3,
            page_size:4,
          }).then(function(res){
            that.$set(that.newTab[id],"result",res.data.info.Datas)
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
        const minute = interval / 60 / 1000 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
       },
       getJsonLength(json){
        var jsonLength = 0;
            for(var item in json){
             jsonLength++;
            }
            return jsonLength;
       },
       tabclick(key,e){
            this.currentIndex = key;
            let anchorIndex = getData(e.target, 'index');
            this._scrollTo(anchorIndex)
       },
       scroll(pos){
          
         this.scrollY = pos.y;
         let liList = this.$refs.tabcontent.children;
         let width = 0;
          for(let i = 0; i<this.currentIndex+1; i++){
            
              width+=liList[i].clientWidth;
            //    console.log(width  )
          
             console.log(this.$refs.subScroll.offsetLeft)
              if(width>=document.body.clientWidth){
                   console.log(this.$refs.tabcontent)
                 this.$refs.tabcontent.style.right = liList[i].clientWidth + "px"
              }
          }
          console.log(pos)
       },
       _scrollTo(index){
        if(!index && index !==0){
           return
        }
        if(index<0){
          index =0;
        }else if(index>this.listHeight.length-2){
          index = this.listHeight-2;
        }
        this.scrollY = -this.listHeight[index];
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
       },
       _calculateHeight(){
            this.listHeight = [];
            let list = this.$refs.listGroup;
            let height = 0;
            this.listHeight.push(height);
            for(let i = 0; i<list.length; i++){
                height+=list[i].clientHeight;
                this.listHeight.push(height)
            }
       },
       onShortcutTouchStart(e) {
        let firstTouch = e.touches[0];
        this.touch.x1 = firstTouch.pageX;
        // this.isEnd = false ;
      },
       onShortcutTouchMove(e){
          let firstTouch = e.touches[0];
          this.touch.x2 = firstTouch.pageX;
          let delate =  -(this.touch.x1 - this.touch.x2) | 0 ;
          let init;
          
          if(this.isEnd){
              init = Number(this.$refs.tabcontent.style.left.split("px")[0]);
          }
          if(init){
              this.$refs.tabcontent.style.left = init + delate + "px"
          }else{
              this.$refs.tabcontent.style.left = delate + "px"
          }
            this.isEnd = false ;
       },
       onShortcutTouchEnd(e){
           console.log(e)
          this.isEnd = true ;
       }
      
    },
    created(){
       this.catalogsList();
       this.touch = {};
       this.probeType = 3;
       this.listenScroll = true;
       this.listHeight = [];
    },
    mounted(){
    
    }

 }
</script>
<style lang="scss">
#catalogs{
   display: block;
    min-height: -webkit-calc(100vh - 0.4rem);
    min-height: -moz-calc(100vh - 0.4rem);
    min-height: calc(100vh - 0.4rem);
    max-width: 100vw;
    .sub-header {
        display: block;
        line-height: 40px;
        background-color: #fff;
        color: #000;
        text-align: center;
        font-size: 16px;
        border-bottom: 1px solid #e0e0e0;
        position: relative;
        height: 40px;
        top: 0;
        left: 0;
        right: 0;
    }
    .sub-nav{
         width:100%;
         position:relative;
         height: 35px;
         line-height: 35px;
         overflow-x: hidden;
         background-color: #fff;
         .sub-catalogs {
              height: 35px;
              line-height: 35px;
            //   width: 100%;
              background-color: #fff;
              z-index: 10;
              overflow-x: auto;
              overflow-y: hidden;
              white-space: nowrap;
              -webkit-overflow-scrolling: touch;
              &::-webkit-scrollbar {
                display: none;
              }
              li{
                  display: inline-block;
                  position: relative;
                  height: 100%;
                  margin: 0 10px;
                  &.active:after {
                      content: "";
                      width: 100%;
                      display: block;
                      position: absolute;
                      bottom: 1px;
                      border-bottom: 2px solid transparent;
                      z-index: 1;
                      pointer-events: none;
                      border-color: #000;
                      a{
                        color: #000;
                      }
                  }
                  a {
                      display: block;
                      color: #9e9e9e;
                      font-size: 14px;
                      position: relative;
                      height: -webkit-calc(100% - 2px);
                      height: -moz-calc(100% - 2px);
                      height: calc(100% - 2px);
                      width: 100%;
                  }
              }
         }

    }
   
    .recommend-content{
          width:100vw;
          height: -webkit-calc(100vh - 1.15rem);
          height: -moz-calc(100vh - 1.15rem);
          height: calc(100vh - 1.15rem);
          .Panel {
              min-height: 400px;
              display: block;
              position: relative;
              width: 100%;
              background-color: #fff;
              padding-bottom: 16px;
              margin: 10px auto;
              border: 1px solid #eee;
              border-left: none;
              border-right: none;
              .panel-head {
                  height: 40px;
                  line-height: 40px;
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
                  .panel-title {
                      font-size: 16px;
                      display: inline-block;
                      .callout {
                          display: block;
                          position: relative;
                          margin: 0;
                          padding-left: 10px;
                          &:before {
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
              }
              .panel-body {
                  margin: 0 14px;
                  padding: 0;
                  .Thumbnail {
                      display: inline-block;
                      margin: 5px;
                      padding: 0;
                      .title {
                          display: block;
                          color: #616161;
                          font-size: 13px;
                      }
                      .cover {
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
                          
                      }
                      &.list-sound {
                          display: block;
                          position: relative;
                          height: 70px;
                          line-height: 70px;
                          width: 100%;
                          margin: 0;
                          .cover{
                              overflow: hidden;
                              position: relative;
                              margin: 10px;
                              float: left;
                              height: 70px;
                              width: 70px;
                              border-radius: 4px;
                              .cover-img {
                                  -webkit-border-radius: 4px;
                                  -moz-border-radius: 4px;
                                  border-radius: 4px;
                                  height: 50px;
                                  width: 50px;
                                  display: block;
                                  position: absolute;
                                  z-index: 0;
                              }
                          }
                          .detail {
                              overflow: hidden;
                              position: relative;
                              float: right;
                              padding: 10px 0;
                              height: 100%;
                              width: -webkit-calc(100% - 70px);
                              width: -moz-calc(100% - 70px);
                              width: calc(100% - 70px);
                              color: #424242;
                              .title {
                                  width: 94%;
                                  height: 36px;
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
                                  line-height: 18px;
                                  font-size: 16px;
                              }
                              .username {
                                  width: 86%;
                                  white-space: nowrap;
                                  -o-text-overflow: ellipsis;
                                  text-overflow: ellipsis;
                                  overflow: hidden;
                                  font-size: 12px;
                                  height: 20px;
                                  line-height: 20px;
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
                                      height: 12px;
                                      line-height: 12px;
                                      &:before {
                                          content: "";
                                          display: block;
                                          position: absolute;
                                          left: 2px;
                                          top: 1px;
                                          width: 12px;
                                          height:12px;
                                      }
                                      &.play-times{
                                        &:before {
                                              background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                                              -moz-background-size: 56px 55px;
                                              background-size: 56px 55px;
                                              background-position: -44px -14px;
                                          }
                                      }
                                      &.duration{
                                        &:before {
                                              background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                                              -moz-background-size: 56px 55px;
                                              background-size: 56px 55px;
                                              background-position: -15px -44px;
                                          }
                                      }
                                  }
                              }
                          }
                        &.large {
                            height: 90px;
                            line-height: 90px;
                            .cover{
                              height: 70px;
                              width: 70px;
                                .cover-img {
                                    height: 70px;
                                    width: 70px;
                                }
                            }
                            .detail{
                                width: -webkit-calc(100% - 90px);
                                width: -moz-calc(100% - 90px);
                                width: calc(100% - 90px);
                            }
                        }
                      }
                  }
              }
              &.trans {
                  background-color: transparent;
                  border: none;
                  .panel-head {
                      height: 20px;
                      line-height: 20px;
                      margin: 10px 0;
                  }
              }
          }
    }
}

</style>