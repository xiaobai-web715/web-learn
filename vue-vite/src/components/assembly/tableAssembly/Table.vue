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
</template>
<script setup>
// import { defineProps } from 'vue';
import { ElTable, ElTableColumn, ElButton } from 'element-plus';
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
<style lang="scss">
.columnStyle{
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
</style>