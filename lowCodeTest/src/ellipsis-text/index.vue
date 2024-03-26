<template>
    <div>
        <div class='ellipsis-text' v-tooltip="{content: title}" v-if="!props.record.isEdit">{{ title }}</div>
        <div v-else>sssssss</div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
export interface EllipsisTextProps {
    record: Record<string, any>,
    text: string
}

const props = defineProps<EllipsisTextProps>()
console.log(props)

const title = ref<string>(props.text);
</script>
<style scoped>
.ellipsis-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 定义文本的最大显示行数 */
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
