import { createStore } from 'vuex'
import { login,getinfo } from '~/api/manager'
import { setToken,removeToken } from '~/composables/auth'
const store = createStore({
    state () {
      return {
        //用户信息
        user:{},
        //侧边宽度
        asideWidth:"250px",
        //设置菜单和菜单内容名字
        menus:[],
        ruleNames:[]
      }
    },
    mutations: {
        //记录用户信息，或者说存储信息，再存到上面的user对象中去
        //方便以后在任何地方对于信息或者内容的调用
      SET_USERINFO(state,user){
        state.user = user
      },
      //展开或者缩起侧边
      handleAideWidth(state){
        state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
      },
      SET_MENUS(state,menus){
        state.menus = menus
      },
      SET_RULENAMES(state,ruleNames){
        state.ruleNames = ruleNames
      }
    },
    actions:{
      //登录页面的action
      login({commit},{ username,password }){ //这里的commit好像没有用上
        return new Promise((resolve,reject)=>{
          login(username,password).then(res=>{
            setToken(res.token)
            resolve(res)
          }).catch(err=>reject(err))
        })
      },
      // 获取当前登录用户信息
      getinfo({ commit }){
        return new Promise((resolve,reject)=>{
          getinfo().then(res=>{
            //commit是同步操作，目的是store的提交
            //res是api接口中的res数据
            commit("SET_USERINFO",res)
            commit("SET_MENUS",res.menus)
            commit("SET_RULENAMES",res.ruleNames)
            // console.log(res);
            resolve(res)
          }).catch(err=>reject(err))
        })
      },
      // 退出用户登录
      logout({commit}){
        //移除cookies里面的token
        removeToken()
        //清除页面的状态vuex
        commit("SET_USERINFO",{})
      }
    }
  })
  
export default store