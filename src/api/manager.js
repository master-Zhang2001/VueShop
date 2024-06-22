//引入的是自定义实例service,service设置的名字是axios在下面导入
import axios from '~/axios'
//注意的是这个export是导出这个方法
export function login(username,password){
    //返回的是接口的响应数据
    return axios.post("/admin/login",{
        username,
        password
    })
}
//导出接口的信息
export function getinfo(){
    return axios.post("/admin/getinfo")
}
//退出登陆的方法
export function logout(){
    return axios.post("/admin/logout")
}
//更新密码
export function updatepassword(data){
    return axios.post("/admin/updatepassword",data)
}
