<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" v-for="(item,index) in tabList" :key="index"  :to="item.url">
      <span class="tab-link">{{item.name}}</span>
    </router-link>
    <!--<router-link tag="div" class="tab-item" to="/CustomerService">
      <span class="tab-link">客服</span>
    </router-link>
     <router-link tag="div" class="tab-item" to="/Mine">
      <span class="tab-link">我的</span>
    </router-link>
    -->
  </div>
</template>
<script>
import  constant from 'common/js/constant';
    export default{
       data(){
           return{
             // tabList:constant.recommendTabs
           }
       },
       props:["tabList"],
       mounted(){
         console.log(this.tabList)
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
        &.router-link-active{
                 .tab-link{
                   color:#222;
                   border-bottom: 2px solid#222;
                }
            }
     }
      
     
  }
   
</style>