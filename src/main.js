import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App'
import routes from './router'
import axios from './axios';
import VueLazyload from 'vue-lazyload';
import storeOption from './store';
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(VueLazyload, {
 
  //  error: 'assets/image/cary.png',
  loading: require('./common/image/tuniu-default.png')
})
Vue.use(VueRouter);

Vue.use(Vuex);



const store = new Vuex.Store(storeOption);
 import './common/style/index.scss'
// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  mode: 'history',
  routes: routes,
  // scrollBehavior (to, from, savedPosition) {
  //     console.log("savedPosition",savedPosition)
  //     return { x: 0, y: 0 };//期望滚动到哪个的位置
  // }
});
// router.beforeEach((to, from, next) => {
//   // debugger
//   console.log(store.state.islogin)
//   if (to.meta.requireAuth) {
//     if (store.state.islogin == true) {  //可以换成vuex store.state.islogin
//       next();
//     } else {
//       next({
//         path: "/recommend"//指向为你的登录界面
//       });
//     }
//   } else {
//     next();
//   }

//   if (to.fullPath === "/recommend") {
//     if (store.state.islogin == true) {
//       next({
//         path: from.fullPath
//       });
//     } else {
//       next();
//     }
//   }
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})





