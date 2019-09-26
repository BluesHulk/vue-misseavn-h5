<template>
  <div id="filter">
      <div class="sub-header">剧集筛选</div>
      <iIScroll :data="filterList" ref = "scroll" class="recommend-content">
      <div class="drama-content">
           <div class="table-col" v-for="(item,index) in filterList">
               <a class="Thumbnail drama" :href="'/drama/'+item.id"  >
                  <div class="cover" :style="{backgroundImage: 'url('+'//static.missevan.com/dramacoversmini/'+item.cover+')'}"></div><div class="name">{{item.name}}</div>
                  <div class="update-detail">
                      <span class="status">{{item.newest}}</span>
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
          filterList:[]
       }
    },
    methods:{
        dramaFilter(){
            var that = this;
            this.$ajax("dramaFilter").then(function(res){
                that.filterList = res.data.info
                // console.log(res.data.info)
            })
        }
    },
    created(){
        this.dramaFilter()
    },
     components:{
        iIScroll,
    },

 }
</script>
<style lang="scss">
@media (min-width: 361px) {
     #filter .drama-content .table-col{
          width: 33% !important;
      }
  }
  #filter{
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
      height:calc(100vh - 0.8rem);
      .drama-content{
        width:100%;
        .table-col {
            display: inline-block;
            position: relative;
            width: 50%;
            text-align: center;
            .Thumbnail {
                display: inline-block;
                margin: 0.05rem;
                padding: 0;
                text-align: left;
                margin-bottom: 0.1rem;
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
                    height: 1.4rem;
                    width: 1.1rem;
                    .cover {
                        height:  1.1rem;
                        width:  1.1rem;
                        background-position: 50%;
                        background-repeat: no-repeat;
                        -moz-background-size: 100%;
                        -o-background-size: 100%;
                        background-size: 100%;
                    }
                    .name {
                        width: 100%;
                        height: auto;
                        font-size: 0.13rem;
                        color: #000;
                        overflow:hidden;
                        text-overflow:ellipsis; 
                        white-space: nowrap;
                        padding-top:0.05rem;
                    }
                    .update-detail {
                        font-size: 0.11rem;
                        color: #9e9e9e;
                        .status {
                            float: left;
                        }
                    }
                }
            }
        }
      }
    }

  }
  
</style>