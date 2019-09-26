<template>
  <div id="admin">
      <div class="tab-content">
         <span class="admins-title"><!-- react-text: 57 -->频道管理员<!-- /react-text --><!-- react-text: 58 -->（{{adminList.length}}）<!-- /react-text --></span>
         <div class="admins-container">
            <a :href="'/'+item.id + '/sound'" class="Thumbnail cv" v-for="(item,index) in adminList">
                <div class="cover" :style="{backgroundImage: 'url('+item.avatar2+')'}"></div>
                <div class="name">{{item.username}}</div>
            </a>
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
    props:['adminList'],
    methods:{

    },
    created(){

    },

 }
</script>
<style lang="scss">
  .tab-content {
      padding: 12px;
      position: relative;
      .admins-title {
          display: block;
          position: relative;
          width: 100%;
          height: 30px;
          line-height: 22px;
          font-size: 12px;
          &:after {
              content: "";
              display: block;
              position: absolute;
              top: 0;
              bottom: 0;
              left: -12px;
              right: -12px;
              border-bottom: 1px solid #e0e0e0;
          }
      }
      .admins-container {
          width: 100%;
          padding: 10px;
          .Thumbnail {
                display: inline-block;
                margin: 5px;
                padding: 0;
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
            }
            &.cv{
              position: relative;
              height: 70px;
              width: 70px;
              margin: 0;
              text-align: center;
                &:before {
                    -moz-background-size: 168px 135px;
                    -o-background-size: 168px 135px;
                    background-size: 168px 135px;
                    background-position: -76px -56px;
                    content: "";
                    display: block;
                    position: absolute;
                    right: 10px;
                    top: 36px;
                    z-index: 1;
                    height: 15px;
                    width: 15px;
                    background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons@2x.960cf225.png);
                }
                .cover {
                    height: 50px;
                    width: 50px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    margin: auto;
                }
                .name {
                    margin: 2px auto 0;
                    height: 18px;
                    line-height: 18px;
                    font-size: 12px;
                    color: #616161;
                    width: 50px;
                    white-space: nowrap;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
          }
      }
  }
</style>