<template>
    <div
        v-for="({ name, children, props}, index) in childrenList"
        :key="name"
    >
        <ElSubMenu
            v-if="Array.isArray(children) && children.length > 0"
            :index="`${indexKey !== 'null' ? (indexKey + '-' + index+1) : index +1 }`"
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
        >
            <!-- @click="jumpRoute(props.filePath)" -->
            <!-- 按照导航菜单的想法有子菜单的不会跳转路由 -->
            <!-- <router-link
                :to="{name}"
            > -->
            <span @click="jumpRoute(props.filePath)">{{ props.title }}</span>
            <!-- </router-link> -->
        </ElMenuItem>
    </div>
</template>
<script setup>
// import {defineProps} from 'vue';
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
            return [];
        }
    }
});
const jumpRoute = (path) => {
    router.push(path);
};
</script>
<style scoped lang="scss">
</style>