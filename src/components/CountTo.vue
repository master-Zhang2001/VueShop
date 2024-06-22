<!-- 实现数字滚动功能 -->


<template>
    <!-- 直接就是整数 -->
    {{ d.num.toFixed(0) }}
</template>
<script setup>
import gsap from "gsap"
import { reactive,watch } from 'vue'
// 从父组件传value值
const props = defineProps({
    value:{
        type:Number,
        default:0
    }
})
const d = reactive({
    num:0
})

function AnimateToValue(){
    gsap.to(d,{
        duration:0.5,
        num:props.value
    })
}
AnimateToValue()
// 监听一下props值有没有变化，有变化的话重新执行以下动画
watch(()=>props.value,()=>AnimateToValue())
</script>