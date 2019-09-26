<template>
  <div id="comments">
    <div class="tab-content">
       <div id="Comments">
           <div id="comment-2073982" class="comment" v-for="(item,index) in comment">
              <a  :href="'/' + item.id + '/sound'" class="avatar">
                  <img :src="item.icon">
              </a>
              <div class="comment-body">
                <a  :href="'/' + item.id +'/sound'" class="username">{{item.username}}</a>
                <div class="comment-time">{{item.ctime}}</div>
                <div class="comment-like">{{item.like_num}}</div>
                <div class="comment-content">{{item.comment_content}}</div>
                <ul class="sub-comments" v-if="item.subcomments">
                   <li v-for="(itm,idx) in item.subcomments">
                      <a  :href="'/' + itm.id + '/sound'"  class="username">{{itm.username}}</a>
                      <div class="comment-time">{{itm.ctime}}</div>
                      <div class="comment-content">{{itm.comment_content}}</div>
                   </li>
                </ul>
              </div>
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
    props:['comment'],
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
      #Comments{
        .comment {
            position: relative;
            margin: 12px 0;
            padding-left: 52px;
            font-size: 14px;
            .avatar {
                position: absolute;
                top: 0;
                left: 0;
                width: 40px;
                height: 40px;
                
                img {
                    width: 100%;
                    height: 100%;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                }
            }
            .comment-body {
                position: relative;
                padding: 3px 0 12px;
                .username {
                    color: #757575;
                    font-size: 12px;
                    text-decoration: none;
                    height: 14px;
                    line-height: 14px;
                }
                .comment-time {
                    font-size: 11px;
                    color: #b3b3b3;
                    height: 14px;
                    line-height: 14px;
                }
                .comment-like {
                    display: inline-block;
                    position: absolute;
                    top: 5px;
                    right: 0;
                    height: 16px;
                    line-height: 16px;
                    padding-left: 20px;
                    font-size: 11px;
                    color: #757575;
                    cursor: pointer;
                    &:before {
                        -moz-background-size: 168px 135px;
                        -o-background-size: 168px 135px;
                        background-size: 168px 135px;
                        background-position: -131px -83px;
                        content: "";
                        position: absolute;
                        top: -1px;
                        left: 0;
                        width: 16px;
                        height: 16px;
                        background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons@2x.960cf225.png);
                    }
                }
                .comment-content {
                    padding-top: 6px;
                    word-break: break-all;
                }
                .sub-comments {
                    position: relative;
                    list-style-type: none;
                    background-color: #ededed;
                    -webkit-border-radius: 6px;
                    -moz-border-radius: 6px;
                    border-radius: 6px;
                    margin-top: 16px;
                    padding: 12px;
                    &:before {
                        content: "";
                        position: absolute;
                        top: -12px;
                        left: 16px;
                        width: 0;
                        height: 0;
                        border: 6px solid transparent;
                        border-bottom-color: #ededed;
                    }
                    &:after {
                        content: "";
                        display: block;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    .comment-time {
                        float: right;
                        font-size: 11px;
                        color: #b3b3b3;
                        height: 14px;
                        line-height: 14px;
                    }
                     .comment-content {
                          color: #757575;
                          padding-top: 6px;
                          word-break: break-all;
                      }
                }
            }
            &:after {
                content: "";
                display: block;
                position: absolute;
                bottom: 0;
                right: 0;
                left: 0;
                border-bottom: 1px solid #e0e0e0;
            }
        }
      }
      
  }
</style>