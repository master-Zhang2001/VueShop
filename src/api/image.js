import axios from "~/axios"
//得到图片列表
export function getImageList(id,page=1){
    // 注意不是分号
    return axios.get(`/admin/image_class/${id}/image/${page}`)
}
//重命名图片名称
export function updateImage(id,name){
    return axios.post(`/admin/image/${id}`,{name})
}
//删除图片,ids是图片的id
export function deleteImage(ids){
    return axios.post('/admin/image/delete_all',{ids})
}

