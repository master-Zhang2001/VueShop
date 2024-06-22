import { ElNotification,ElMessageBox} from 'element-plus'
import nprogress from 'nprogress'
//消息提示框：
export function toast(message,type="success",dangerouslyUseHTMLString="false"){
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration:3000
        })
}
//内容选项确认或者取消框(在屏幕中间)
export function showModel(content = "内容提示", type="warning", title="警告"){
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type,
        }
      )
}
//显示全屏页面的loading
export function showFullLoading(){
  nprogress.start()
}
//隐藏全屏loading
export function hideFullLoading(){
  nprogress.done()
}