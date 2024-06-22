import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      //~标明是src路径下的文件
      "~":path.resolve(__dirname,"src")
    }
  },
  //传入的/api代替了这个域名，主要目的是在前端的时候不这样做会产生一个
  //跨区域的错误提示
  server:{
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
  }},
  plugins: [vue(),WindiCSS()]
})
