<template>
    <div class="select-tip">
        已选择&nbsp;&nbsp;<a style="font-weight: 500">{{
            props.selectedLength
        }}</a
        >&nbsp;&nbsp;项
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
export interface TipProps {
    selectedLength: number
}
const props = defineProps<TipProps>()
console.log(props, 1111)

</script>
<style scoped>
.select-tip {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
