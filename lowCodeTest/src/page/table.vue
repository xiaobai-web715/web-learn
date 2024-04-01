<script setup lang="ts">
import {ref, onMounted, reactive} from "vue"
import TestTable from "./TestTable"
import {getTableData} from "@/api/table"
import {EditOutlined} from "@ant-design/icons-vue"
const TestTableRef = ref<TestTable>(new TestTable())
const dataSource = ref([]);
const editableData = reactive({})
const config = {
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => {
          const bName = b.name.first + b.name.last;
          const aName = a.name.first + a.name.last
          const result = bName.length - aName.length;
          return result
        },
        width: '10%',
        ellipsis: true,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        align: "center",
        filters: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' },
        ],
        colSpan: 2,
        width: '150px'
      },
      {
        title: "所在城市",
        dataIndex: "location",
        colSpan: 0,
        align: "center",
        width: '150px'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: '200px',
        customCell: (_, index) => {
          console.log("index", index)
          if (index == 6) {
            return {
              rowSpan: 0
            }
          } 
        },
      },
    ],
    dataSource,
    bordered: true,
    onChange: handleTableChange
};
TestTableRef.value.setConfig(config)
TestTableRef.value.afterRequest([])
onMounted(() => {
  getTableData().then(res => {
    if (res.status == 200) {
      dataSource.value = res.data.tableData
    }
  })
})
function handleTableChange(pag, filters, sorter){
  const genderSearch = filters.gender || [];
  console.log("升降序", genderSearch, sorter)
  // 增加接口搜索功能
  getTableData({gender: genderSearch.join(',')}).then(res => {
    if (res.status == 200) {
      dataSource.value = res.data.tableData
    }
  })
}
const edit = (key: string) => {
  editableData[key] = dataSource.value.find((item: Record<string, any>) => item.phone == key)
}
const save = (key: string) => {
  editableData[key] = null
}
</script>
<template>
  <TestTableRef>
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        {{ text.first }} {{ text.last }}
      </template>
      <template v-else-if="column.dataIndex === 'location'">
        {{ text.city }}
      </template>
      <template v-else-if="column.dataIndex === 'email'">
        <div class="editable-cell">
          <div
            v-if="editableData[record.phone]"
            class="editable-cell-input-wrapper"
          >
            <a-input
              v-model:value="editableData[record.phone].email"
              @press-enter="save(record.phone)"
            />
            <check-outlined
              class="editable-cell-icon-check"
              @click="save(record.phone)"
            />
          </div>
          <div
            v-else
            class="editable-cell-text-wrapper flex"
          >
            {{ text || ' ' }}
            <EditOutlined
              class="editable-cell-icon"
              @click="edit(record.phone)"
            />
          </div>
        </div>
      </template>
    </template>
  </TestTableRef>
</template>