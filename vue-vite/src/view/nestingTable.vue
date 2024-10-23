<template>
    <a-table :data-source="dataSource" :columns="wrapperColumns" rowKey="id" @expandedRowsChange="expandedRowsChange">
        <template #expandedRowRender = "{record, index, indent, expanded}">
            <a-table 
                :data-source="innerDataList[index]" 
                :columns="innerColumns" 
                :pagination="{
                    total: totalList[index] || 0,
                    current: currentList[index] || 1,
                    pageSize: pageSizeList[index] || 10,
                    onChange: (page, pageSize) => changePageSize(page, pageSize, index)
                }" 
                rowKey="sonId"
            ></a-table>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const dataSource = ref<Record<string, any>[]>([])
const innerDataList = ref<Record<string, any>[]>([])
const currentList = ref<number[]>([])
const pageSizeList = ref<number[]>([])
const totalList = ref([])
const wrapperColumns = [
    {
        title: '西瓜',
        dataIndex: 'test1',
    },
    {
        title: '香蕉',
        dataIndex: 'test2'
    }
]
const innerColumns = [
    {
        title: '姓名',
        dataIndex: 'name',
    },
]
onMounted(() => {
    console.log('获取数据')
    dataSource.value = [
        {
            test1: '有籽',
            test2: '长',
            id: 1
        },
        {
            test1: '无籽',
            test2: '短',
            id: 2
        }
    ]
})
const expandedRowsChange = (expandedRows) => {
    console.log('expandedRows', expandedRows)
    innerDataList.value[0] = [
        {
            name: '刘兴华',
            sonId: 1
        }
    ]
    totalList.value[0] = 100
}
const changePageSize = (page, pageSize, index) => {
    console.log('传入的字段值', page, pageSize, index)
    innerDataList.value[index] = [
        {
            name: `刘兴华${page + '-' + pageSize}`,
            sonId: 1
        }
    ]
    currentList.value[index] = page
    pageSizeList.value[index] = pageSize
}
</script>
<style lang="less" scoped>
</style>