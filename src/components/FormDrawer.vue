<template>
    <el-drawer v-model="showDrawer" 
    :title="title" 
    :size="size" 
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose">
        <div class="formDrawer">
            <!-- 表单内容部分 -->
            <div class="body">
                <!-- 插槽 -->
                <slot></slot>
            </div>
            <!-- 按钮部分 -->
            <div class="actions">
                <el-button type="primary" @click="submit" :loading="loading">{{ comfirmText }}</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)

const props = defineProps({
    title: String,
    size: {
        type: String,
        //默认值，抽屉的宽度
        default: "45%"
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    },
    comfirmText: {
        type: String,
        default: "提交"
    }
})
//加载按钮
const loading = ref(false)
const showLoading = () =>loading.value = true
const hideLoading = () =>loading.value = false
//打开
const open = () => showDrawer.value = true
//关闭
const close = () => showDrawer.value = false

//提交 注意查看该用法
const emit = defineEmits(["submit"])
const submit = () => emit("submit")

// 向父组件暴露以下方法
defineExpose({
    open,
    close,
    showLoading,
    hideLoading
})

</script>

<style>
.formDrawer {
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex flex-col;
}

.formDrawer .body {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    /* 超出部分有滚动线 */
    overflow-y: auto;
}

.formDrawer .actions {
    height: 50px;
    @apply mt-auto flex items-center
}
</style>