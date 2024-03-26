<template>
  <SuperTable :instance="testTable">
    <template #headerCell="{ column }">
      {{ fulfill(column) }}
      <template v-if="column.key === 'contactPhone'">
        <span>
          <smile-outlined />
          contactPhone
        </span>
      </template>
    </template>
  </SuperTable>
</template>
<script lang="ts" setup>
// @ts-nocheck 禁用整个文件的ts校验
import { reactive } from 'vue';
import SuperTable from '../super-table/index.vue';
import TestTable from './TestTable';

import CompanyName from '../company-name/index.vue';
import EllipsisText from '../ellipsis-text/index.vue';
import { highHockComponent } from '../super-table/lc-hock';

import SelectedTipsComp from './select-tips.vue';
import Alert from './alert.vue';
// import Operate from './operate.vue';
import BodyCell from './body-cell.vue';

import tableData from './request.ts';

const dataSource = tableData.reduce((arr, user) => {
    const contactInfoList = user.contactInfoList;
    contactInfoList.forEach((contactInfo) => {
        const { id , name, contactPhoneInfoList} = contactInfo;
        contactPhoneInfoList.forEach((contactPhoneInfo) => {
            arr.push({
                ...user,
                contactInfoId: id,
                contactInfoName: name,

            })
        });
    });
    return arr;
}, [])

const fulfill = (column) => {
    console.log("我被执行了", column)
}

const testTable = reactive(new TestTable());
const headerSettings = {
    selectedTipsComp: SelectedTipsComp,
    alert: Alert,
    // operate: Operate
}
const config = {
    bordered: true,
    scroll: {
        x: 1500,
        y: 500
    },
    bodyCell: BodyCell,
    rowSelection: {
        selectedRowKeys: [],
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows)
        }
    },
    pagination: {
        total: 100,
    },
    columns: [ 
        { title: 'ID', dataIndex: 'id', key: 'id', width: 80, fixed: 'left', customCell: (_, index) => {
            if (index === 1) {
                return { rowSpan: 3 };
            }
            // These two are merged into above cell
            if (index === 2 || index === 3) {
                return { rowSpan: 0 };
            }
        }},
        { title: '姓名', dataIndex: 'name', key: 'name', width: 180, fixed: 'left', customRender: highHockComponent(CompanyName)({instance: testTable}) },
        { title: '联系人', dataIndex: 'contactInfoName', key: 'contactInfoName', width: 100,  customCell: (_, index) => {
            if (index === 1) {
                return { rowSpan: 2 };
            }
            // These two are merged into above cell
            if (index === 2) {
                return { rowSpan: 0 };
            }
        }},
        { title: '号码', dataIndex: 'contactPhone', key: 'contactPhone', width: 140 },
        { title: '最近拨打时间', dataIndex: 'lastCallTime', key: 'lastCallTime', width: 140 },
        { title: '时长', dataIndex: 'lastCallDuration', key: 'lastCallDuration', width: 100 },
        { title: '销售记录', dataIndex: 'lastSaleRecord', key: 'lastSaleRecord', width: 140, customRender: highHockComponent(EllipsisText)() },
        { title: '录音', dataIndex: 'lastCallFile', key: 'lastCallFile', width: 120 },
        { title: '回归前阶段', dataIndex: 'returnPhaseDesc', key: 'returnPhaseDesc', width: 120 },
        { title: '客户状态', dataIndex: 'statusName', key: 'statusName', width: 120 },
        { title: '位置', dataIndex: 'positionName', key: 'positionName', width: 100 },
        { title: '客户流入阶段', dataIndex: 'status1', key: 'status1', width: 120 },
        // { title: '上次回归公海', dataIndex: 'gonghai', key: 'gonghai', width: 100 },
        // { title: '营业时间', dataIndex: 'time', key: 'time', width: 100 },
        // { title: '回归剩余', dataIndex: 'huiguishengyu', key: 'huiguishengyu', width: 100 },
        // { title: '客户等级', dataIndex: 'level', key: 'level', width: 100 },
        // { title: '城市', dataIndex: 'city', key: 'city', width: 100 },
        // { title: '是否百城客户', dataIndex: 'isbaicheng', key: 'isbaicheng', width: 100 },
        // { title: '账户类型', dataIndex: 'type', key: 'type', width: 100 },
        // { title: '创建时间', dataIndex: 'create', key: 'create', width: 100 },
        { title: '操作', dataIndex: 'operate', key: 'operate', width: 100, fixed: 'right' },
    ],
    dataSource: dataSource
};
testTable.setConfig(config, headerSettings);
testTable.request();

const props = defineProps({
    isFormItem: Boolean,
    config: Object,
})
</script>
./TestTable.ts../super-table/lc-hock.ts