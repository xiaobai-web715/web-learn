<template>
  <div v-for="(item) in arrayList" :key="item">
    {{  item }}
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue"
const { value } = defineProps<{
  value: number
}>()
const arrayList = computed(() => {
  return Array.from({length: 10}).map((_, index) => {
    return value * 10 + index
  })
})
</script>
