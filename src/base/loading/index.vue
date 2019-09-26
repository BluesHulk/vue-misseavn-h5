<template>
     <div class="loading">
        <img width="200" height="200" src="./loading.gif">
        <p class="desc">{{title}}</p>
    </div>
</template> 
<script>
    export default{
        props: {
            title: {
                type: String,
                default: '正在载入...'
            }
       }
    }
</script>
<style  lang="scss" rel="stylesheet/scss" scoped >
   @import "~common/style/variable";
  .loading{
        text-align:center;
        width:100%;
        .desc{
            line-height: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
        }
  }
    
</style>