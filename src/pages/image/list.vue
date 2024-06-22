<template>
    <el-container :style="{ height:h + 'px' }">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<script setup>
//拿到元素的高度
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 40 - 40
</script>


<style>

</style>