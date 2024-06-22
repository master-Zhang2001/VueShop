import { ref } from 'vue'
//监听的方法
import { useRoute, onBeforeRouteUpdate,useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
// import { router } from '~/router'
export function useTabList() {
    //实现路由的跳转
    const router = useRouter()
    //获取《当前》路由的信息
    const route = useRoute()
    const cookie = useCookies()
    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: "/"
        }
    ])
    //添加标签导航
    function addTab(tab) {
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        if (noTab) {
            //如果之前没有拿到tabLIst的话就把新的对象给他push进去
            tabList.value.push(tab)
        }
        //储存cookie值，让他不点关闭就一直存在
        cookie.set("tabList", tabList.value)
    }

    //初始化标签导航列表（刷新之后保持原来的标签导航状态）
    function initTabList() {
        let tab = cookie.get("tabList")
        if (tab) {
            tabList.value = tab
        }
    }
    initTabList();
    //点击菜单栏时候可以获取到他的值和路径（注意查一下该方法的使用）
    //传入的路径的参数是addTab中的参数，注意查看
    onBeforeRouteUpdate((to, from) => {
        //让他属于激活的状态
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })

    //点击标签导航之后实现路由的跳转
    //用t来接收数据（地址）
    const changeTab = (t) => {
        console.log(t)
        activeTab.value = t
        router.push(t)
    }
    //删除标签导航实现页面的跳转
    // t是点击之后得到的路径
    const removeTab = (t) => {
        // console.log(t);
        let tabs = tabList.value
        let a = activeTab.value
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    // console.log(nextTab);
                    if (nextTab) {
                        a = nextTab.path
                    }
                }
            })
        }
        // 如果不是点击了激活事件，就只是执行下面这几段代码
        // 当前激活的值等于下一个或者上一个路径
        activeTab.value = a
        // console.log(activeTab.value);
        // 查看数组里面的值不等于
        //让路由跳转到此时活跃路径（前一个或者后一个）
        router.push(activeTab.value)
        tabList.value = tabList.value.filter(tab => tab.path != t)
        cookie.set("tabList", tabList.value)
    }

    //关闭所有或者部分标签导航按键
    const handleClose = (c) => {
        if (c == "clearAll") {
            // 切换回首页
            activeTab.value = "/"
            tabList.value = [{
                title: '后台首页',
                path: '/'
            }]
        } else if (c == "clearOther") {
            //过滤只剩下首页和当前激活 filter是一个过滤器
            tabList.value = tabList.value.filter(tab => tab.path == "/" || tab.path ==
                activeTab.value)
        }
        router.push(activeTab.value)
        cookie.set("tabList", tabList.value)
    }

    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}