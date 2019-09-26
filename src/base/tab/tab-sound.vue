<template>
  <div class="tab">
    <div  class="tab-item" v-for="(item,index) in tabList" @click="tab(index,item)" :class="{active:selectIndex==index}">
      <span v-if="index != 1" class="tab-link ">{{item.name}}</span>
      <span v-if="index == 1 && commentCount" class="tab-link ">{{item.name}}({{commentCount}})</span>
      <span v-else-if="index == 1" class="tab-link ">{{item.name}}</span>
    </div>
    
 
  </div>
</template>
<script>
import  constant from 'common/js/constant';
    export default{
       data(){
           return{
             // tabList:constant.recommendTabs
             selectIndex: this.initSelect,
           }
       },
       watch:{
          '$route' (to,from) {
             console.log(to,from)
           },
           'initSelect' (val) {
                this.selectIndex = val
            }
       },
       props:["tabList",'initSelect','commentCount'],
       methods:{ 
           tab(index,item) {
             this.selectIndex = index;
             this.$emit("tab-click", index);
             var url = this.tabList[index].url;
                if (url) {
                    this.$router.push(url)
                }
          },
         
       },
       mounted(){
         
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