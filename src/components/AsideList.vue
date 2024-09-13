<template>
    <div class="aside-list" :class="{ 'active': active }">
        <!-- 溢出出现... -->
        <span class="truncate">
            <slot />
        </span>
        <!-- .stop是为了防止触发未选中项的事件之后又选中该事件的文本框 -->
        <el-button class="ml-auto px-1" text type="primary" size="small" @click.stop="$emit('edit')">
            <el-icon :size="12">
                <Edit />
            </el-icon>
        </el-button>
        <el-popconfirm title="是否要删除该分类？" confirm-button-text="确定" cancel-button-text="取消"
            @confirm.stop = "$emit('delete')">
            <template #reference>
                <el-button class="px-1" text type="primary" size="small">
                    <el-icon :size="12">
                        <Close />
                    </el-icon>
                </el-button>
            </template>
        </el-popconfirm>
    </div>
</template>

<script setup>
//暴露变量和事件给imageAside或者其他组件调用；
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})
//自定义事件
defineEmits(["edit", "delete"])
</script>

<style>
.aside-list {
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center p-3 text-sm text-gray-600;
}

.aside-list:hover,
.active {
    @apply bg-blue-50;
}
</style>