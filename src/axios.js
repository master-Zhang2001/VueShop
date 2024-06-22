import axios from "axios"
import { getToken } from './composables/auth'
import { toast } from "./composables/util"
import store from "./store"
const service = axios.create({
    baseURL:"/api"
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    //往header头自动添加token
    const token = getToken()
    if(token){
        config.headers["token"] = token
    }
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 添加响应拦截器
service.interceptors.response.use(function (response) {
    return response.data.data;
  }, function (error) { 
    // 超出 2xx 范围的状态码都会触发该函数。
        const msg = error.response.data.msg || "请求失败"
        if(msg == "非法token，请先登录！"){
          //退出登录并且刷新一下
          store.dispatch("logout").finally(()=>location.reload())
        }
        toast(msg,"error" )
    return Promise.reject(error);
  })
//导出：相关实例service
export default service