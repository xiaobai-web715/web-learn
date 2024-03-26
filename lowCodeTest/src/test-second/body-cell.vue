<template>
    <div class="select-tip">
       22222
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
export interface TipProps {
    obj: any
}
const props = defineProps<TipProps>()
console.log(props.obj, 1111)
</script>
<style scoped>
.select-tip {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
