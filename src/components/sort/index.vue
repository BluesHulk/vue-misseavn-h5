<template>
  <div id="sort">
   <iIScroll ref = "scroll" class="recommend-content" :data="itemList">
    <div>
     
       <div>
            <iItab :tabList="tabList"></iItab>
            <div class="minBox">
                <div class="catalogs">
                    <a class="Catalog"  v-for="(item,index) in itemList" :href="index==1 ? '/drama/'+item.id :'/catalogs/'+item.id">
                    <span class="catalog-icon"  :style="{backgroundImage:'url(' + item.pic + ')'}"></span>
                    <span class="catalog-title">{{item.title}}</span>
                    </a>
                </div>
            </div>
            <iIFooter @backTop="backTop"></iIFooter>
        </div>
    </div>
    <div class="loading-container" v-show="!itemList.length">
            <iILoading></iILoading>
    </div>
   </iIScroll>
   </div>
</template>
<script>
  import  iIScroll from 'base/scroll/index.vue';
  import  iILoading from 'base/loading/index.vue';
  import  iIFooter from 'base/footer/index.vue';
  import  iItab from 'base/tab/index.vue';
  import  constant from 'common/js/constant';
  export default {
        data() {
            return {
              tabList:constant.recommendTabs,
              itemList:[],
              checkLoaded:false,
            }
        },
        created(){
          this.listCatalogs()
        },
        activated(){
             setTimeout(() => {
                 //this.$refs.slider && this.$refs.slider.refresh()
             }, 20)
        },
        methods:{
           
            loadImg(){
                if(!this.checkLoaded){
                     this.$refs.scroll.refresh()
                     this.checkLoaded = true;
                }
            },
            listCatalogs(){
                const that = this;
                this.$ajax('iocnCatalogs').then(function(res){
                    
                   that.itemList = res.data.info;
                   console.log(that.itemList )
                })
            },
            backTop(){
                this.$refs.scroll.scrollTo(this.$refs.scroll,0)
            }
        },
        components:{
           iIScroll,
           iItab,
           iILoading,
           iIFooter
        }
    }
</script>
<style lang="scss">
    #sort{
          -webkit-flex-grow:1;
          display:-webkit-flex;
          width: 100%;
          height: 100%;
        .recommend-content{
             width: 100%;
             height: 100%;
             -webkit-box-flex:1;
             overflow: hidden;
             .minBox{
                 min-height: calc(100vh - 1.54rem);
                 .catalogs{
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -moz-box;
                    display: -ms-flexbox;
                    display: flex;
                    height: 100%;
                    width: 100%;
                    padding: 15px;
                    -webkit-flex-wrap: wrap;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                    -webkit-justify-content: space-around;
                    -ms-flex-pack: distribute;
                    justify-content: space-around;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    -moz-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    .Catalog {
                        height: 105px;
                        width: 105px;
                        display: inline-block;
                        position: relative;
                        margin: 10px 0;
                        -webkit-border-radius: 4px;
                        -moz-border-radius: 4px;
                        border-radius: 4px;
                        background-color: #fff;
                        -webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.2);
                        -moz-box-shadow: 0 1px 1px 0 rgba(0,0,0,.2);
                        box-shadow: 0 1px 1px 0 rgba(0,0,0,.2);
                        text-align: center;
                         .catalog-icon {
                            display: block;
                            height: 50px;
                            width: 50px;
                            margin: 15px auto 8px;
                            background-position: 50%;
                            background-repeat: no-repeat;
                            -moz-background-size: 100%;
                            background-size: 100%;
                        }
                        .catalog-title {
                            font-size: 14px;
                            color: #000;
                        }
                    }
                 }
             }
            .loading-container{
                position: absolute;
                width: 100%;
                top: 0.84rem;
                min-height: calc(100vh - 0.84rem);
                box-sizing: border-box;
            }
        }
    }
</style>