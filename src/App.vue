<template>
    <router-view></router-view>
</template>

<script setup>

</script>

<style>
/* #nprogress .bar{
    
    display: none!important;
} */
/* #nprogress .spinner{
    background-color: #4d22dd!important; 
} */
/* 加载数据进度条 */
#nprogress .bar{
    background-color: #2244dd!important;
    height: 2.5px!important;
}

::-webkit-scrollbar{
    width: 4px;
    height: 6px;
}
::-webkit-scrollbar-corner{
    display: block;
}
::-webkit-scrollbar-thumb{
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track{
    border-right-color: transparent;
    border-left-color: transparent;
    background-color: rgba(0, 0, 0, 0.1);
}
</style> 