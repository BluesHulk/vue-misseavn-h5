<template>
  <div class="tab">
    <div  class="tab-item" v-for="(item,index) in tabList" @click="tab(index,item)" :class="{active:index == num }">
      <span class="tab-link ">{{item.name}}</span>
    </div>
 
  </div>
</template>
<script>
import  constant from 'common/js/constant';
    export default{
       data(){
           return{
             // tabList:constant.recommendTabs
             num: 0
           }
       },
       watch:{
          '$route' (to,from) {
             //console.log(to,from)
           },
       },
       props:["tabList"],
       methods:{ 
           tab(index,item) {
             let fullPath = this.$route.fullPath
             this.num = index;
             this.$emit("watchHash",item.url )
             if(fullPath.indexOf("&t") == -1){
               this.$router.replace(fullPath+"&t="+item.url);
             }else{
                //  console.log(fullPath.split("&")[0])
                this.$router.replace(fullPath.split("&")[0]+"&t="+item.url); 
             }
             //this.$router.replace('/search?s='+key+'&t='+item.url);
          },
          hashUrl(){
             let fullPath = this.$route.fullPath;
             if(fullPath.indexOf("&t") == -1){
                 this.num = 0
             }else{
                  let urlHash = fullPath.split("&")[1].split("=")[1];
                  if(urlHash == "sound"){
                        this.num = 0
                  }else if(urlHash == "album"){
                        this.num = 1
                  }else if(urlHash == "user"){
                        this.num = 2
                  }
             }
             
          }
       },
       mounted(){
          this.hashUrl();
       }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped >
  @import "../../common/style/variable";
  .tab{
 
    width:100%;
    display: flex;
    height: 0.44rem;
    line-height: 0.44rem;
    font-size: 0.14rem;
    background-color:#fff;
     .tab-item{
        flex: 1;
        text-align: center;
         .tab-link{
             padding-bottom: 5px;
             color: #9e9e9e;
         }
        &.active{
                 .tab-link{
                   color:#222;
                   border-bottom: 2px solid#222;
                }
            }
     }
      
     
  }
   
</style>