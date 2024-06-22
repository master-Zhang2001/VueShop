<template>
    <div>
        <el-row :gutter="20">
            <template v-if="panels.length == 0">
                <el-col :span="6" v-for="i in 4" :key="i">
                    <el-skeleton style="width: 100%">
                        <template #template>
                            <el-card shadow="hover" class="border-0">
                                <template #header>
                                    <div class="flex justify-between text-sm">
                                        <el-skeleton-item variant="text" style="width: 50%" />
                                        <el-skeleton-item variant="text" style="width: 10%" />
                                    </div>
                                </template>
                                <el-skeleton-item variant="text" style="width: 80%" />
                                <el-divider />
                                <div class="flex justify-between text-sm text-gray-500">
                                    <el-skeleton-item variant="text" style="width: 40%" />
                                    <el-skeleton-item variant="text" style="width: 10%" />
                                </div>
                            </el-card>
                        </template>
                    </el-skeleton>
                </el-col>
            </template>
            <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
                <el-card shadow="hover" class="border-0">
                    <template #header>
                        <div class="flex justify-between text-sm">
                            <span>
                                {{ item.title }}
                            </span>
                            <el-tag :type="item.unitColor">
                                {{ item.unit }}
                            </el-tag>
                        </div>
                    </template>
                    <span class="text-3xl font-bold text-gray-500">
                        <!-- {{ item.value }} -->
                        <CountTo :value="item.value" />
                    </span>
                    <el-divider />
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <IndexNavs />
        <el-row :gutter="20">
            <el-col :span="12" :offset="0">
                <IndexChart />
            </el-col>
            <el-col :span="12" :offset="0" class="flex flex-col">
                <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns = "goods"/>
                <IndexCard title="交易提示" tip="需要立即处理的交易订单" :btns = "order"/>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { getStatistics1,getStatistics2 } from '~/api/index.js'
import { ref } from "vue";
import CountTo from '~/components/CountTo.vue'
import IndexNavs from '~/components/IndexNavs.vue'
import IndexChart from '~/components/IndexChart.vue'
import IndexCard from '~/components/IndexCard.vue'
const panels = ref([])
//面板1接口函数
getStatistics1().then(res => {
        panels.value = res.panels
        console.log(panels.value);
    })

const goods = ref([])
const order = ref([])
//面板2接口函数
getStatistics2().then(res => {
    // console.log(res.goods);
    goods.value = res.goods
    order.value = res.order
})
</script>

<style></style>