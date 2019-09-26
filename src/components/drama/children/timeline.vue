<template>
  <div id="timeline">
    <div class="sub-header">剧集更新表</div>
    <iIScroll ref = "scroll" class="recommend-content" :data="updataInit">
        <div id="timeList">
            <div class="time-panel" v-for="(item,index) in updataInit">
              <div class="panel-title">{{item.time}} <span class="date">{{item.alias}}</span></div>
              <div class="panel-content">
                      <a class="drama-box" v-for="(itm,idx) in item.dramas" :href="'/radio/detail/'+itm.id">
                          <span class="avatar" :style="{backgroundImage: 'url(//static.missevan.com/dramacoversmini/'+itm.cover+')'}"></span>
                          <div class="drama-detail">
                                <p class="drama-title">{{itm.name}}</p>
                                <p class="drama-type">{{itm.type_name}}</p>
                                <p class="drama-update">{{itm.newest}}</p>
                          </div>
                      </a>
                    
                </div>
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
          updataInit:[]
       }
    },
    methods:{
        updataList(){
          var that = this ;
           this.$ajax("updataTimeList").then(function(res){
               let lastupdate = res.data.info.lastupdate
                let temp ={
                   alias:"",
                   time:"最近",
                   dramas:lastupdate
                }
                let result = res.data.info.recent
                result.unshift(temp);
                that.updataInit = result
                console.log(  that.updataInit)
           })
        }
    },
    created(){
       this.updataList()
    },
    components:{
      iIScroll,
   }
 }
</script>
<style lang="scss">
  #timeline{
     display: block;
     position: relative;
     height: 100%;
     width: 100%;
     .sub-header {
          display: block;
          line-height: 0.4rem;
          background-color: #fff;
          color: #000;
          text-align: center;
          font-size: 0.16rem;
          border-bottom: 1px solid #e0e0e0;
      }
      .recommend-content{
        height:calc(100vh - 0.81rem);
        width:100%;
      }
      #timeList{
        padding: 0.1rem;
         .time-panel{
              display: block;
              position: relative;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
              padding: 0.1rem;
              &:before {
                  content: "";
                  display: block;
                  position: absolute;
                  top: 24px;
                  bottom: 6px;
                  left: 11px;
                  width: 2px;
                  background-color: #e0e0e0;
              }
              .panel-title {
                  font-size: 13px;
                  padding-left: 16px;
                  display: block;
                  position: relative;
                  -webkit-box-sizing: border-box;
                  -moz-box-sizing: border-box;
                  box-sizing: border-box;
                  &:before {
                      content: "";
                      display: block;
                      position: absolute;
                      left: 0;
                      top: 7px;
                      height: 4px;
                      width: 4px;
                      -webkit-border-radius: 50%;
                      -moz-border-radius: 50%;
                      border-radius: 50%;
                      background-color: #000;
                  }
                  .date {
                      margin-left: 20px;
                      color: #9e9e9e;
                  }
              }
              .panel-content {
                  padding: 10px;
                  padding-left: 16px;
                  display: block;
                  position: relative;
                  -webkit-box-sizing: border-box;
                  -moz-box-sizing: border-box;
                  box-sizing: border-box;
                  .drama-box {
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
                      -webkit-box-align: center;
                      -webkit-align-items: center;
                      -moz-box-align: center;
                      -ms-flex-align: center;
                      align-items: center;
                      position: relative;
                      -webkit-box-sizing: border-box;
                      -moz-box-sizing: border-box;
                      box-sizing: border-box;
                      width: 100%;
                      background-color: #fff;
                      -webkit-border-radius: 3px;
                      -moz-border-radius: 3px;
                      border-radius: 3px;
                      border: 1px solid #eee;
                      padding: 5px;
                      height: 70px;
                      color: #000;
                      margin-bottom: 10px;
                      .avatar {
                          display: block;
                          position: relative;
                          height: 60px;
                          width: 60px;
                          background-position: 50%;
                          background-repeat: no-repeat;
                          -moz-background-size: 100%;
                          background-size: 100%;
                          -webkit-border-radius: 3px;
                          -moz-border-radius: 3px;
                          border-radius: 3px;
                      }
                      .drama-detail {
                          display: block;
                          position: relative;
                          width: -webkit-calc(100% - 80px);
                          width: -moz-calc(100% - 80px);
                          width: calc(100% - 80px);
                          .drama-title {
                              font-size: 15px;
                              width: 100%;
                              white-space: nowrap;
                              -o-text-overflow: ellipsis;
                              text-overflow: ellipsis;
                              overflow: hidden;
                              margin-bottom: 2px;
                              display: block;
                              position: relative;
                          }
                          .drama-type {
                              padding-left: 14px;
                              -webkit-box-sizing: border-box;
                              -moz-box-sizing: border-box;
                              box-sizing: border-box;
                              font-size: 12px;
                              color: #616161;
                              margin-bottom: 2px;
                              display: block;
                              position: relative;
                              &:before {
                                  content: "";
                                  display: block;
                                  position: absolute;
                                  height: 11px;
                                  width: 9px;
                                  left: 1px;
                                  top: 1px;
                                  background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons@2x.960cf225.png);
                                  background-position: -153px -89px;
                                  -moz-background-size: 168px 135px;
                                  background-size: 168px 135px;
                              }
                          }
                          .drama-update {
                                font-size: 12px;
                                color: #616161;
                                display: block;
                                margin-bottom: 0;
                                position: relative;
                              .episode {
                                    color: #000;
                                    margin-left: 10px;
                              }
                          }
                      }
                      &:after {
                          content: "";
                          display: block;
                          position: absolute;
                          right: 6px;
                          bottom: 5px;
                          height: 7px;
                          width: 10px;
                          background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons@2x.960cf225.png);
                          background-position: -153px -102px;
                          -moz-background-size: 168px 135px;
                          background-size: 168px 135px;
                      }
                   
                  }
              }
         }
      }
  }
  
</style>