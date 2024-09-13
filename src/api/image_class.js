import axios from '~/axios'

export function getImageClassList(page){
    return axios.get("/admin/image_class/" + page)
}

//新增图片标题内容
export function createImageClass(data){
    return axios.post("/admin/image_class",data)
}

//编辑图片标题内容
export function updateImageClass(id,data){
    return axios.post("/admin/image_class/" + id,data)
}

//删除图片标题内容(注意是反引号)
export function deleteImageClass(id){
    return axios.post(`/admin/image_class/${id}/delete`)
}