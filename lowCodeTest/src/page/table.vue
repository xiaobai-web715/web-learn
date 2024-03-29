<script setup lang="ts">
import {ref, onMounted} from "vue"
import TestTable from "./TestTable"
import {getTableData} from "../api/table"
const TestTableRef = ref(new TestTable())
const dataSource = ref([]);
const config = {
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b, target) => {
          const bName = b.name.first + b.name.last;
          const aName = a.name.first + a.name.last
          console.log("我是目标值", target, bName, aName)
          if (target === "descend") {
            return bName.length - aName.length
          } else {
            return aName.length - bName.length
          }
        },
        width: '20%',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' },
        ],
        width: '20%',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ],
    dataSource,
    onChange: handleTableChange
};
onMounted(() => {
  getTableData().then(res => {
    if (res.status == 200) {
      dataSource.value = res.data.tableData
    }
  })
})
function handleTableChange(pag, filters, sorter){
  console.log("升降序", sorter)
  const genderSearch = filters.gender;
  // 增加接口搜索功能
  getTableData({gender: genderSearch.join(',')}).then(res => {
    console.log("我是携带请求参数的", res.data.tableData)
    if (res.status == 200) {
      dataSource.value = res.data.tableData
    }
  })
}
TestTableRef.value.setConfig(config)
</script>
<template>
  <TestTableRef>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        {{ text.first }} {{ text.last }}
      </template>
    </template>
  </TestTableRef>
</template>