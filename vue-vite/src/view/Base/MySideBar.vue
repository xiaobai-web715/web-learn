<template>
    <header class="my-side-bar">
        <!-- 侧边连部分可以对左侧导航的显示情况进行编辑 -->
        <ElMenu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <MenuItem
                :children-list="routeList"
                index-key="null"
            />
        </ElMenu>
    </header>
</template>
<script setup>
import {useStore} from 'vuex';
import {computed} from 'vue';
import MenuItem from './MenuItem.vue';
import {ElMenu} from 'element-plus';
const store = useStore();
const routeList = computed(() => {
    let routeList = store.state.routeTree.filter(item => item.path === '/')[0].children.filter(item => item.name !== 'home');
    return routeList;
});
</script>
<style scoped lang="scss">
@import '@/components/scss/color.scss';
@import '@/components/scss/position.scss';
    .my-side-bar {
        width: 200px;
        z-index:1;
        .el-menu{
            height: 100%;
        }
    }
</style>