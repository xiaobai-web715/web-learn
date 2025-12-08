<template>
  <button @click="updateCount">点击增加功能</button>
  <arrayComponent :value="count"></arrayComponent>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import arrayComponent from './arrayComponent.vue';
const count = ref(0)
function updateCount() {
  count.value++;
}
</script>
