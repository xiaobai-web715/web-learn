<template>
    <el-table
        :data="props.dataList"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
    >
        <template
            v-for="item in props.colums"
            :key="item.prop"
        >
            <el-table-column
                v-if="Array.isArray(item.buttons)"
                :label="item.title"
            >
                <template
                    #default="scope"
                >
                    <div class="columnStyle">
                        <el-button
                            v-for="(button, index) in item.buttons"
                            :key="button.title + index"
                            :type="button.type"
                            @click="button.callback(scope.row, scope.$index)"
                        >
                            {{ button.title }}
                        </el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                v-else
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
        </template>
    </el-table>
    <el-pagination
        v-if="props.havePagination"
        v-model:current-page="page"
        background
        :total="props.dataTotal"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="props.pageSize"
        layout="sizes, prev, pager, next"
        @size-change="sizeChange"
        @current-change="currentChange"
    />
</template>
<script setup>
// import { defineProps } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElPagination } from 'element-plus';
import { ref } from 'vue';
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
    pageSize: {
        type: Number,
        default: 10,
    },
    havePagination: {
        type: Boolean,
        default: true,
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
    },
    tableInfo: {
        type: Function,
        default(){

        }
    }
});
const pageSize = ref(1);
const page = ref(1);
const sizeChange = (val) => {
    //每页展示的条数
    pageSize.value = val;
    props.tableInfo({page: page.value, pageSize: val});
};
const currentChange = (val) => {
    //当前的页数
    page.value = val;
    props.tableInfo({page: val, pageSize: pageSize.value});
};
//暴露一个方法是搜索的时候会调用的 该方法会将page的页数重置为1
const search = (val) => {
    page.value = 1;
    props.tableInfo({page: val, pageSize: pageSize.value});
};
defineExpose({search});
</script>
<style lang="scss">
.columnStyle{
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
</style>