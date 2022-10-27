<template>
    <div
        v-for="({ name, children, props}, index) in childrenList"
        :key="name"
    >
        <ElSubMenu
            v-if="Array.isArray(children) && children.length > 0"
            :index="`${indexKey !== 'null' ? (indexKey + '-' + index+1) : index +1 }`"
            :class="`${indexKey !== 'null' ? 'menu_style' + (indexKey.split('-').length + 1) : ''} moveUp`"
        >
            <template #title>
                <span class="icon">{{ props.title }}</span>
            </template>
            <MenuItem
                :children-list="children"
                :index-key="`${indexKey !== 'null' ? (indexKey + '-' + index+1) : index +1 }`"
            />
        </ElSubMenu>
        <ElMenuItem
            v-else
            :index="`${indexKey !== 'null' ? (indexKey + '-' + index+1) : index +1 }`"
            :class="`${indexKey !== 'null' ? 'menu_style' + (indexKey.split('-').length + 1) : ''} moveUp`"
        >
            <!-- @click="jumpRoute(props.filePath)" -->
            <!-- 按照导航菜单的想法有子菜单的不会跳转路由 -->
            <router-link
                :to="{name}"
            >
                <span class="routerStyle">{{ props.title }}</span>
            </router-link>
        </ElMenuItem>
    </div>
</template>
<script setup>
import {defineProps} from 'vue';
import {useRouter} from 'vue-router';
import {ElMenuItem,ElSubMenu} from 'element-plus';
const router = useRouter();
const props = defineProps({
    indexKey: {
        type: String,
        default: '1'
    },
    childrenList: {
        type: Array ,
        default(val){
            console.log('...',val);
            return [];
        }
    }
});
// const jumpRoute = (path) => {
//     console.log('path', path);
//     router.push(path);
// };
</script>
<style scoped lang="scss">
.router-link{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    z-index:12;
    opacity: 1;
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
    //不过动画效果有些奇怪
    & > ul {
        animation: moveOpen 0.1s linear;
    }
}
.routerStyle{
    color:#fff;
}
</style>