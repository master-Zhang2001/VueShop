<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-1">
                <Sunny />
            </el-icon>
            商城后台
        </span>
        <!-- <el-tooltip effect="light" content="折叠" placement="bottom"> -->
            <el-icon class="icon-btn" @click="$store.commit('handleAideWidth')">
                <Fold v-if="$store.state.asideWidth == '250px'"/>
                <Expand v-else/>
            </el-icon>
        <!-- </el-tooltip> -->

        <el-tooltip effect="light" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center"> <!--顶到最右边的位置-->
            <el-tooltip effect="light" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>
            <!-- <el-dropdown class="dropdown" @command="handleCommand" @mouseout="hover = false" @mouseover="hover = true" hide-timeout="250"> -->
                <el-dropdown class="dropdown" @command="handleCommand">   
                <span>
                    <!-- <el-avatar :size="25" :src="$store.state.user.avatar" class="ml-5 mr-2" /> -->
                    <el-avatar :size="25" :src="photo" class="ml-5 mr-2" />
                    {{ $store.state.user.username }}
                    <!-- <el-icon class="el-icon--right"> -->
                    <el-icon>    
                        <!-- <arrow-down v-if="!hover" />
                        <arrow-up v-else /> -->
                        <arrow-down/>
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <!-- 设置command属性 点击事件时候可以使用 -->
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
        <!-- 下面是表单： -->
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
            <!-- 输入框 -->
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input show-password type="password" clearable v-model="form.oldpassword" placeholder="请输入旧密码">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input show-password type="password" clearable v-model="form.password" placeholder="请输入新密码">
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <!-- type=password好像加或者不加都是可以的 showpassword是显示隐藏密码的那个按键 -->
                <el-input show-password type="password" clearable v-model="form.repassword" placeholder="请输入确认密码">
                </el-input>
            </el-form-item>
        </el-form>
    </form-drawer>
</template>

<script setup>
// import { useRouter } from 'vue-router'
// import { useStore } from 'vuex'
import photo from '../photos/1.jpg'
import { useFullscreen } from '@vueuse/core'
import { useRepassword, useLogout } from '~/composables/useManger'
//导出默认抽屉
import FormDrawer from '~/components/FormDrawer.vue'
//是否全屏和切换全屏与退出全屏的集合
const { isFullscreen, toggle } = useFullscreen()
//修改密码：从包装的函数中导出方法
const {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRepasswordForm
} = useRepassword()

//退出登录
const {
    handlelogout
} = useLogout()
// const router = useRouter()
// const store = useStore()


//创建一个事件来执行command属性，选择退出登录还是修改密码
const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handlelogout()
            break;
        case "rePassword":
            openRepasswordForm()
            break;
    }
}
//原生js更新页面事件
const handleRefresh = () => location.reload()
</script>

<style>
.f-header {
    @apply flex items-center bg-indigo-400 text-light-50 fixed left-0 right-0 top-0;
    height: 64px;
    z-index: 1000;
}

.logo {
    @apply flex justify-center items-center text-xl font-thin;
    width: 250px;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-300;
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}

.dropdown>span {
    @apply flex items-center text-light-100;
    /* color: var(--el-color-primary); */
    outline: none;
}

/* .tooltip-box{
    width: 300px;
    margin-top: 10px;
} */

/* el-icon{
    transition: 1s;
} */
</style>

