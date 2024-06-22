import axios from '~/axios'
//首页的支付订单、订单量等数据
export function getStatistics1(){
    return axios.get("/admin/statistics1")
}

export function getStatistics2(){
    return axios.get("/admin/statistics2")
}
//获得柱状图的参数
export function getStatistics3(type){
    return axios.get("/admin/statistics3?type="+type)
}

