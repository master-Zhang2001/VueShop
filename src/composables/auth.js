// 二次封装，简化代码token：是获取api接口的密钥的封装
import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = "admin-token"
const cookie = useCookies()

//获取token
export function getToken(){
    return cookie.get(TokenKey)
}

//设置token
export function setToken(token){
    return cookie.set(TokenKey,token)
}

//清除token
export function removeToken(){
    return cookie.remove(TokenKey)
}
 