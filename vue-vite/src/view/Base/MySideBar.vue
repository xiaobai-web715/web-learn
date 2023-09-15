<template>
    <header class="my-side-bar">
        <MenuTable
            class="menu-style"
            :menus="routeList"
            :icon-list="iconList"
        />
    </header>
</template>
<script lang="ts">
import {mapState} from 'vuex';
import MenuTable from '@/components/menu/menu.vue';
import {IRouterRecordRaw} from '@/router/route';
export default {
    components: {
        MenuTable,
    },
    setup() {
        const iconList = ['ElementPlus'];
        return {
            iconList
        };
    },
    computed: {
        ...mapState({
            'routeList': (state: IState) => ((state.routeTree.filter((item : IRouterRecordRaw) => item.path === '/')[0] || []).children || []).filter((item : IRouterRecordRaw) => item.path !== 'home')
        })
    },
};
</script>
<style scoped lang="scss">
    .my-side-bar {
        width: 200px;
        z-index:1;
        .el-menu{
            height: 100%;
        }
        :deep() .menu-1,.menu-2,.menu-3{
            width: 100%;
            box-sizing: border-box;
            .title{
                height: 100%;
                &:hover{
                    background-color: rgba(84, 92, 100, 1);
                }
            }
        }
        :deep() .menu-1{
            .title{
                height: 56px;
                line-height: 56px;
                font-size: 14px;
                padding-left: 20px;
            }
        }
        :deep() .menu-2{
            .title{
                height: 50px;
                line-height: 50px;
                font-size: 12px;
                padding-left: 40px;
            }
        }
        :deep() .menu-3{
            .title{
                font-size: 10px;
            }
        }
    }
    .menu-style{
        background-color: rgba(84, 92, 100, 0.8);
        height: 100%;
    }
</style>@/store/state/state