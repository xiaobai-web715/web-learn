<template>
    <div class="select-tip">
        已选择客户&nbsp;&nbsp;<a style="font-weight: 500">{{
            props.instance.selectedRows?.length
        }}</a
        >&nbsp;&nbsp;个,
        号码&nbsp;&nbsp;<a style="font-weight: 500">{{
            props.instance.selectedRows?.length
        }}</a
        >&nbsp;&nbsp;个;
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
export interface TipProps {
    instance: any
}
const props = defineProps<TipProps>()

</script>
<style scoped>
.select-tip {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
