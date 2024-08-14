<!--
 * @Author: ***
 * @Date: 2024-08-14 08:47:43
 * @LastEditTime: 2024-08-14 09:11:36
 * @LastEditors: ***
 * @Description: 
 * @FilePath: \web-learn\vue-vite\src\view\testVXTable.vue
 * 加油搞起来
-->
<template>
  <div class="height">
    <vxe-table
      :data="tableData"
      :scroll-y="{ enabled: true, gt: 0 }"
      height="200"
    >
      <vxe-column field="text1" title="测试表格1"></vxe-column>
    </vxe-table>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

const tableData = ref<Record<string, any>[]>();
onMounted(() => {
  console.log("页面");
  const result = new Array(50).fill(1).map((item: number, index: number) => {
    return {
      id: index,
      text1: "hah" + index,
    };
  });
  tableData.value = result;
});
</script>
