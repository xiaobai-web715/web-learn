<template>
    <div class="header">
        <TitleAss title="医院信息" />
        <el-button
            type="primary"
            @click="() => {addHospInfo()}"
        >
            新增
        </el-button>
    </div>
    <div class="content">
        <div class="search">
            <el-form
                label-position="right"
                label-width="100px"
                :inline="true"
            >
                <el-form-item
                    label="医院名称"
                >
                    <el-input
                        v-model="formData.hospname"
                        placeholder="医院名称"
                        clearable
                    />
                </el-form-item>
                <!-- 现在只增加这两个搜索,医院所在地的模糊搜索之后再添加 -->
                <!-- <el-form-item label="医院所在地">
                    <el-input
                        v-model="formData.hospAddress"
                        placeholder="请选择医院所在地"
                    />
                </el-form-item> -->
                <el-form-item label="医院是否可用">
                    <el-select
                        v-model="formData.status"
                        placeholder="请选择医院状态"
                        clearable
                    >
                        <el-option
                            v-for="item in status"
                            :key="item.value"
                            :label="item.title"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="search"
                    >
                        查询
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="importData"
                    >
                        导出数据
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <TableList
                :data-list="dataList"
                :colums="colums"
                :data-total="dataTotal"
                :table-info="tableState"
            />
        </div>
    </div>
    <el-dialog
        v-model="dialogDelete"
        title="删除"
        center
    >
        <span>确定要删除当前信息吗</span>
        <template
            #footer
        >
            <el-button @click="deleteCancel">
                取 消
            </el-button>
            <el-button
                type="primary"
                @click="deleteSure"
            >
                确 定
            </el-button>
        </template>
    </el-dialog>
</template>
<script>
import Table from '@/components/assembly/tableAssembly/Table.vue';
import createTemplate from '@/utils/importInfos/importExcel';
import Title from '@/components/assembly/pageTopTitle/Title.vue';
import request from '@/http/index';
import {status} from './enum';
import { ref } from 'vue';
import moment from 'moment';
export default {
    components: {
        TableList: Table,
        TitleAss: Title
    },
    setup() {
        const formData = ref({
            hospname: '',
            status: ''
        });
        const dialogDelete = ref(false);
        const deleteHospId = ref();
        const dataList = ref([]);
        const dataTotal = ref(0);
        return {
            formData,
            dialogDelete,
            deleteHospId,
            dataList,
            dataTotal,
            status
        };
    },
    data() {
        const colums = [
            {
                title: '医院名称',
                prop: 'hospname',
            },
            {
                title: '医院联系人',
                prop: 'contactsName',
            },
            {
                title: '联系人电话',
                prop: 'contactsPhone',
            },
            {
                title: '医院官网',
                prop: 'apiUrl',
            },
            {
                title: '医院状态',
                prop: 'status',
                custom: (val, row) => {
                    if (val) return '可用';
                    else return '不可用';
                }
            },
            {
                title: '创建时间',
                prop: 'createTime', //引入moment来生成时间
                minWidth: 150,
                custom: (val, row) => {
                    return moment(val).format('YYYY-MM-DD hh:mm:ss');
                }
            },
            {
                title: '更新时间',
                prop: 'updateTime',
                minWidth: 150,
                custom: (val, row) => {
                    return moment(val).format('YYYY-MM-DD hh:mm:ss');
                }
            }
        ];
        let o = {
            title: '操作',
            fixed: 'right',
            buttons: [],
        };
        let editFun = {
            title: '编辑',
            type: 'primary',
            callback: (val, index) => {
                const {id} = val;
                this.addHospInfo(id);
            }
        };
        let deleteFun = {
            title: '删除',
            type: 'danger',
            callback: (val, index) => {
                console.log('val', val);
                this.dialogDelete = true;
                this.deleteHospId = val.id;
            }
        };
        o.buttons.push(editFun, deleteFun);
        colums.push(o);
        return {
            colums
        };
    },
    mounted() {
        this.eventHub.emit('search:table:list', 1);
        // 测试接口的多次请求能否合并成一个
        Promise.all(new Array(6).fill(0).map(item => this.getHospList())).then(args => {console.log('args', args);});
    },
    methods: {
        addHospInfo(id) {
            this.$router.push({path: '/hospSet/add', query: {id}});
        },
        getHospList(params = {}) {
            return request({
                url: '/sytHospInfo/hospList/query', 
                method: 'post', 
                params
            }).then(res => {
                console.log('res', res);
                if (res.code === 200) {
                    //接口暂时不返回对象的data与total
                    this.dataList = res.data.records;
                    this.dataTotal = res.data.total;
                    // dataTotal.value = res.data.total;
                }
                return res;
            });
        },
        deleteCancel() {
            this.dialogDelete = false;
        },
        deleteSure() {
            request({
                url: '/sytHospInfo/hospList/delete', 
                method: 'post', 
                params: {id: this.deleteHospId}
            }).then(res => {
                if (res.code === 200) {
                    this.$message.success('删除成功');
                    this.dialogDelete = false;
                    this.eventHub.emit('search:table:list', 1);
                }
            });
        },
        search() {
            this.eventHub.emit('search:table:list', 1);
        },
        tableState(params) {
            this.getHospList({...this.formData, ...params});
        },
        importData() {
            const columns = [
                {
                    title: '医院名称',
                    dataIndex: 'hospname',
                    key: 'hospname'
                },
                {
                    title: '医院联系人',
                    dataIndex: 'contactsName',
                    key: 'contactsName'
                },
                {
                    title: '是否可用',
                    dataIndex: 'status',
                    key: 'status',
                    render: (info, index) => {
                        console.log('我是对应的信息', info);
                        if (info.status == 1) {
                            return '可用';
                        } else {
                            return '不可用';
                        }
                    } 
                }
            ];
            // 对获取的excel的数据进行导出
            const arrUrl = createTemplate({
                data: this.dataList,
                columns,
                excelListRows: 1
            });
            arrUrl.forEach(item => {
                const a = document.createElement('a');
                a.href = window.URL.createObjectURL(item);
                a.download = '测试文件下载.xls';
                a.style.display = 'none';
                a.click();
            });
        }
    }
};
</script>
<style scoped lang="scss">
.header{
    margin: 20px 20px 20px 20px;
    display: flex;
    justify-content: space-between;
}
.content{
    margin-left: 30px;
    .search{
        margin-top: 10px;
    }
}
.el-input-style{
    width: 300px;
}
</style>