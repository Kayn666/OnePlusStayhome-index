import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/index/Index'),
        meta:{title:'首页'}
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home'),
        meta:{title:'demo'}
    },
    {
        path: '/world',
        name: 'world',
        component: () => import('../views/world/World'),
        meta:{title:'视界'}
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import('../views/detail/Detail'),
        meta:{title:'民宿详情'}
    },
    {
        path: '/list',
        name: 'List',
        component: () => import('../views/list/List'),
        meta:{title:'民宿列表'}
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/Login'),
        meta:{title:'用户登录'}
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/login/Register'),
        meta:{title:'用户注册'}
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/province',
        name: 'province',
        component: () => import('../views/province/Province')
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../views/calendar/Calendar')
    },
    {
        path: '/my',
        name: 'my',
        component: () => import('../views/my/My'),
        meta:{title:'个人中心',auth:true}
    },
    {
        path: '/collection',
        name: 'collection',
        component: () => import('../views/my/Collection'),
        meta:{title:'我的收藏',auth:true}
    },
    {
        path: '/orderslist',
        name: 'orderslist',
        component: () => import('../views/my/OrdersList'),
        meta:{title:'订单列表',auth:true}
    },
    {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/orders/Orders'),
        meta:{title:'立即下单',auth:true}
    },
    {
        path: '/ordersDate',
        name: 'ordersdate',
        component: () => import('../views/orders/OrdersDate'),
        meta:{title:'订单日期',auth:true}
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import('../views/orders/Pay'),
        meta:{title:'支付',auth:true}
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: () => import('../views/orders/PaySuccess'),
        meta:{title:'支付成功',auth:true}
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next)=>{
    let {title,auth} = to.meta;
    document.title=title || '一家民宿';
    if (auth){
        let token = store.state.token;
        if (token){
            next()
        }else {
            next({name:'Login',query:{redirect:to.name}})
        }
    }else {
        next();
    }
})

export default router
