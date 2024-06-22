import { ref, reactive } from 'vue'
import { logout, updatepassword } from '~/api/manager'
import { showModel, toast } from '~/composables/util'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

//更改密码
export function useRepassword() {
    const router = useRouter()
    const store = useStore()
    //修改密码部分
    // const showDrawer = ref(false)
    const formDrawerRef = ref(null)
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })
    //输入框规则
    const rules = {
        oldpassword: [
            {
                required: true,
                message: '旧密码必填',
                trigger: 'blur',
            }
        ],
        password: [
            {
                required: true,
                message: '新密码必填',
                trigger: 'blur',
            }
        ],
        repassword: [
            {
                required: true,
                message: '确认密码必填',
                trigger: 'blur',
            }
            // {
            //   min:3,
            //   max:10,
            //   message:'名称长度需要在3到10之间',
            //   trigger:'blur'
            // }
        ]
    }
    //定义一个formref的响应式数据，设他为空。！！！！！！！！！！！
    const formRef = ref(null)
    //设置按键加载中的状态
    // const loading = ref(null)
    const onSubmit = () => {
        //拿到他的value值再调用一个方法vaildata，在方法中传一个回调函数：目的是输入空的时候会显示输入框没有输入内容
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            //请求成功后设置加载按钮的value值为true
            formDrawerRef.value.showLoading()
            updatepassword(form)
                .then(res => {
                    //清除token，跳转页面
                    store.dispatch("logout")
                    router.push('/login')
                    toast("修改密码成功，请重新登录")
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading()
                })
        })
    }
    const openRepasswordForm = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRepasswordForm
    }
}

//退出登录
export function useLogout() {
    const router = useRouter()
    const store = useStore()
    function handlelogout() {
        showModel("是否要退出登录？").then(res => {
            // 使用.finally表示无论是否成功都要执行下面操作
            logout().finally(() => {
                //移除cookies里面的token
                //清除页面的状态vuex
                //这个logout方法是index。js中的
                store.dispatch("logout")
                //跳转回登录页
                router.push('/login')
                //提示退出成功
                toast("退出登录成功")
            })
        })
    }
    return {
        // ES6规则，引用不需要加括号
        handlelogout
    }
}