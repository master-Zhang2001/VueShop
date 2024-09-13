<template>
    <el-aside width="200px" class="image-aside" v-loading="loading">
        <div class="top">
            <AsideList :active="activedId == item.id" v-for="(item, index) in list" :key="index"
                @edit="handleEdit(item)" @delete="handleDelete(item.id)" @click="handleChangeActiveId(item.id)">
                {{ item.name }}
            </AsideList>
        </div>
        <!-- 分页的功能 -->
        <div class="bottom">
            <el-pagination :current-page="currentPage" size="small" layout="prev, 
            pager, next" :total="total" :page-size="limit" @current-change="getData" />
        </div>
    </el-aside>
    <FormDrawer :title="drawerTitle" ref="formDrawerRef" destroyOnClose @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="1" :max="1000" />
            </el-form-item>
        </el-form>
    </FormDrawer>
    <!-- 新增图片的组件 -->
    <FormDrawer title="新增图片" ref="formDrawerPictureRef" @submit="handleSubmitPicture">
        <!-- 上传内容 -->
        <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                </div>
            </template>
        </el-upload>
    </FormDrawer>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import FormDrawer from '~/components/FormDrawer.vue'
import AsideList from './AsideList.vue'
import { getImageClassList, createImageClass, updateImageClass, deleteImageClass } from '~/api/image_class.js'
import { toast } from '~/composables/util.js'
const loading = ref(false)
const list = ref([])

//分页动态参数
//1、当前页数
const currentPage = ref(1)
// 2、总共数据
const total = ref(0)
// 3、一页最大几条数据
const limit = ref(10)
//编辑的id，很重要
const editId = ref(0)
const formDrawerRef = ref(null)
const formDrawerPictureRef = ref(null)
//接收到的参数是一个页码
//第一步：得到数据
function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p
    }
    console.log(p);
    loading.value = true
    getImageClassList(currentPage.value)
        .then(res => {
            total.value = res.totalCount
            loading.value = true
            //高亮第一个选项,默认第一个是高亮的或者说选中的
            list.value = res.list
            let item = list.value[0]
            if (item) {
                // activedId.value = item.id
                //获取图库分类之后就获取数据
                handleChangeActiveId(item.id)
            }
        }).finally(() => {
            loading.value = false
        })
}
getData()
//传的参数
const form = reactive({
    name: '',
    order: 50
})
//输入规则
const rules = {
    name: [{
        required: true,
        message: "图库分类名称不能为空",
        trigger: 'blur'
    }],
    order: [{
        required: true,
        message: "排序不能为空",
        trigger: 'blur'
    }]
}
const formRef = ref(null)
//弹窗的标题：有bug
const drawerTitle = computed(() => editId.value ? "修改" : "新增")
//新增图片标题方法
const handleCreate = () => {
    form.name = ''
    form.order = 50
    //解决bug，不然的话就新增和修改会冲突
    editId.value = 0
    formDrawerRef.value.open()
}
const handlePictureCreate = () => {
    //写入新增的图片上传内容
    formDrawerPictureRef.value.open()
}
//提交方法(新增和编辑)
const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return
        }
        formDrawerRef.value.showLoading()
        loading.value = true
        const fun = editId.value ? updateImageClass(editId.value, form) : createImageClass(form)
        fun.then(res => {
            toast(drawerTitle.value + "成功")
            getData(editId.value ? currentPage.value : 1)
            formDrawerRef.value.close()
        })
            .finally(() => {
                formDrawerRef.value.hideLoading()
                loading.value = false
            })
    })
}
//编辑方法
const handleEdit = (row) => {
    console.log(row);
    editId.value = row.id
    form.name = row.name
    form.order = row.order
    formDrawerRef.value.open()
}
//删除方法
const handleDelete = (id) => {
    loading.value = true
    deleteImageClass(id).then(res => {
        toast("删除成功")
        getData()
    }).finally(() => {
        loading.value = false
    })
}
//拿到第一个分类id
const activedId = ref(0)
// 定义一个名为emit的常量，它是一个函数，用于触发名为change的事件
const emit = defineEmits(['change'])
// 定义一个函数，用于改变当前激活的id
function handleChangeActiveId(id){
    // 将传入的id赋值给activedId.value
    activedId.value = id
    // 触发change事件，并传入id作为参数
    emit("change",id)
}
defineExpose({
    handleCreate,
    handlePictureCreate
})
</script>
<style>
.image-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.image-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-aside .bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}
</style>