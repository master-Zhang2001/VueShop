import { createApp } from 'vue'
import App from './App.vue'
//引入elementsplus
import ElementPlus from 'element-plus' 
import 'element-plus/dist/index.css'
//全局引入elementPlus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  
//引入路由
import { router }from './router'
// 引入vuex：管理用户信息，方便以后调用
import store from './store'
//引入插件库Animate.css,动画更优秀
import 'animate.css'

const app = createApp(App)
app.use(ElementPlus)
//此处导入windi.css方便对于一些css样式库的调用
import 'virtual:windi.css'
app.use(router)
//全局引入图标：
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//进行权限问题的访问
import './permission'
app.use(store)
//全局引入进度条的css，在nprogress组件库中
import 'nprogress/nprogress.css'
app.mount('#app')
