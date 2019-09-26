webpackJsonp([11],{OPVq:function(t,i){},R5Iw:function(t,i){},R7WS:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=s("8MDr"),a=s("3Q4o"),n=s("GQaK"),l={name:"slider",props:{loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},interval:{type:Number,default:4e3}},data:function(){return{dots:[],currentPageIndex:0}},mounted:function(){var t=this;setTimeout(function(){t._setSliderWidth(),t._initDots(),t._initSlider(),t.autoPlay&&t._play()},20),window.addEventListener("resize",function(){t.slider&&(t._setSliderWidth(!0),t.slider.refresh())})},activated:function(){this.slider.enable();var t=this.slider.getCurrentPage().pageX;this.slider.goToPage(t,0,0),this.currentPageIndex=t,this.autoPlay&&this._play()},deactivated:function(){this.slider.disable(),clearTimeout(this.timer)},beforeDestroy:function(){this.slider.disable(),clearTimeout(this.timer)},methods:{_setSliderWidth:function(t){this.children=this.$refs.sliderGroup.children;for(var i=0,s=this.$refs.slider.clientWidth,e=0;e<this.children.length;e++){var n=this.children[e];console.log(this.children.length),Object(a.a)(n,"slider-item"),n.style.width=s+"px",i+=s}this.loop&&!t&&(i+=2*s),this.$refs.sliderGroup.style.width=i+"px"},_initSlider:function(){var t=this;this.slider=new n.a(this.$refs.slider,{scrollX:!0,scrollY:!1,momentum:!1,snap:{loop:this.loop,threshold:.3,speed:400}}),this.slider.on("scrollEnd",this._onScrollEnd),this.slider.on("touchend",function(){t.autoPlay&&t._play()}),this.slider.on("beforeScrollStart",function(){t.autoPlay&&clearTimeout(t.timer)})},_onScrollEnd:function(){var t=this.slider.getCurrentPage().pageX;this.currentPageIndex=t,this.autoPlay&&this._play()},_initDots:function(){this.dots=new Array(this.children.length)},_play:function(){var t=this;clearTimeout(this.timer),this.timer=setTimeout(function(){t.slider.next()},this.interval)}}},r={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{ref:"slider",staticClass:"slider"},[s("div",{ref:"sliderGroup",staticClass:"slider-group"},[t._t("default")],2),t._v(" "),s("div",{staticClass:"dots"},t._l(t.dots,function(i,e){return s("span",{staticClass:"dot",class:{active:t.currentPageIndex===e}})}))])},staticRenderFns:[]};var o=s("VU/8")(l,r,!1,function(t){s("R5Iw")},"data-v-37ebfe35",null).exports,c=s("odKQ"),d=s("xuSf"),u=s("t1uK"),h=s("mFlh"),v={data:function(){return{sentimentList:[],channelList:[],sliderData:[],itemList:[],checkLoaded:!1,tabList:h.a.recommendTabs}},created:function(){this.bannerData(),this.listRecommend()},activated:function(){setTimeout(function(){},20)},methods:{loadImg:function(){this.checkLoaded||(this.$refs.scroll.refresh(),this.checkLoaded=!0)},bannerData:function(){var t=this;this.$ajax("banner").then(function(i){t.sliderData=i.data.info.banner,t.sentimentList=i.data.info.sound.slice(0,3),t.channelList=i.data.info.channel})},listRecommend:function(){var t=this;this.$ajax("listRecommend").then(function(i){t.itemList=i.data.music})},hrefLink:function(t){return"/sound/"+t.id+"/introduction"},channelLink:function(t){return"/channel/"+t.id},iconName:function(t){return"catalog-icon-"+t.id},getMore:function(t){return"/catalogs/"+t.id},miniImg:function(t){return"//static.missevan.com/coversmini/"+t.cover_image},backTop:function(){this.$refs.scroll.scrollTo(this.$refs.scroll,0)}},components:{iIScroll:e.a,iISlider:o,iItab:u.a,iILoading:c.a,iIFooter:d.a}},m={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{attrs:{id:"home"}},[s("iIScroll",{ref:"scroll",staticClass:"recommend-content",attrs:{data:t.itemList}},[s("div",[s("div",[s("iItab",{attrs:{tabList:t.tabList}}),t._v(" "),t.sliderData.length?s("div",{staticClass:"slider-wrapper"},[s("div",{staticClass:"slider-content"},[s("iISlider",{ref:"slider"},t._l(t.sliderData,function(i){return s("div",[s("a",{attrs:{href:i.url}},[s("img",{attrs:{src:i.pic},on:{load:function(i){t.loadImg()}}})])])}))],1)]):t._e(),t._v(" "),s("div",{staticClass:"Panel sounds"},[s("div",{staticClass:"panel-head"},[s("div",{staticClass:"panel-title"},[s("div",{staticClass:"home-panel-title sound"},[s("i"),t._v("\n                          人气 M 音\n                          ")])]),t._v(" "),s("div",{staticClass:"panel-nav"},[s("a",{staticClass:"home-panel-nav",attrs:{href:"/rank"}},[t._v("排行榜")])])]),t._v(" "),s("div",{staticClass:"panel-body"},t._l(t.sentimentList,function(i){return s("a",{staticClass:"Thumbnail sound",attrs:{href:t.hrefLink(i)}},[s("div",{staticClass:"cover",style:{backgroundImage:"url("+i.front_cover+")"}}),t._v(" "),s("div",{staticClass:"title"},[t._v(t._s(i.soundstr))]),t._v(" "),s("div",{staticClass:"detail"},[s("span",{staticClass:"item play-times"},[t._v(t._s(i.view_count_formatted))]),s("span",{staticClass:"item comments"},[t._v(t._s(i.comment_count))])])])}))]),t._v(" "),s("div",{staticClass:"Panel channels"},[s("div",{staticClass:"panel-head"},[s("div",{staticClass:"panel-title"},[s("div",{staticClass:"home-panel-title channel"},[s("i"),t._v("\n                           频道\n                          ")])]),t._v(" "),s("div",{staticClass:"panel-nav"},[s("a",{staticClass:"home-panel-nav",attrs:{href:"/channels/all"}},[t._v("更多")])])]),t._v(" "),s("div",{staticClass:"panel-body"},t._l(t.channelList,function(i){return s("a",{staticClass:"Thumbnail channel",attrs:{href:t.channelLink(i)}},[s("div",{staticClass:"cover",style:{backgroundImage:"url("+i.smallpic+")"}},[s("div",{staticClass:"follow"},[s("span",[t._v(t._s(i.follow_num))])])]),t._v(" "),s("div",{staticClass:"title"},[t._v(t._s(i.name))])])}))]),t._v(" "),t._l(t.itemList,function(i){return s("div",{staticClass:"Panel sounds"},[s("div",{staticClass:"panel-head"},[s("div",{staticClass:"panel-title"},[s("div",{staticClass:"home-panel-title sound"},[s("i",{class:t.iconName(i)}),t._v("\n                          "+t._s(i.title)+"\n                          ")])]),t._v(" "),s("div",{staticClass:"panel-nav"},[s("a",{staticClass:"home-panel-nav",attrs:{href:"/catalogs/"+i.id}},[t._v("更多")])])]),t._v(" "),s("div",{staticClass:"panel-body"},t._l(i.objects_point,function(i){return s("a",{staticClass:"Thumbnail sound",attrs:{href:t.hrefLink(i)}},[s("div",{staticClass:"cover",style:{backgroundImage:"url("+t.miniImg(i)+")"}}),t._v(" "),s("div",{staticClass:"title"},[t._v(t._s(i.soundstr))]),t._v(" "),s("div",{staticClass:"detail"},[s("span",{staticClass:"item play-times"},[t._v(t._s(i.view_count))]),s("span",{staticClass:"item comments"},[t._v(t._s(i.comment_count))])])])}))])}),t._v(" "),s("iIFooter",{on:{backTop:t.backTop}})],2)]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.itemList.length,expression:"!itemList.length"}],staticClass:"loading-container"},[s("iILoading")],1)])],1)},staticRenderFns:[]};var f=s("VU/8")(v,m,!1,function(t){s("OPVq")},null,null);i.default=f.exports}});
//# sourceMappingURL=11.300b40045715cefbf268.js.map