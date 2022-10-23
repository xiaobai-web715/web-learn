<template>
    <header class="my-side-bar">
        <!-- 侧边连部分可以对左侧导航的显示情况进行编辑 -->
        <ElMenu>
            <ElSubMenu
                v-for="({name, children}, index) in routeList"
                :key="name"
                :index="String(index+1)"
                class="moveUp"
            >
                <template #title>
                    <span class="icon">{{ name }}</span>
                </template>
                <MenuItem
                    v-if="Array.isArray(children) && children.length > 0"
                    :children-list="children"
                    :index-key="String(index+1)"
                />
            </ElSubMenu>
        </ElMenu>
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
@import '@/components/scss/color.scss';
@import '@/components/scss/position.scss';
    .my-side-bar {
        width: 200px;
        box-sizing: border-box;
        background-color:$sideBar_bgColor;
        color: $sideBar_fontColor;
        z-index:1;
        // scss下不支持/deep/的写法, 使用::v-deep可以成功 =>vue3废弃,改写成:deep(正常的样式选择器)
        :deep(.el-menu){
            &.el-menu--vertical{
                padding: 0;
            }
            .el-icon{
                svg{
                    // 先暂时关掉svg的样式显示
                    display: none;
                }
            }
            ul,li{
                margin:0;
                padding:0;
                list-style: none;
            }
            span{
                &.icon{
                    position: relative;
                    &::after{
                        content:''; //这一行是伪元素生效的关键
                        @include centerVertically;
                        transform: translateY(-75%) rotate(-45deg);
                        right:10px;
                        width:10px;
                        height:10px;
                        box-sizing: border-box;
                        border-left: 1px solid #333;
                        border-bottom: 1px solid #333;
                        z-index:11;
                    }
                }
            }
            .el-sub-menu__title{
                line-height: 50px;
                span{
                    width: 100%;
                    display: inline-block;
                    box-sizing:border-box;
                    padding: 0 20px;
                    &:hover{
                        background-color:#434A50;
                    }
                }
            }
            .menu_style2{
                span{
                    width: 100%;
                    display: inline-block;
                    box-sizing:border-box;
                    padding: 0 20px 0 40px;
                    &:hover{
                        background-color:#434A50;
                    }
                }
                line-height: 50px;
            }
            .menu_style3{
                span{
                    width: 100%;
                    display: inline-block;
                    box-sizing:border-box;
                    padding: 0 20px 0 60px;
                    &:hover{
                        background-color:#434A50;
                    }
                }
                line-height: 50px;
            }
            @keyframes moveOpen{
                0%{
                    opacity: 0;
                    transform: translateY(-100%/3);
                }
                100%{
                    opacity:1;
                    transform: translateY(200%/3);
                }
            }
            .moveUp{
                //添加动画效果 因为display:none 到display:bloak没办法实现动画效果,所以只能通过控制子元素来实现
                & > ul {
                    animation: moveOpen 0.1s linear;
                }
            }
        }
    }
</style>