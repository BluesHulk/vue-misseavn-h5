<template>
  <div id="Tuiniu">
    <iIHeader></iIHeader>
    <keep-alive>
      <router-view></router-view>  
    </keep-alive>

  </div>
</template>

<script>
  import iIHeader from './base/header';
  export default {
    name: 'Tuiniu',
    created(){
      

      // this.$ajax('userinfo', {
      //        "falg":1
      // }).then(function(res){
      //   console.log(res)
      // })
    
    },
    components: {
        iIHeader,
    },
  }
</script>

<style lang="scss">

#Tuiniu{
    display:-webkit-flex;
    flex-direction:column;
    width: 100%;
    height: 100%;
}
</style>
