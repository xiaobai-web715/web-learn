<template>
    <div
        v-for="({ name, children}, index) in childrenList"
        :key="name"
    >
        <el-sub-menu
            v-if="Array.isArray(children) && children.length > 0"
            :index="`${indexKey}-${index+1}`"
        >
            <template #title>
                <span>{{ name }}</span>
            </template>
            <MenuItem
                :children-list="children"
                :index-key="`${indexKey}-${index+1}`"
            />
        </el-sub-menu>
        <el-menu-item
            v-else
            :index="`${indexKey}-${index+1}`"
        >
            {{ name }}
        </el-menu-item>
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
console.log('我传入的是啥',props.indexKey, props.childernList);
</script>