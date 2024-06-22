<template>
    <!-- 动态绑定宽度，设置为可折叠 -->
    <div class="f-menu" :style="{ width: $store.state.asideWidth }">
        <!-- unique-opened是只保持一个子菜单的展开 -->
        <!-- defalutactive是激活默认路径的组件 -->
        <el-menu :default-active="defaultActive" unique-opened :collapse-transition="false" :collapse="isCollapse"
            default-active="2" class="border-0" @select="handleSelect">
            <template v-for="(item, index) in asideMenus" :key="index">
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index=item2.frontpath>
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const route = useRoute()
//默认选中当前路由路径
const defaultActive = ref(route.path)
//计算属性获取api接口文档里面的menus
const asideMenus = computed(()=>store.state.menus)
const handleSelect = (e) => {
    router.push(e)
}
//设置是否折叠
const isCollapse = computed(() => !(store.state.asideWidth == "250px"))

//监视标签路由跳转Menu菜单导航也实现跳转
// onBeforeRouteUpdate((to, from) => {
//         //让他属于激活的状态
//         const r = to.path
//         handleSelect(r)
//     })
</script>

<style>
.f-menu {
    /* width: 250px; */
    transition: all 0.2s;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    @apply shadow-md fixed bg-light-50;
}
.f-menu::-webkit-scrollbar{
    width: 0;
}
</style>