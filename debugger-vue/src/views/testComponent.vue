<template>
  <div>doubleCount is : {{ doubleCount }}</div>
  <button @click="updateCount">点击增加功能</button>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
debugger
console.log("开始执行testComputed的值")
const count = ref(0)
const doubleCount = computed(() => count.value * 2)
function updateCount() {
  count.value++;
}
</script>
