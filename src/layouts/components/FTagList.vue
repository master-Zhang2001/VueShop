<!-- 标签导航 -->
<template>
    <div class="f-tag-list" :style="{left:$store.state.asideWidth}">
        <!-- 关闭标签导航 -->
        <el-tabs v-model="activeTab" type="card" class="flex-1" 
        @tab-remove="removeTab"
        @tab-change="changeTab"
        style="min-width:100px;">
            <el-tab-pane v-for="item in tabList" 
            :key="item.path" 
            :label="item.title" 
            :name="item.path"
            :closable="item.path != '/' ">
            </el-tab-pane>
        </el-tabs>
        <span class="tag-btn">
            <!-- <el-dropdown @command="handleClose" @mouseout="hover = false" @mouseover="hover = true" hide-timeout="250"> -->
                <el-dropdown @command="handleClose">
                <span class="el-dropdown-link" style="outline: none;">
                    <el-icon class="el-icon--right">
                    <!-- <el-icon>    
                        <arrow-down v-if="!hover" />
                        <arrow-up v-else /> -->
                        <arrow-down/>
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div style="height:44px;"></div>
</template>

<script setup>
import { useTabList } from '~/composables/useTabList.js'
const {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose
} = useTabList()
</script>

<style>
.f-tag-list {
    @apply fixed bg-gray-100 flex items-center px-2;
    top:64px;
    right: 0;
    height: 44px;
    z-index: 100;
}
.tag-btn {
    @apply rounded ml-auto px-2 flex items-center justify-center;
    height: 32px;
    /* width: 32px; */
}
.el-tabs__header{
    border: 0!important;
    @apply mb-0;
}
.el-tabs__nav {
    border: 0!important;
}
.el-tabs__item{
    @apply bg-white mx-1 rounded;
    border: 0!important;
    height: 32px;
    line-height: 32px;
}
.is-top{
    @apply flex items-center;
}
.f-tag-list{
    @apply bg-gray-100;
}
.is-disabled{
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>