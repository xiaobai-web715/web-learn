<template>
    <div>111</div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
const age = ref(18);
const getAge = computed(() => {
    console.log("我重新计算了吗")
    return age.value + 1;
});
watch(() => age.value, (newVal) => {
    console.log("年龄的值发生了变化", newVal);
});
setInterval(() => {
    age.value += 1;
    console.log("获取计算属性的值", getAge.value);
}, 1000);
</script>
<style lang="scss" scoped></style>