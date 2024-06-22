<template>
    <el-card shadow="hover" class="mt-5">
        <template #header>
            <div class="flex items-center justify-center">
                <span class="text-sm">订单统计</span>
                <div class="ml-auto">
                    <el-check-tag v-for="(item, index) in options" :key="index" class="ml-4"
                        @click="handleChoose(item.value)" :checked="current == item.value">
                        {{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>
        <div id="chart" style="width: 100%; height: 287.5px;">
        </div>
    </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { getStatistics3 } from '~/api/index.js'
// import { useResizeObserver } from '@vueuse/core'

//选项框的导入
const current = ref("week")
const options = [{
    text: "近一个月",
    value: "month"
}, {
    text: "近一周",
    value: "week"
}, {
    text: "近24小时",
    value: "hour"
}]
//选择订单统计事件的方法
const handleChoose = (type) => {
    // console.log(type);
    current.value = type
    getDate()
}

var myChart = null
onMounted(() => {
    // 拿到DOM元素chart
    var chartDom = document.getElementById('chart')
    //出错
    myChart = echarts.init(chartDom)
    getDate()
})

//销毁节点 释放空间！！！！！！
onBeforeUnmount(() => {
    if (myChart) {
        echarts.dispose(myChart)
    }
})
function getDate() {
    //柱状图
    let option = {
        // color:['#6163FE'],
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180,180,180,0.2)'
                }
            }
        ]
    }
    // option && myChart.setOption(option);
    myChart.showLoading()
    getStatistics3(current.value).then(res => {
        // console.log(current.value);
        // console.log(res);
        option.xAxis.data = res.x
        option.series[0].data = res.y
        myChart.setOption(option)
    }).finally(() => {
        myChart.hideLoading()
    })
    //要释放掉mychart
}
//图像等比例缩放
// useResizeObserver(el, (entries) => {
//     const entry = entries[0]
//     const { width, height } = entry.contentRect
//     text.value = `width: ${width}, height: ${height}`
// })
</script>
<style></style>