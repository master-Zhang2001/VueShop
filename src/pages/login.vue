<!-- 登录页面：需要兼容移动端 -->
<template>
    <el-row class="login-container"> 
        <!-- 左边 --> <!-- flex-col是垂直显示 -->
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>欢迎来到注册登录页面</div>
                <div>关于vite+vue3+elementsplus+windiCss构建的前端页面项目</div>
            </div>
        </el-col>
        <!-- 右边 -->
        <el-col :lg="8" :md="12" class="right">
            <!-- 表单前的一些元素文字 -->
            <h1 class="title">欢迎回来</h1>
            <!-- 外间距是my-5 -->
            <div class="input-frame">
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <!-- 下面是表单： -->
            <el-form ref="formRef" :rules="rules" class="w-[250px]" :model="form" label-width="auto"
                style="max-width: 600px">
                <!-- 输入框 -->
                <el-form-item prop="username">
                    <el-input clearable v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <!-- type=password好像加或者不加都是可以的  showpassword是显示隐藏密码的那个按键-->
                    <el-input show-password type="password" clearable v-model="form.password" placeholder="请输入密码">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 登录注册按钮 -->
                <el-form-item>
                    <el-button class="w-[250px]" round type="primary" @click="onSubmit" :loading="loading">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
// 引入登录方法
// import { login } from '~/api/manager' //getinfo
//引入报错方法（消息提示框）
import { toast } from '~/composables/util'

//引入路由实现页面跳转
import { useRouter } from 'vue-router'

//引入setToken方法
// import { setToken } from '~/composables/auth'

import { useStore } from 'vuex'

// do not use same name with ref
const form = reactive({
    username: "",
    password: ""
})

//输入框规则
const rules = {
    username: [
        {
            required: true,
            message: '用户名不可以为空',
            trigger: 'blur',
        },
        {
            min: 3,
            max: 10,
            message: '名称长度需要在3到10之间',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '用户名不可以为空',
            trigger: 'blur',
        },
    ]
}
//定义一个formref的响应式数据，设他为空。！！！！！！！！！！！
const formRef = ref(null)
const router = useRouter()
//设置按键加载中的状态
const loading = ref(null)
const store = useStore()
const onSubmit = () => {
    //拿到他的value值再调用一个方法vaildata，在方法中传一个回调函数：目的是输入空的时候会显示输入框没有输入内容
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
            // console.log("验证失败")
        }
        //请求成功后设置加载按钮的value值为true
        loading.value = true
        //验证store存的数据和form进行比较
        store.dispatch("login", form).then(res => {
            toast("登陆成功")
            router.push('/')
        }).finally(() => {//结束方法请求之后，设置loading为false
            loading.value = false
        })
    })
}
//监听回车事件
function onKeyUp(e) {
    if (e.key == "Enter") onSubmit()
}

//创建钩子函数：显示浏览器的监听和结束
//添加键盘监听
onMounted(() => {
    document.addEventListener("keyup", onKeyUp)
})
//移除键盘监听
onBeforeUnmount(() => {
    document.removeEventListener("keyup", onKeyUp)
})



</script>


<!-- 下面对style进行样式抽离：简化templete里面的代码 -->
<style scoped>
/* <!--铺满屏幕的意思--> */
.login-container {
    @apply min-h-screen;
}

.login-container .left {
    @apply bg-indigo-300 flex items-center justify-center;
}

.left>div>div:first-child {
    @apply font-bold text-3xl text-light-50 flex justify-center;
}

.left>div>div:last-child {
    @apply text-xl text-light-50;
}

.login-container .right {
    @apply bg-indigo-50 flex items-center justify-center flex-col;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

.right .input-frame {
    @apply flex items-center justify-center space-x-5 my-5 text-gray-500;
}

.right .line {
    @apply h-[1px] w-16 bg-gray-300;
}</style>