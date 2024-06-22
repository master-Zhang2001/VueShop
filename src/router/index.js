//1.第一步需要引用方法：
import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import Admin from '~/layouts/admin.vue'
import GoodList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'
import CommentList from '~/pages/comment/list.vue'
import CouponList from '~/pages/coupon/list.vue'
import ImageList from '~/pages/image/list.vue'
import NoticeList from '~/pages/notice/list.vue'
import UserList from '~/pages/user/list.vue'
import OrderList from '~/pages/order/list.vue'
import SettingBase from '~/pages/setting/base.vue'
//静态路由
const routes = [
    {
        path: "/",
        name: "admin",
        component: Admin
    }, {
        path: "/login",
        component: Login,
        meta: {
            title: "登录页面"
        }
    }, {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }]

//定义动态路由，用于匹配菜单的数据
const asyncRoutes = [{
    path: "/",
    name: "/",
    component: Index,
    meta: {
        title: "后台首页"
    }
}, {
    path: "/goods/list",
    name: "/goods/list",
    component: GoodList,
    meta: {
        title: "商品管理"
    }
}, {
    path: "/category/list",
    name: "/category/list",
    component: CategoryList,
    meta: {
        title: "分类列表"
    }
}, {
    path: "/comment/list",
    name: "/comment/list",
    component: CommentList,
    meta: {
        title: "评价列表"
    }
}, {
    path: "/coupon/list",
    name: "/coupon/list",
    component: CouponList,
    meta: {
        title: "优惠卷列表"
    }
}, {
    path: "/image/list",
    name: "/image/list",
    component: ImageList,
    meta: {
        title: "图片列表"
    }
}, {
    path: "/user/list",
    name: "/user/list",
    component: UserList,
    meta: {
        title: "用户列表"
    }
}, {
    path: "/notice/list",
    name: "/notice/list",
    component: NoticeList,
    meta: {
        title: "通知列表"
    }
}, {
    path: "/order/list",
    name: "/order/list",
    component: OrderList,
    meta: {
        title: "订单列表"
    }
}, {
    path: "/setting/base",
    name: "/setting/base",
    component: SettingBase,
    meta: {
        title: "设置列表"
    }
}]

//这里不是通过new来创建，通过createRouter 方法创建，使用的模式不是通过mode来定义
// 后续引用的话要加花括号
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// export default router

// 动态添加路由的方法
export function addRoutes(menus) {
    // 是否有新的路由
    let hasNewRoute = false
    //把路由添加到菜单栏
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach(e => {
            let item = asyncRoutes.find(o=>o.path == e.frontpath)
            if(item && !router.hasRoute(item.path)){
                router.addRoute("admin",item)
                hasNewRoute = true
            }
            if(e.child && e.child.length > 0){
                findAndAddRoutesByMenus(e.child)
            }
        })
    }
    findAndAddRoutesByMenus(menus)
    //返回是否刷新的属性
    return hasNewRoute
}
