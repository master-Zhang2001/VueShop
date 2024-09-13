<template>
  <el-container :style="{ height: h + 'px' }" class="bg-light-50">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate">新增图库分类</el-button>
      <el-button type="warning" size="small" @click="handleOpenPictureCreate">新增图片</el-button>
    </el-header>
    <el-container>
      <!-- @change="handleAsideChange"来接收imageAside组件传递过来的id -->
      <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
      <ImageMain ref="ImageMainRef" />
    </el-container>
  </el-container>
</template>
<script setup>
import { ref } from 'vue'
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
//拿到元素的高度
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 40 - 40
const ImageAsideRef = ref(null)
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()
const handleOpenPictureCreate = () => ImageAsideRef.value.handlePictureCreate()
const ImageMainRef = ref(null)
const handleAsideChange = (image_class_id) => {
  // 调用ImageMainRef对象的loadData方法，并传入image_class_id参数
  ImageMainRef.value.loadData(image_class_id)
  console.log(image_class_id);
} 
</script>

<style lang="scss">
.image-header {
  border-bottom: 2px solid #eeeeee;
  @apply flex items-center;
}

.image-header {
  border-bottom: 2px solid #eeeeee;
  @apply flex items-center;
}
</style>