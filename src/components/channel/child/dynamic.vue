<template>
  <div id="dynamic">
      <div class="tab-content">
         <div class="SoundList">
             <div class="Thumbnail list-sound" v-for="(item,index) in dynamic">
                <div class="cover">
                    <img class="cover-img" :src="item.front_cover">
                </div>
                <a class="detail" :href="'/sound/'+item.id">
                      <div class="title hot">{{item.soundstr}}</div>
                      <div class="statistics">
                          <div class="item play-times">{{item.view_count}}</div>
                          <div class="item duration">{{format(item.duration)}}</div>
                      </div>
                </a>
             </div>
         </div>      
      </div>
   </div>
</template>
<script>
 export default {
    data(){
       return {

       }
    },
    props:['dynamic'],
    methods:{
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
    },
    created(){

    },

 }
</script>
<style lang="scss">
.tab-content {
    padding: 12px;
    position: relative;
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
            -o-background-size: 100%;
            background-size: 100%;
            .cover-img {
                display: block;
                position: absolute;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                height: 50px;
                width: 50px;
            }
        }
        &.list-sound {
            display: block;
            position: relative;
            height: 70px;
            line-height: 70px;
            width: 100%;
            margin: 0;
            .detail {
                float: right;
                padding: 10px 0;
                height: 100%;
                width: -webkit-calc(100% - 70px);
                width: -moz-calc(100% - 70px);
                width: calc(100% - 70px);
                color: #424242;
                overflow: hidden;
                position: relative;
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
                    font-size: 12px;
                    &.hot {
                        margin-left: 18px;
                        &:before {
                            -moz-background-size: 56px 55px;
                            -o-background-size: 56px 55px;
                            background-size: 56px 55px;
                            background-position: -44px 0;
                            content: "";
                            display: block;
                            position: absolute;
                            top: 13px;
                            left: 0;
                            height: 12px;
                            width: 12px;
                            background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                        }
                    }
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
                            height: 12px;
                            line-height: 12px;
                        }
                        &.play-times{
                          &:before {
                            -moz-background-size: 56px 55px;
                            -o-background-size: 56px 55px;
                            background-size: 56px 55px;
                            background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                            background-position: -44px -14px;
                          }
                        }
                        &.duration{
                          &:before{
                              -moz-background-size: 56px 55px;
                              -o-background-size: 56px 55px;
                              background-size: 56px 55px;
                              background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.f1c29abf.png);
                              background-position: -15px -44px;
                          }
                        }
                    }
                }
            }
            .cover {
                margin: 10px;
                float: left;
                overflow: hidden;
                position: relative;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                height: 50px;
                width: 50px;
            }
        }
    }
}
</style>