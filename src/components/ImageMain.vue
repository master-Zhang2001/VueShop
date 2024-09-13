<template>
    <el-main class="image-main" v-loading="loading">
        <div class="top p-5">
            <el-row :gutter="20">
                <el-col :span="6" :offset="0" v-for="(item, index) in list" :key="index">
                    <!-- 卡片组件会有内间距一定要用:body-style改 -->
                    <el-card shadow="hover" class="relative mb-4" :body-style="'padding:0px'">
                        <el-image :src="item.url" fit="cover" class="h-[140px]" style="width: 100%;"
                            :preview-src-list="[item.url]" :initial-index="0">
                            <!-- 点击放大图片的功能 -->
                        </el-image>
                        <div class="image-title">{{ item.name }}</div>
                        <div class="flex item-center justify-center p-2">
                            <el-button type="primary" size="small" @click="handleEdit(item)">重命名</el-button>
                            <el-popconfirm title="是否要删除该图片？" confirm-button-text="确定" cancel-button-text="取消"
                                @confirm="handleDelete(item.id)">
                                <template #reference>
                                    <el-button type="primary" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-card>

                </el-col>
            </el-row>
        </div>
        <!-- 分页部分 -->
        <div class="bottom">
            <el-pagination :current-page="currentPage" layout="prev, 
            pager, next" :total="total" :page-size="limit" @current-change="getData" />
        </div>
    </el-main>
</template>

<script setup>
import { ref } from 'vue'
import { getImageList, updateImage, deleteImage } from '~/api/image.js'
import { showPrompt, toast } from '~/composables/util.js'
//分页动态参数
//1、当前页数
const currentPage = ref(1)
// 2、总共数据
const total = ref(0)
// 3、一页最大几条数据
const limit = ref(10)
const loading = ref(false)
const list = ref([])
const image_class_id = ref(0)
//获取数据的方法
function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p
    }
    console.log(p);
    loading.value = true
    getImageList(image_class_id.value, currentPage.value)
        .then(res => {
            total.value = res.totalCount
            list.value = res.list
        }).finally(() => {
            loading.value = false
        })
}
// 根据分类id重新加载图片列表
const loadData = (id) => {
    currentPage.value = 1
    image_class_id.value = id
    getData()
}
defineExpose({
    loadData
})
// 重命名
const handleEdit = (item) => {
    showPrompt('重命名', item.name)
        // 解构出res中的value
        .then(({ value }) => {
            loading.value = true
            // 调用接口
            updateImage(item.id, value)
                .then(res => {
                    item.name = value
                    toast("修改成功")
                    // 更新一下数据
                    getData()
                }).finally(() => {
                    loading.value = false
                })
        })
}
const handleDelete = (id) => {
    loading.value = true
    deleteImage([id])
        .then(res => {
            toast("删除成功")
            getData()
        }).finally(() => {
            loading.value = false
        })
}

</script>

<style>
.image-main {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.image-main .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-main .bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}

.image-title {
    @apply text-sm text-gray-600 bg-light-50 bg-opacity-50 px-2 truncate;
    position: absolute;
    top: 120px;
    left: -0.1px;
    right: -1px;
}
</style>