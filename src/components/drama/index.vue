<template>
  <div id="drama">
    <iIScroll :data="resortList" ref = "scroll" class="recommend-content" >
        <div class="sub-header">{{title}}</div>
       <div class="button-row">
         <a class="btn time-list-btn" href="/radio/timeline">更新时间</a>
         <a class="btn filter-btn" href="/radio/filter">分类筛选</a>
       </div>

       <div class="Panel" v-for="(item,index) in newList">
         <div class="panel-head">
           <div class="panel-title" v-if="item == 'last'">新作速递</div>
           <div class="panel-title" v-else-if="item == 'recommend'">小编推荐</div>
           <div class="panel-title" v-else-if="item == 'classic'">经典作品</div>
         </div>
         <div class="panel-body">
           <a class="Thumbnail drama" v-for="(itm,idx) in resortList[item]"  :href="'/radio/detail/'+itm.id">
              <div class="cover" :style="{backgroundImage: 'url('+'//static.missevan.com/dramacoversmini/'+itm.cover+')'}">
              </div>
              <div class="name">{{itm.name}}</div>
              <div class="update-detail">
                <span class="status">更新至</span>
                <span class="episode">{{itm.newest}}</span>
              </div>
           </a>
          </div>
        </div>
      </iIScroll>
   </div>

</template>
<script>
 import  iIScroll from 'base/scroll/index.vue'; 
 export default {
    data(){
       return {
          newTab:{},
          keyId:[],
          title:"",
          newList:[],
          catalogmenuTwo:[],
          catalogrank:[],
          resortList:{}
       }
    },
    methods:{
      dramaList(){
        var that = this ;
        this.$ajax("dramaList").then(function(res){
          let keyArr =  res.data.info.sort;
          that.newList = keyArr;
          // for(var i = 0; i< keyArr.length; i++){
          //              console.log(res.data.info[keyArr[i]])
          //         that.resortList[keyArr[i]]= res.data.info[keyArr[i]]
          // }
          that.resortList = res.data.info ;
          console.log( that.resortList)
        })
      },
      catalogsList(){
         var that = this ;
          this.$ajax('catalogsList').then(function(res){
             let arr = res.data.info;
             let id = that.$route.params.id;
             that.title =  arr[id].catalog_name
             console.log(id)
          })
       },
 
    
    },
    components:{
        iIScroll,
    },
    created(){
      this.dramaList();
      this.catalogsList()
    },

 }
</script>
<style lang="scss">
  #drama{
    height:calc(100vh - 0.4rem);
    .sub-header {
        display: block;
        line-height: 0.4rem;
        background-color: #fff;
        color: #000;
        text-align: center;
        font-size: 0.16rem;
        border-bottom: 1px solid #e0e0e0;
    }
    .button-row {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        -moz-box-orient: horizontal;
        -moz-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-justify-content: space-around;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        position: relative;
        height: 0.7rem;
        padding: 0.2rem 0 0.1rem;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        .btn{
            width: 1.72rem;
            height: 0.4rem;
            line-height: 0.38rem;
            background-color: #fff;
            font-size: 0.14rem;
            font-weight: 700;
            margin: 0;
            padding: 0;
            color: #000;
            padding-left: 0.3rem;
            display: inline-block;
            position: relative;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border: 1px solid transparent;
            -webkit-border-radius: 0.03rem;
            -moz-border-radius: 0.03rem;
            border-radius: 0.03rem;
            margin: 0.03rem;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-transition: color .2s ease,background-color .2s ease,background .2s ease,border-color .2s ease;
            -o-transition: color .2s ease,background-color .2s ease,background .2s ease,border-color .2s ease;
            -moz-transition: color .2s ease,background-color .2s ease,background .2s ease,border-color .2s ease;
            transition: color .2s ease,background-color .2s ease,background .2s ease,border-color .2s ease;
            &:before {
              content: "";
              display: block;
              position: absolute;
              height: 0.35rem;
              width: 0.35rem;
              left: 0.32rem;
              background-position: 50%;
              background-repeat: no-repeat;
              -moz-background-size: 100%;
              -o-background-size: 100%;
              background-size: 100%;
           }
           &.time-list-btn:before {
                -moz-background-size: 1.68rem 1.35rem;
                -o-background-size: 1.68rem 1.35rem;
                background-size: 1.68rem 1.35rem;
                background-position: -0.65rem 0;
                top: 1px;
                background-image: url(../../common/image/sprite-icons@2x.png);
           }
           &.filter-btn:before {
                -moz-background-size: 1.68rem 1.35rem;
                -o-background-size: 1.68rem 1.35rem;
                background-size: 1.68rem 1.35rem;
                background-position: 0 -0.6rem;
                background-image: url(../../common/image/sprite-icons@2x.png);
           }


        }
    }
    .Panel {
        display: block;
        position: relative;
        width: 100%;
        background-color: #fff;
        padding-bottom: 16px;
        margin: 10px auto;
        border: 1px solid #eee;
        border-left: none;
        border-right: none;
        background-color: transparent;
        border: none;
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
            }
        }
        .Thumbnail {
            display: inline-block;
            margin: 0.05rem;
            padding: 0;
            .cover {
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
            &.drama {
                height: 1.7rem;
                width: 1.1rem;
                margin: 0.05rem 0.02rem;
                .cover {
                    height: 1.1rem;
                    width: 1.1rem;
                    background-position: 50%;
                    background-repeat: no-repeat;
                    -moz-background-size: 100%;
                    -o-background-size: 100%;
                    background-size: 100%;
                }
                .name {
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
                    max-height: 0.4rem;
                    height: auto;
                    font-size: 0.13rem;
                    color: #000;
                }
                .update-detail {
                    font-size: 0.11rem;
                    color: #9e9e9e;
                    .status {
                        float: left;
                    }
                    .episode {
                        color: #616161;
                        margin-left: 0.1rem;
                        width: 0.6rem;
                        white-space: nowrap;
                        -o-text-overflow: ellipsis;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        float: left;
                    }
                }
            }
        }
        .panel-body {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -webkit-flex-direction: row;
            -moz-box-orient: horizontal;
            -moz-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
            -webkit-justify-content: space-around;
            -ms-flex-pack: distribute;
            justify-content: space-around;
             margin: 0 0.14rem;
        }
    }
  }
</style>