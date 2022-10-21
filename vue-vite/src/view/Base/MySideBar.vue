<template>
    <header class="my-side-bar">
        <!-- 侧边连部分可以对左侧导航的显示情况进行编辑 -->
        side-bar
    </header>
</template>
<script setup>
import {useStore} from 'vuex';
let store = useStore();
console.log('我的state仓库', store.state);
</script>
<style scoped lang="scss">
    .my-side-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 200px;
        height: 100%;
        padding: 90px 30px 90px 30px;
        box-sizing: border-box;
        background-color: #ededed;
        z-index:1;
    }
</style>