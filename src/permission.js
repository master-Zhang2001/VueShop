import { toast, showFullLoading, hideFullLoading } from './composables/util'
import { router,addRoutes } from './router'
import { getToken } from '~/composables/auth'
import store from './store'

//不让他调动两次(不让他点击一次就请求一次路由)
let hasGetInfo = false
//全局前置守卫,只有登录了页面才可以跳转到内容页面
router.beforeEach(async (to,from,next)=>{
    //显示loading
    showFullLoading()
    //判断能否获得之前的token值
    const token = getToken()
    //如果没有登录页面，并且去到的路径是非登录页面的，强制跳转登陆页面
    if(!token && to.path !='/login'){
        //toast方法的错误提示框
        toast("请先登录", "error")
        return next ({ path:'/login'})
    }
    //防止重复登录
    if(token && to.path == '/login'){
        toast("请勿重复登录", "error")
        //如果有之前的路径的话就回到之前的路径，否则的话就强制跳转后台首页
        return next({ path:from.path ? from.path : '/'})
    }
    //如果用户登录了，自动获取用户信息，并存储在vuex中
    //解决了数据刷新之后就没有的难点
    //异步操作要使用await
    //设置跳转的新路由为false
    let hasNewRoute = false
    // 如果请求token正确时候且hasgetinfo为false的时候不会再次请求路由，除非刷新页面
    if(token && !hasGetInfo){
        let { menus } = await store.dispatch("getinfo")
        //令hasgetinfo为true
        hasGetInfo = true
        //动态添加路由
        hasNewRoute = addRoutes(menus)
    }
    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "-后台商城管理系统"
    document.title = title
    // 放行
    hasNewRoute ? next(to.fullPath) : next()
})

//全局后置守卫,结束之后fullloading也会隐藏
router.afterEach((to, from) => hideFullLoading())