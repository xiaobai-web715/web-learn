<template>
    <div
        v-for="({ name, children}, index) in childrenList"
        :key="name"
    >
        <ElSubMenu
            v-if="Array.isArray(children) && children.length > 0"
            :index="`${indexKey}-${index+1}`"
            :class="`menu_style${indexKey.split('-').length + 1} moveUp`"
        >
            <template #title>
                <span class="icon">{{ name }}</span>
            </template>
            <MenuItem
                :children-list="children"
                :index-key="`${indexKey}-${index+1}`"
            />
        </ElSubMenu>
        <ElMenuItem
            v-else
            :index="`${indexKey}-${index+1}`"
            :class="`menu_style${indexKey.split('-').length + 1}`"
        >
            <span>{{ name }}</span>
        </ElMenuItem>
    </div>
</template>
<script setup>
import {defineProps} from 'vue';
import {ElMenuItem,ElSubMenu} from 'element-plus';
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
</script>
<style scoped lang="scss">
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
</style>