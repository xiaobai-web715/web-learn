<template>
    <el-table
        :data="props.dataList"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
    >
        <el-table-column
            v-for="item in props.colums"
            :key="item.prop"
            :label="item.title"
            :prop="item.prop"
        >
            <template
                v-if="typeof item.custom === 'function'"
                #default="scope"
            >
                <span>{{ item.custom(scope.row[item.prop], scope.row, scope.$index) }}</span>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup>
import { defineProps } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
const props = defineProps({
    dataList: {
        type: Array,
        required: true,
    },
    colums: {
        type: Array,
        required: true,
    },
    dataTotal: {
        type: Number,
        required: true,
    },
    headerCenter: {
        type: [Boolean , Object],
        default(){
            return true;
        }
    },
    contentCenter: {
        type: [Boolean , Object],
        default(){
            return true;
        }
    }
});
</script>