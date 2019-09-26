const recommend = r => require(['components/recommend'], r);
const sort = r => require(['components/sort'], r);
const musicList = r => require(['components/musicList'], r);
// const search = r => require(['base/search'], r);
const search = r => require(['base/search/search.vue'], r);

const soundDetail = r => require(['components/soundDeatil'], r);
const albumList = r => require(['components/album'], r);
const userList = r => require(['components/user'], r);
const rankList = r => require(['components/rank'], r);
const channelList = r => require(['components/channels'], r);
const channelDetail = r => require(['components/channel'], r);
const catalogsList = r => require(['components/catalogs'], r);
const drama = r => require(['components/drama'], r);

const timeline = r => require(['components/drama/children/timeline.vue'], r);
const filter = r => require(['components/drama/children/filter.vue'], r);
const detail = r => require(['components/drama/children/detail.vue'], r);
const Introduction = r => require(['components/soundDeatil/child/index.vue'], r);
const Comments = r => require(['components/soundDeatil/child/comments.vue'], r);
const Images = r => require(['components/soundDeatil/child/images.vue'], r);
// const chooseother = function(r){
//     require(['views/actor/choose-other'],r)
// }

// 根目录
const rootPath = '';

// 页面路由
const routes = [{
        path: '',
        redirect: '/recommend'
    },
    {
        path: '/recommend',
        component: recommend,
        name: 'recommend'
    },
    {
        path: '/sort',
        component: sort,
        name: 'sort'
    },
    {
        path: '/musicList/:id?',
        component: musicList,
        name: 'musicList',
        // meta: { requireAuth: true }
    },
    {
        path: '/search',
        component: search,
        name: 'search'
    },
    {
        path: '/sound/:soundId?/:tabIndex?',
        component: soundDetail,
        name: 'sound',
        meta: { requireAuth: true }
    },
   
    {
        path: '/album/:id?',
        component: albumList,
        name: 'album',
        meta: { requireAuth: true }
    },
    {
        path: '/:id?/sound',
        component: userList,
        name: 'userList',
        meta: { requireAuth: true }
    },{
        path:'/rank',
        component:rankList,
        name:'rank'
    },
    {
        path:'/channels/:isIall?',
        component:channelList,
        name:'channels',
        meta: { requireAuth: true }
    },
    {
        path:'/channel/:id?/:tabName?',
        component:channelDetail,
        name:'channel',
        meta: { requireAuth: true }
    },
    {
        path:'/catalogs/:id?',
        component:catalogsList,
        name:'catalogs',
        meta: { requireAuth: true }
    },
    {
        path:'/drama/:id?',
        component:drama,
        name:'drama',
        meta: { requireAuth: true }
        // children:[
              
        // ]为啥放在这个不能匹配的组件
    },
    {
        "path":"/radio/timeline",
        "component":timeline,
        "name":"timeline"
    },
    {
        "path":"/radio/filter",
        "component":filter,
        "name":"filter",
    },
    {
        "path":"/radio/detail/:id?",
        "component":detail,
        "name":"detail",
    }


].map(route => {
    route.path = rootPath + route.path;
    return route;
});
// 404 页
routes.push({
    path: '*',
    redirect: '/'
});

export default routes;