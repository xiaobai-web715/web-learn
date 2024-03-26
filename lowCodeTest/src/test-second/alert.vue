<template>
    <e-space class="edy-table-alert">
        <e-button type="primary">批量认领</e-button>
        <e-button type="primary">批量加入计划草稿</e-button>
        <e-button type="primary">批量认领并加入计划草稿</e-button>
    </e-space>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
export interface TipProps {
    instance: any
}
const props = defineProps<TipProps>()

</script>
<style scoped lang="less">
.edy-table-alert {
}
</style>
