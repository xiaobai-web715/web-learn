<template>
    <header class="my-side-bar">
        <!-- 侧边连部分可以对左侧导航的显示情况进行编辑 -->
        <el-menu>
            <el-sub-menu
                v-for="({name, children}, index) in routeList"
                :key="name"
                :index="String(index+1)"
            >
                <template #title>
                    <i class="el-icon-location" />
                    <span>{{ name }}</span>
                </template>
                <MenuItem
                    v-if="Array.isArray(children) && children.length > 0"
                    :children-list="children"
                    :index-key="String(index+1)"
                />
            </el-sub-menu>
        </el-menu>
    </header>
</template>
<script setup>
import {useStore} from 'vuex';
import {computed} from 'vue';
import MenuItem from './MenuItem.vue';
import {ElSubMenu, ElMenu} from 'element-plus';
const store = useStore();
const routeList = computed(() => {
    let routeList = store.state.routeTree.filter(item => item.path === '/')[0].children.filter(item => item.name !== 'home');
    return routeList;
});
</script>
<style scoped lang="scss">
    .my-side-bar {
        width: max-content;
        padding: 0 30px 0 0;
        box-sizing: border-box;
        background-color: #ededed;
        z-index:1;
        // scss下不支持/deep/的写法, 使用::v-deep可以成功 =>vue3废弃,改写成:deep(正常的样式选择器)
        :deep(.el-menu){
            .el-icon{
                svg{
                    // 先暂时关掉svg的样式显示
                    display: none;
                }
            }
        }
    }
</style>