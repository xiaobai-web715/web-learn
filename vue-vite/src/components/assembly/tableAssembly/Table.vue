<template>
    <el-table
        :data="dataList"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
    >
        <template
            v-for="item in colums"
            :key="item.prop"
        >
            <el-table-column
                v-if="Array.isArray(item.buttons)"
                :label="item.title"
                :min-width="item.minWidth"
                :fixed="item.fixed"
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
                :fixed="item.fixed"
                :min-width="item.minWidth"
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
        v-if="havePagination"
        v-model:current-page="page"
        background
        :total="dataTotal"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        @size-change="sizeChange"
        @current-change="currentChange"
    />
</template>
<script lang="ts">
import { ref } from 'vue';
declare const IDataList: () => []
export default {
    props: {
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
            default: () => {}
        }
    },
    setup() {
        const page = ref(1);
        const changePageSize = ref(10);
        return {
            page,
            changePageSize
        };
    },
    created() {
        console.log('我是啥', this.eventHub);
        this.eventHub.on('search:table:list', this.search);
    },
    methods: {
        sizeChange(val) {
            this.changePageSize = val;
            this.tableInfo({page: this.page, pageSize: val});
        },
        currentChange(val) {
            this.page = val;
            this.tableInfo({page: val, pageSize: this.changePageSize});
        },
        search(val) {
            console.log('我能否通过这种新的方式来触发', val);
            this.page = 1;
            this.tableInfo({page: val, pageSize: this.changePageSize});
        }
    }
};
</script>
<style lang="scss">
.columnStyle{
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
</style>